pragma solidity 0.4.24;

import "openzeppelin-solidity/contracts/lifecycle/Pausable.sol";
import "kleros-interaction/contracts/standard/arbitration/ArbitrableTransaction.sol";

contract IuvoCore is Pausable{
    
    mapping (address => Doctor) public doctors;
    mapping (address => bool) public doctorPresentInStorage;
    address[] public doctorsArray;    

    struct Doctor {
        uint256 pos;
        string name;
        string rating;
        string bio;
        string ipfsProfilePic;
    }

    function setDoctor(
        string _name, 
        string _rating, 
        string _bio, 
        string _ipfsProfilePic
    ) 
        public 
    {
        if(doctorPresentInStorage[msg.sender]){
            // update data
            Doctor storage docToUpdate = doctors[msg.sender];
            docToUpdate.name = _name;
            docToUpdate.bio = _bio;
            docToUpdate.ipfsProfilePic = _ipfsProfilePic;
        } else {
            // new doctor
            Doctor memory newDoc = Doctor(
                doctorsArray.length,
                _name,
                _rating, 
                _bio, 
                _ipfsProfilePic
            );
            doctorsArray.push(msg.sender);            
            doctors[msg.sender] = newDoc;
            doctorPresentInStorage[msg.sender] = true;
        }
    }

    function deleteDoctor() public {
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

    function doctorsArrayLength() public view returns (uint256){
        return doctorsArray.length;
    }
}