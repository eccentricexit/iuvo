pragma solidity ^0.4.16;


contract IuvoCore {
    
    mapping (address => Doctor) public doctors;
    
    Doctor[] public doctorsArray;
    uint256 public doctorsArraySize;
    Doctor public singleDoctor;

    struct Doctor {
        string name;
        string rating;
        string bio;
        address paymentAccount;
    }

    constructor() public {
        address doc1Addr = 0xbCcc714d56bc0da0fd33d96d2a87b680dD6D0DF6;
        address doc2Addr = 0xaee905FdD3ED851e48d22059575b9F4245A82B04;
        address doc3Addr = 0xaee905FdD3ED851e48d22059575b9F4245A82B04;

        Doctor memory doc1 = Doctor("Dr. John Doe", "4.1", "I'm awesome.", doc1Addr);
        Doctor memory doc2 = Doctor("Dr. Doe Jo", "3.3", "I'm working on it.", doc2Addr);
        Doctor memory doc3 = Doctor("Dr. Manhattan", "5.0", "humans are boring.", doc3Addr);

        doctors[doc1Addr] = doc1;
        doctors[doc2Addr] = doc2;
        doctors[doc3Addr] = doc3;

        doctorsArray.push(doc1);
        doctorsArraySize++;
        doctorsArray.push(doc2);
        doctorsArraySize++;
        doctorsArray.push(doc3);
        doctorsArraySize++;
    }
}