var express = require('express');
var router = express.Router();
var Web3 = require('web3');
//创建web3对象
var web3 = new Web3();
//连接到以太坊节点
web3.setProvider(new Web3.providers.HttpProvider("http://localhost:8545"));
 
 var abi = [ { "constant": false, "inputs": [ { "name": "HouseId", "type": "string" }, { "name": "seller", "type": "string" }, { "name": "id", "type": "string" }, { "name": "number", "type": "string" } ], "name": "setHouseInfo", "outputs": [], "payable": false, "type": "function" }, { "constant": true, "inputs": [ { "name": "HouseId", "type": "string" } ], "name": "getHouseInfo", "outputs": [ { "name": "", "type": "string", "value": "" }, { "name": "", "type": "string", "value": "" }, { "name": "", "type": "string", "value": "" }, { "name": "", "type": "string", "value": "" } ], "payable": false, "type": "function" } ];
 var addr = '0x0953cA48992DE60392E0E167FCD99842eAd881e1';
 var homeabi = [ { "constant": true, "inputs": [ { "name": "addr", "type": "string" } ], "name": "getStatus", "outputs": [ { "name": "", "type": "string", "value": "" } ], "payable": false, "type": "function" }, { "constant": false, "inputs": [ { "name": "homeAddress", "type": "string" }, { "name": "userName", "type": "string" }, { "name": "userIdCard", "type": "string" }, { "name": "homeId", "type": "string" }, { "name": "userPhoneNumber", "type": "string" }, { "name": "homeDescription", "type": "string" }, { "name": "homePrice", "type": "uint256" } ], "name": "register", "outputs": [], "payable": false, "type": "function" }, { "constant": true, "inputs": [ { "name": "homeAddress", "type": "string" } ], "name": "search", "outputs": [ { "name": "", "type": "string", "value": "" }, { "name": "", "type": "string", "value": "" }, { "name": "", "type": "string", "value": "" }, { "name": "", "type": "string", "value": "" }, { "name": "", "type": "string", "value": "" }, { "name": "", "type": "uint256", "value": "0" }, { "name": "", "type": "string", "value": "" } ], "payable": false, "type": "function" }, { "constant": false, "inputs": [ { "name": "addr", "type": "string" }, { "name": "s", "type": "string" } ], "name": "setStatus", "outputs": [], "payable": false, "type": "function" } ];
 var homeaddr = '0x1FAaCB1a75B9e43519Cb7CCaD701384B950797aE';
 var house = web3.eth.contract(abi).at(addr);
 var home = web3.eth.contract(homeabi).at(homeaddr);
 var account_zs = web3.eth.accounts[0];
 var account_ls = web3.eth.accounts[1];
 var account_zj = web3.eth.accounts[2];
 var account_transfer = web3.eth.accounts[3];
 
 console.log(account_transfer);
/* GET home page. */
router.get('/transfer/main', function(req, res, next) {
	 username = req.query.username;
	 password= req.query.password;
  res.render('index', { username:username,password:password, title: 'Express' });
});
/*GET regiter page. */
router.get("/transfer/register", function(req,res){
	res.render('homePropertyRegister',{title:'房屋产权注册'});
});

router.post("/register1", function(req, res) {
	
	// res.end();
	//console.log(req.body.username);

	//console.log(web3.eth.accounts[0]);
	
	 console.log(house);
	 var houseid = req.body.houseid;
	 console.log(houseid);
	 var username = req.body.username;
	 console.log(username);
	 var idnumber = req.body.idnumber;
	 console.log(idnumber);
	 var contactnumber = req.body.contactnumber;
	 console.log(contactnumber);
	 // var password = req.body.password;
	 // var repassword = req.body.repassword;
	 try {
	 	house.setHouseInfo.sendTransaction(houseid,username,idnumber,contactnumber,{from:account_transfer,gas:4700000});
	} catch(err) {
		console.error(err);
		res.send({ status: 500, message: err.stack });
		return;
	}
	 
	 //res.send(req.query);
	 //res.send(req.param);
	 res.send({ status: 200, message: "success" });
});  

router.get("/transfer/search",function(req,res){
	res.render('homePropertySearch',{title:'房屋产权查询'});
});

