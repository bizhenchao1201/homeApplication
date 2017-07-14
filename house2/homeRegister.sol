pragma solidity 0.4.8;

contract HomeRegister{
	struct Home{
	    string homeId;
		Owner  owner;
		string homeAddress;
		string homeDescription;
		uint price;
		string status;
		

	}

	struct Owner{
		address account;
		string name;
		string idCard;
		string phoneNumber;
	}

	mapping(string => Home) homes;
    
	function setStatus(string addr,string s){
        homes[homeAddress].status = s;
    }   
function getStatus(string addr)constant returns(string){
    return homes[homeAddress];
}

	function register(string homeAddress,string userName,string userIdCard,string homeId,string userPhoneNumber,string homeDescription,uint homePrice){
		homes[homeAddress].homeAddress = homeAddress;
		homes[homeAddress].owner.account = msg.sender;
		homes[homeAddress].owner.name = userName;
		homes[homeAddress].owner.idCard = userIdCard;
        homes[homeAddress].homeId = homeId;
		homes[homeAddress].owner.phoneNumber = userPhoneNumber;
		homes[homeAddress].homeDescription = homeDescription;
		homes[homeAddress].price = homePrice;
		homes[homeAddress].status = " ";

	}

	function search(string homeAddress) constant returns(string,string,string,string,string,uint,string){
         return(homes[homeAddress].homeAddress,homes[homeAddress].owner.name,homes[homeAddress].homeId,homes[homeAddress].owner.phoneNumber,homes[homeAddress].homeDescription,homes[homeAddress].price,homes[homeAddress].status);
	}



}