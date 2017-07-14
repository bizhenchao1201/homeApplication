pragma solidity 0.4.8;

contract HouseInfo {
    struct House{
        string HouseId;
        Seller seller;
    }
    struct Seller{
        string name;
        string id;
        string number;
    }
    mapping(string=>House) houses;
    
    function setHouseInfo(string HouseId,string seller,string id,string number){
        houses[HouseId].HouseId = HouseId;
        houses[HouseId].seller.name=seller;
        houses[HouseId].seller.id=id;
        houses[HouseId].seller.number=number;

    }

    function getHouseInfo(string HouseId)constant returns(string,string,string,string){        
    	return(houses[HouseId].HouseId,houses[HouseId].seller.name,houses[HouseId].id,houses[HouseId].seller.number); 
    }
}
    