router.get("/search1",function(req,res){
 	var houseid = req.query.houseid;
 	 console.log(houseid);
 	var houses;
   try{
   	     houses = house.getHouseInfo.call(houseid);
   	     console.log(houses);
    }catch(err){
    	console.log(err);
    	res.send({status: 500, message: err.stack});
    	return;
    }
     var houseInfo = {username:houses[1],idnumber:houses[2],contactnumber:houses[3]};
      res.send(houseInfo);
      
      
});

 router.get("/transfer",function(req,res,next){
 	res.render('transfer',{account:account_ls,reciver:account_zs});
 	
 });
  router.post("/transfer1",function(req,res){
 	var amount = req.body.amount;
 	     console.log(amount);
 	     amount = web3.toWei(amount, "ether");
 	    
 	try{ 
 	        web3.eth.sendTransaction({from:account_ls,to:account_zs,value:amount});
    }catch(err){
    	    res.send({status:500,message:err.stack});
    }

    res.send({status:200,message:'success'});
   }); 

   router.get('/login',function(req,res){
   		res.render('login_intermediary',{title:"登录页面"});
   });
    router.get('/transfer/login',function(req,res){
   		res.render('login-transfer',{title:"房屋交易中心登录页面"});
   });
     router.get('/bank/login',function(req,res){
   		res.render('login-bank',{title:"银行系统登录页面"});
      });

     router.post('/bank/login1',function(req,res){
     	    var username = req.body.username;
            var password = req.body.password;
     	    if(username === 'bank'&& password ==='123'){
            res.send({status:200,message:'成功',username:username,password:password});
           }
     });

     router.post('/transfer/login1',function(req,res){
     	    var username = req.body.username;
            var password = req.body.password;
     	    if(username === 'admin'&& password ==='123'){
            res.send({status:200,message:'成功',username:username,password:password});
           }
     });

   router.post('/login1',function(req,res){
        var username = req.body.username;
        var password = req.body.password;
        if(username === 'zhangsan'&& password ==='123'){
        	console.log("true");
        	res.send({status:200,message:'成功'});
      
           	    //res.redirect(301,'/home');
             // res.writeHead(302, {'Location': '/home'});
             res.end();
        }else if(username === 'lisi'&& password ==='123'){
            res.send({status:300,message:'成功',username:username,password:password});
            res.end();
        }   	 
  });

      router.get('/home',function(req,res){
      res.render('homeRegister',{title:'房屋注册'});
   });

      router.post('/homeregister',function(req,res){
            var homeAddress = req.body.houseaddress;
            console.log(homeAddress);
            var userName = req.body.username;
            console.log(userName);
            var userIdCard = req.body.idnumber;
            console.log(userIdCard);
            var homeId = req.body.houseid;
            console.log(homeId);
            var userPhoneNumber = req.body.contactnumber;
            console.log(userPhoneNumber);
            var homeDescription = req.body.housedetails;
            console.log(homeDescription);
            var homePrice = parseInt(req.body.price);
            console.log(homePrice);
            
              var h = house.getHouseInfo.call(homeId);
                 console.log(h);
                 var houseId = h[0];
                 var userId = h[2];
                 
                 
                 console.log(userIdCard == userId);
               if(homeId == houseId && userIdCard == userId ){
               	     console.log("fgfgdg");
		             try{
		                 home.register.sendTransaction(homeAddress,userName,userIdCard,homeId,userPhoneNumber,homeDescription,homePrice,{from:account_zj,gas:4700000});
		             }catch(err){
		             	console.log("Error:"+err);
		             	res.send({status:500,message: err.stack});
		             	return;
		             }
                     res.send({status:200,message:"success"});
               }else{
               	          console.log("审核未通过!");
               	 res.send({status:300,message:"审核未通过!"});
               }
      });
     
               

            

      router.get('/homesearch',function(req,res){
      	      var username = req.query.username;
      	      var password = req.query.password;
      		res.render('homeSearch',{title:'房屋查询',username:username,password:password});
      });
                 var userName;
      	         var phoneNumber;
      	         var houseAddress;
      	         var description;
      	         var price;
                 var status;
      router.get('/homesearch1',function(req,res){
      	    var homeAddress = req.query.homeaddr;
      	        console.log(homeAddress);
      	        
      	     try{  
      	     	    var homes =  home.search.call(homeAddress);
      	     	     userName = homes[1];
      	     	     phoneNumber = homes[3];
                     houseAddress = homes[0];
                     description = homes[4];
                     price = homes[5];
                     status = homes[6];
                     console.log(status);
      	     	 console.log(homes);
      	     }catch(err){
      	     	res.send({status:500,message:err.stack});
      	     }
      	      res.send({status:200,message:"success"});
      });

        router.get('/detail',function(req,res){
        	var username = req.query.username;
        	var password = req.query.password;
          	//var status = home.getStatus.call();
      	res.render('homeDetail',{title:'房屋详细信息',username:username,password:password,status:status,userName:userName,phoneNumber:phoneNumber,houseAddress:houseAddress,description:description,price:price});
      });





       router.get('/reserve',function(req,res){
               var addr = req.query.address;
           try{
       		home.setStatus.sendTransaction(addr,"已预定",{from:account_zj,gas:4700000});
       		}catch(err){
       			console.log(err);
       			res.send({status:500,message:err.stack});
       		}

       		 
       		 res.send({status:200,message:"success",});

       }); 

       router.get('/pay',function(req,res){
           
           res.send({status:200,message:"success",});
           res.end();
       }); 

       router.get('/remainder',function(req,res){
               var addr = req.query.address;
       	  try{
             
       	   home.setStatus.sendTransaction(addr,'已交易',{from:account_zj,gas:4700000});
       	    }catch(err){
       	    	console.log(err);
       	    	res.send({status:500,message:err.stack});
       	    }
               res.send({status:200,message:"success",});
               res.end();

       		 
       		 
       }); 

       router.get('/transfercenter',function(req,res){
               var houseid = '110';
               var owername = '孙悟空';
               var ownerid = '123456789987654321';
               var phonenumber = '13842812334';
       	  try{
           house.setHouseInfo.sendTransaction(houseid,owername,ownerid,phonenumber,{from:account_transfer,gas:4700000}); 
            }catch(err){
            	console.log(err);
            	res.send({status:500,message:err.stack});
            }

             res.send({status:200,message:'success'});
       }); 


  

   
 
module.exports = router;
