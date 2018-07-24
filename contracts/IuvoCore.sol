pragma solidity 0.4.24;

import "openzeppelin-solidity/contracts/lifecycle/Pausable.sol";
import "kleros-interaction/contracts/standard/arbitration/ArbitrableTransaction.sol";
import "kleros-interaction/contracts/standard/arbitration/Arbitrator.sol";

contract IuvoCore is Pausable{
    
    mapping(address => Doctor) public doctors;
    mapping(address => bool) public doctorPresentInStorage;
    mapping(address => Appointment[]) public doctorAppointments;

    address[] public doctorsArray;    

    struct Doctor {
        uint256 pos;
        string name;
        string rating;
        string bio;
        string ipfsProfilePic;
        string ipfsContract;
    }

    struct Appointment {
        address payee;
        address payer;
        address arbitrableAppointment;
        string ipfsContract;
    }

    function setDoctor(
        string _name, 
        string _rating, 
        string _bio, 
        string _ipfsProfilePic,
        string _ipfsContract
    ) 
        public
        whenNotPaused
    {
        if(doctorPresentInStorage[msg.sender]){
            // update data
            Doctor storage docToUpdate = doctors[msg.sender];
            docToUpdate.name = _name;
            docToUpdate.bio = _bio;
            docToUpdate.ipfsProfilePic = _ipfsProfilePic;
            docToUpdate.ipfsContract = _ipfsContract;
        } else {
            // new doctor
            Doctor memory newDoc = Doctor(
                doctorsArray.length,
                _name,
                _rating, 
                _bio, 
                _ipfsProfilePic,
                _ipfsContract
            );
            doctorsArray.push(msg.sender);            
            doctors[msg.sender] = newDoc;
            doctorPresentInStorage[msg.sender] = true;
        }
    }

    function deleteDoctor() public whenNotPaused {
        require(doctorPresentInStorage[msg.sender]);
        uint256 toBeDeletedPosition = doctors[msg.sender].pos;
        uint256 lastDoctorPosition = doctorsArray.length-1;

        // Replace with last
        doctorsArray[toBeDeletedPosition] = doctorsArray[lastDoctorPosition];

        // Update position
        doctors[doctorsArray[toBeDeletedPosition]].pos = toBeDeletedPosition;

        // Delete last item
        delete doctorsArray[lastDoctorPosition];
        doctorsArray.length--;

        // Remove from mapping
        delete doctors[msg.sender];
        doctorPresentInStorage[msg.sender] = false;
    }

    function hireDoctor(
        address _doctor,
        string _ipfsContract,
        address _arbitrator,
        string _metaEvidence,
        uint _timeout,
        bytes _arbitratorExtraData
    ) 
        public
        payable
        whenNotPaused
    {
        address arbitrableAppointment = new ArbitrableTransaction(
            Arbitrator(_arbitrator),
            _timeout,
            _doctor,
            _arbitratorExtraData,
            _metaEvidence
        );

        Appointment memory appointment = Appointment(
            _doctor,
            msg.sender,
            arbitrableAppointment,
            _ipfsContract
        );

        doctorAppointments[_doctor].push(appointment);
    }

    function doctorsArrayLength() public view returns (uint256){
        return doctorsArray.length;
    }

    function doctorAppointmentsLength(address _doctor) public view returns (uint256){
        return doctorAppointments[_doctor].length;
    }

    function returnDoctorsArray() public view returns (address[]) {
        return doctorsArray;
    }
}