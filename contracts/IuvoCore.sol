/**
 *  @title IuvoCore
 *  @author Matheus Alencar - <mtsalenc@gmail.com> 
 *  Bug Bounties: This code hasn't undertaken a bug bounty program yet.
 */
pragma solidity 0.4.24;

import "./PausableUpgradeable.sol";
import "kleros-interaction/contracts/standard/arbitration/ArbitrableTransaction.sol";
import "kleros-interaction/contracts/standard/arbitration/Arbitrator.sol";

/**
 *  @title IuvoCore
 *  @author Matheus Alencar - <mtsalenc@gmail.com>
 *  Upgradable IuvoCore contract. This is a meeting point between patients and doctors.
 *  Deployes a new kleros arbitrable transaction when a doctor is hired.
 *  This contract was built for educational purposes.
 */
contract IuvoCore is PausableUpgradeable{

    address ratingOracle;

    mapping(address => uint256) public doctorPosition;
    mapping(address => bool) public doctorExists;
    address[] public doctorAddresses;
    Docotor[] public doctors;
    
    mapping(address => uint[]) public doctorAppointments;
    mapping(address => uint[]) public patientAppointments;
    Appointment[] public appointments;

    struct Doctor {
        string name;
        string rating;
        string bio;
        string profilePicIpfsAddr;
        string contractIpfsAddr;
    }

    struct Appointment {
        address doctor;
        address patient;
        address arbitrableAppointment;
        string contractIpfsAddr;
    }

    /** @dev Indicate that new `_doctor` data has been set to the contract.
     *  @param _doctor The doctor's address.
     *  @param _name The doctor's name.
     *  @param _bio The doctors bio.
     *  @param _profilePicIpfsAddr The doctor's profile picture ipfs address/hash
     *  @param _contractIpfsAddr The contract's ipfs address/hash
     */
    event NewDoctorData(
        address _doctor,
        string _name,  
        string _bio,
        string _profilePicIpfsAddr,
        string _contractIpfsAddr
    );

    /** @dev Indicate `_doctor`'s data has been removed.
     *  @param _doctor The doctor's address.     
     */
    event DoctorDataDeleted(
        address _doctor        
    );

    /** @dev Indicate that the `_doctor`'s rating has been updated.
     *  @param _doctor The doctor's address.
     *  @param _rating The doctor's new rating.
     */
    event DoctorRatingUpdated(
        address _doctor,
        string _rating
    );

    /** @dev Indicate that `_doctor` has been hired by `_patient`
     *  @param _doctor The doctor's address.
     *  @param _patient The patient that hired the doctor.
     */
    event DoctorHired(
        address _doctor,
        address _patient
    );

    modifier onlyRatingOracle() {
        require(msg.sender==oracle); 
        _;  
    }

    constructor(address _ratingOracle){
        ratingOracle = _ratingOracle;
    }

    /** @dev Set new Doctor data. Can be used to either update data 
     *  or register a new doctor for `msg.sender`'s address.
     *  @param _name The name of the doctor.
     *  @param _bio The bio of the doctor.
     *  @param _profilePicIpfsAddr The doctor's profile picture ipfs address.
     *  @param _contractIpfsAddr The doctor's contract ipfs address.
     */
    function setDoctor(
        string _name,
        string _bio, 
        string _profilePicIpfsAddr,
        string _contractIpfsAddr
    ) 
        public
        whenNotPaused
    {
        address doctorAddr = msg.sender;
        if(doctorExists[doctorAddr]){
            // update data
            uint256 doctorPositionInArray = doctorsPosition[doctorAddr];

            Doctor storage docToUpdate = doctors[doctorPositionInArray];
            docToUpdate.name = _name;
            docToUpdate.bio = _bio;
            docToUpdate.rating = "Waiting review";
            docToUpdate.profilePicIpfsAddr = _profilePicIpfsAddr;
            docToUpdate.contractIpfsAddr = _contractIpfsAddr;
        } else {
            // new doctor
            Doctor memory newDoc = Doctor(
                doctors.length,
                _name,
                _rating, 
                _bio, 
                _profilePicIpfsAddr,
                _contractIpfsAddr
            );
            doctors.push(newDoc);
            doctorsMapping[doctorAddr] = doctors.length-1;
            doctorExists[doctorAddr] = true;
            doctorAddresses.push(doctorAddr);
        }

        emit NewDoctorData(doctorAddr,_name,_rating,_bio,_profilePicIpfsAddr);
    }

    /** @dev Deletes doctor's data.
     */
    function deleteDoctor() public whenNotPaused {
        require(doctorExists[msg.sender]);
        uint256 toBeDeletedPosition = doctorsMapping[msg.sender].pos;
        uint256 lastDoctorPosition = doctors.length-1;

        // Replace with last
        doctors[toBeDeletedPosition] = doctors[lastDoctorPosition];

        // Update position
        doctorsMapping[doctors[toBeDeletedPosition]].pos = toBeDeletedPosition;

        // Delete last item
        delete doctors[lastDoctorPosition];
        doctors.length--;

        // Remove from mapping
        delete doctorsMapping[msg.sender];
        doctorExists[msg.sender] = false;
    }

    /** @dev Hires a doctor and deploys a kleros arbitrable transaction contract.
     *  @param _doctor The address of the doctor being hired.
     *  @param _bio The bio of the doctor.
     *  @param _profilePicIpfsAddr The doctor's profile picture ipfs address/hash.
     *  @param _contractIpfsAddr The doctor's contract ipfs address/hash.
     */
    function hireDoctor(
        address _doctor,
        string _contractIpfsAddr,
        address _arbitrator,
        string _metaEvidence,
        uint _timeout,
        bytes _arbitratorExtraData
    ) 
        public
        payable
        whenNotPaused
    {
        address _patient = msg.sender;
        address arbitrableAppointment = new ArbitrableTransaction(
            Arbitrator(_arbitrator),
            _timeout,
            _doctor,
            _arbitratorExtraData,
            _metaEvidence
        );

        Appointment memory appointment = Appointment(
            _doctor,
            _patient,
            arbitrableAppointment,
            _contractIpfsAddr
        );

        appointments.push(appointment);

        patientAppointments[_patient].push(appointments.length-1);
        doctorAppointments[_doctor].push(appointments.length-1);
    }

    /** @dev Sets a doctor's rating. Only callable by the rating oracle.
     *  @param _doctor The address of the doctor being rated.
     *  @param _rating The doctor's rating.
     */
    function setRating(address _doctor, string _rating) public onlyRatingOracle whenNotPaused{
        require(doctorExists[_doctor]);

        uint256 doctorPositionInArray = doctorPosition[_doctor];
        Doctor storage docToUpdate = doctors[doctorPositionInArray];        
        docToUpdate.rating = _rating;

        emit DoctorRatingUpdated(_doctor,_rating);
    }

    /** @dev Returns the number of doctors on the platform.
     */
    function doctorsArrayLength() public view returns (uint256) {
        return doctors.length;
    }

    /** @dev Returns the number appointments associated with a `_doctor`.
     *  @param _doctor The doctor being queried.
     */
    function doctorAppointmentsLength(address _doctor) public view returns (uint256) {
        return doctorAppointments[_doctor].length;
    }

    /** @dev Returns the number appointments associated with a `_patient`.
     *  @param _doctor The patient being queried.
     */
    function patientAppointmentsLength(address _patient) public view returns (uint256) {
        return patientAppointments[_patient].length;
    }

    /** @dev Returns the number appointments associated with a `_doctor`.
     */
    function returnDoctorsArray() public view returns (address[]) {
        return doctorsAddresses;
    }
}