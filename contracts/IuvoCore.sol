pragma solidity 0.4.24;

import "./PausableUpgradeable.sol";
import "kleros-interaction/contracts/standard/arbitration/ArbitrableTransaction.sol";
import "kleros-interaction/contracts/standard/arbitration/Arbitrator.sol";

/**
 *  @title IuvoCore
 *  @author Matheus Alencar - <mtsalenc@gmail.com>
 *  Upgradable IuvoCore contract. This is a meeting point between patients and doctors.
 *  This contract was built for educational purposes.
 */
contract IuvoCore is PausableUpgradeable{

    address public ratingOracle;

    mapping(address => uint256) public doctorPosition;
    mapping(address => bool) public doctorExists;
    address[] public doctorAddresses;
    Doctor[] public doctors;
    
    mapping(address => uint[]) public doctorAppointments;
    mapping(address => uint[]) public patientAppointments;
    Appointment[] public appointments;

    struct Doctor {
        string name;
        string rating;
        string bio;
        string profilePicIpfsAddr;
        string contractIpfsAddr;
        address doctorAddr;
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
    event LogNewDoctorData(
        address _doctor,
        string _name,  
        string _bio,
        string _profilePicIpfsAddr,
        string _contractIpfsAddr
    );

    /** @dev Indicate `_doctor`'s data has been removed.
     *  @param _doctor The doctor's address.     
     */
    event LogDoctorDataDeleted(address _doctor);

    /** @dev Indicate that the `_doctor`'s rating has been updated.
     *  @param _doctor The doctor's address.
     *  @param _rating The doctor's new rating.
     */
    event LogDoctorRatingUpdated(address _doctor,string _rating
    );

    /** @dev Indicate that `_doctor` has been hired by `_patient`
     *  @param _doctor The doctor's address.
     *  @param _patient The patient that hired the doctor.
     */
    event LogDoctorHired(address _doctor,address _patient);

    /** @dev Indicate that `_ratingOracle` has been set as the rating oracle.
     *  @param _ratingOracle The doctor's address.     
     */
    event LogRatingOracleSet(address _ratingOracle);

    modifier onlyRatingOracle() {
        require(
            msg.sender==ratingOracle,
            "Only the rating oracle can call this function"
        ); 
        _;  
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
            uint256 doctorPositionInArray = doctorPosition[doctorAddr];

            Doctor storage docToUpdate = doctors[doctorPositionInArray];
            docToUpdate.name = _name;
            docToUpdate.bio = _bio;
            docToUpdate.profilePicIpfsAddr = _profilePicIpfsAddr;
            docToUpdate.contractIpfsAddr = _contractIpfsAddr;
        } else {
            // new doctor
            Doctor memory newDoc = Doctor(
                _name,
                "Waiting review", 
                _bio, 
                _profilePicIpfsAddr,
                _contractIpfsAddr,
                doctorAddr
            );
            doctors.push(newDoc);
            doctorPosition[doctorAddr] = doctors.length-1;
            doctorExists[doctorAddr] = true;
            doctorAddresses.push(doctorAddr);
        }

        uint256 doctorPos = doctorPosition[doctorAddr];
        Doctor storage updatedDoctor = doctors[doctorPos];

        emit LogNewDoctorData(
            doctorAddr,
            updatedDoctor.name,
            updatedDoctor.bio,
            updatedDoctor.profilePicIpfsAddr,
            updatedDoctor.contractIpfsAddr
        );
    }

    /** @dev Deletes doctor's data.
     */
    function deleteDoctor() public whenNotPaused {
        require(
            doctorExists[msg.sender],
            "A doctor for this address must exist to be deleted."
        );
        address doctorAddr = msg.sender;
        uint256 toBeDeletedPosition = doctorPosition[doctorAddr];
        uint256 lastDoctorPosition = doctors.length-1;

        // Overwrite with last
        doctors[toBeDeletedPosition] = doctors[lastDoctorPosition];

        // Update position
        doctorPosition[doctors[toBeDeletedPosition].doctorAddr] = toBeDeletedPosition;

        // Delete last item
        delete doctors[lastDoctorPosition];
        doctors.length--;

        // Remove from mapping
        delete doctorPosition[doctorAddr];
        doctorExists[doctorAddr] = false;

        emit LogDoctorDataDeleted(doctorAddr);
    }

    /** @dev Hires a doctor and deploys a kleros arbitrable transaction contract.
     *  @param _doctor The address of the doctor being hired.
     *  @param _contractIpfsAddr The ipfs address/hash of the contract for this service.
     *  @param _arbitrator The arbitrator of the contract.
     *  @param _metaEvidence Link to meta-evidence JSON.
     *  @param _timeout  Time after which a party automatically loose a dispute.
     *  @param _arbitratorExtraData Extra data for the arbitrator.
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

        emit LogDoctorHired(_doctor,_patient);
    }

    /** @dev Sets a doctor's rating. Only callable by the rating oracle.
     *  @param _doctor The address of the doctor being rated.
     *  @param _rating The doctor's rating.
     */
    function setRating(address _doctor, string _rating) public onlyRatingOracle whenNotPaused{
        require(
            doctorExists[_doctor],
            "A doctor for this address a must exist receive a rating"
        );

        uint256 doctorPositionInArray = doctorPosition[_doctor];
        Doctor storage docToUpdate = doctors[doctorPositionInArray];        
        docToUpdate.rating = _rating;

        emit LogDoctorRatingUpdated(_doctor,_rating);
    }

    /** @dev Sets the rating oracle.
     *  @param _ratingOracle The address that will be allowed to set a doctor's rating.
     */
    function setRatingOracle(address _ratingOracle) public onlyOwner{
        ratingOracle = _ratingOracle;

        emit LogRatingOracleSet(_ratingOracle);
    }

    /** @dev Returns the number of registered doctors.
     */
    function doctorsArrayLength() public view returns (uint256) {
        return doctors.length;
    }

    /** @dev Returns the number registered appointments.
     */
    function appointmentsLength() public view returns (uint256) {
        return appointments.length;
    }

    /** @dev Returns the number appointments associated with a `_doctor`.
     *  @param _doctor The doctor being queried.
     */
    function doctorAppointmentsLength(address _doctor) public view returns (uint256) {
        return doctorAppointments[_doctor].length;
    }

    /** @dev Returns the number appointments associated with a `_patient`.
     *  @param _patient The patient being queried.
     */
    function patientAppointmentsLength(address _patient) public view returns (uint256) {
        return patientAppointments[_patient].length;
    }

    /** @dev Returns the number appointments associated with a `_doctor`.
     */
    function returnDoctorsArray() public view returns (address[]) {
        return doctorAddresses;
    }
}