const express = require("express");
const app = express();
const fs = require("fs");
const data = require("./database/grocerydatabase.json");
app.use(express.static('./public'));
app.use(express.json());

const path = require("path");
const { STATUS_CODES } = require("http");
const port = 2000;

app.post("/existinguserdata", (req,res) => {
    let body = req.body;
    fs.readFile("./database/userdatabase.json", (err,data) => {
        if(err){
            console.log(err);
        }
        else{
            let userdata = JSON.parse(data);
            let userEmail = Object.keys(userdata);
            if(userEmail.includes(body.useremail)){
              if(userdata[body.useremail].password === body.password){
                res.json(
                  { "key" : "Successful" , "user" : body.useremail, "profilename" : userdata[body.useremail].userprofilename }
                );
              }else{
              res.json(
                { "key" : "Unsuccessful", "message" : "Invalid Password"}
              );
            }
          }else{
            res.json(
              { "key" : "Unsuccessful", "message" : "Invalid user" }
            );
          }
        }
    })
});

app.post("/forgertpassworduser", (req,res) => {
  let body = req.body;  
  const userdetailsdata = Object.keys(require("./database/userdatabase.json"));
  if(userdetailsdata.includes(body.useremail)){
    res.json({"key" : "Successful"})
  }else{
    res.json({"key" : "Unsuccessful"})
  }
});

app.post("/changepassworduser", (req,res) => {
  let body = req.body; 
  const userdata = require("./database/userdatabase.json");
  let userdetailsdata = Object.keys(userdata);
  if(userdetailsdata.includes(body.useremail)){
    userdata[body.useremail].password = body.userpassword;
    fs.writeFile("./database/userdatabase.json", JSON.stringify(userdata), (err) => {
      if(err){
        console.log(err);
      }else{
        res.json({"key" : "Successful"});
      }
    });
  }else{
    res.json({"key" : "Unsuccessful"});
  }
});



app.post("/newuserdata", (req,res) => {
  let body = req.body;
  let userdetails = {};
  userdetails[body.useremail] = body;
  fs.readFile("./database/userdatabase.json", (err,data) => {
    if(err){
      console.log(err);
      fs.writeFile("./database/userdatabase.json", JSON.stringify(userdetails), (err) => {
        if(err){
          console.log(err);
        }
        else{
          res.json(
            { "key" : "Successful" , "user" : body.useremail }
          );
        }
      })
    }
    else{
      let data1 = JSON.parse(data)
      if(Object.keys(data1).includes(body.useremail)){
        res.json({ "key" : "Unsuccessful", "message" : "User credentials already exist"});      
      }else{
        let finaluserdata = {...data1, ...userdetails};
        fs.writeFile("./database/userdatabase.json", JSON.stringify(finaluserdata), (err) => {
          if(err){
            console.log(err);
          }
          else{
            fs.readFile("./database/userprofileimage.json", (err,data) => {
              if(err){
                console.log(err);
              }else{
                let data1 = JSON.parse(data);
                data1[body.useremail] = "";
                fs.writeFile("./database/userprofileimage.json", JSON.stringify(data1), (err) => {
                  if(err){
                    console.log(err);
                  }
                });
              }
            });
            res.json(
              { "key" : "Successful" , "user" : body.useremail }
            );
          }
        })
      }
    }
  })
});

app.post("/userprofiledatabse", (req,res) => {
  let body = req.body;  
  const userdetailsdata = require("./database/userdatabase.json");
  res.send(userdetailsdata[body.useremail]);
});

app.post("/userprofileimgdata", (req,res) => {
  let body = req.body;
  const profiledata = require("./database/userprofileimage.json");
  if(profiledata === {}){
    res.json({"key" : "none"});
  }else{
    let profilenamekeys = Object.keys(profiledata);
    if(profilenamekeys.includes(body.useremail)){
      res.json({"key" :profiledata[body.useremail]});
    }
  }
});

app.post("/updateuserprofileimgdata", (req,res) => {
  let body = req.body;
  let profiledata = require("./database/userprofileimage.json");
  let profiledatakeys = Object.keys(profiledata);
  if(profiledatakeys.includes(body.useremail)){
    profiledata[body.useremail] = body.profileimgname;
    fs.writeFile("./database/userprofileimage.json", JSON.stringify(profiledata), (err) => {
      if(err){
        console.log(err);
      }else{
        res.json({"key" : "successful"});
      }
    })
  }

});

app.post("/userprofileupdate", (req,res) => {
    let body = req.body;
    const alluserdetailsdata = require("./database/userdatabase.json");
    let userdetailsdata = alluserdetailsdata[body.useremail];
    userdetailsdata.userprofilename = body.userprofilename;
    userdetailsdata.phonenumber = body.userphonenumber;
    userdetailsdata.address = body.useraddress;
    alluserdetailsdata[body.useremail] = userdetailsdata;
    fs.writeFile("./database/userdatabase.json", JSON.stringify(alluserdetailsdata) ,(err) => {
      if(err){
        console.log(err);
      }else{
        res.send({"key" : "Updated your profile successfully"});
      }
    })
});

app.get('/qrocerydatabase', (req,res) => {
  const gqdata = require("./database/groceryquantitydatabase.json");
  res.send(gqdata);
});

app.post('/grocerytype', (req,res) => {
  let body =req.body;
  const grocerydatabase = require("./database/grocerydatabase.json");
  let grocerytype = Object.keys(grocerydatabase);
  for(let index =0; index<grocerytype.length; index++){
    let grocerynamekeys = Object.keys(grocerydatabase[grocerytype[index]]);
    if(grocerynamekeys.includes(body.groceryname)){
      res.send({"grocerytype" : grocerytype[index]});
    }
  }
});

app.post('/groceryItemData', (req,res) => {
  let body = req.body;
  let data1 = data[body.Item]
  let data2 = data1[body.Name];
  let cartItem ={};
  cartItem[body.Name] = data2;
  let usercartItems ={};
  usercartItems[body.username]= cartItem;
  fs.readFile("./database/usercartdatabase.json", (err,data) => {
    if(err){
      fs.writeFile("./database/usercartdatabase.json", JSON.stringify(usercartItems), (err) => {
        if(err){
          console.log(err);
        }
        else{
          res.send({"key":"Item is added to the cart"});
        }
      })
    }
    else{
      const cartdata = require("./database/usercartdatabase.json");
      let usernamedata = Object.keys(cartdata);
      if(usernamedata.includes(body.username) && cartdata != {}){
        let itemsincart = cartdata[body.username];
        itemsincart[body.Name] = cartItem[body.Name];
        let datacart = JSON.parse(data)
        datacart[body.username] = itemsincart;
        fs.writeFile("./database/usercartdatabase.json", JSON.stringify(datacart), (err) => {
          if(err){
            console.log(err);
          }
          else{
            res.send({"key":"Item is added to the cart"});
          }
        });
      }else{
        let datacart = JSON.parse(data)
        let finalcartdata = {...datacart, ...usercartItems};
        fs.writeFile("./database/usercartdatabase.json", JSON.stringify(finalcartdata), (err) => {
          if(err){
            console.log(err);
          }
          else{
            res.send({"key":"Item is added to the cart"});
          }
        })
      }
      
    }
  })

});

app.post('/searchgroceryItemData', (req,res) => {
    let body = req.body;
    let searchitem = body.searchinput;
    // console.log(typeof(searchitem));
    // searchitem = searchitem.toLowerCase();
    let searchitemdatabase = {}
    const grocerydatabase = require('./database/groceryquantitydatabase.json');
    let grocerytypekeys = Object.keys(grocerydatabase);
    for(let index=0; index<grocerytypekeys.length; index++){
        let groceryitemkeys = Object.keys(grocerydatabase[grocerytypekeys[index]]);
        for(let index1=0; index1<groceryitemkeys.length; index1++){
            let itemname = groceryitemkeys[index1].toLowerCase();
            if(itemname.startsWith(searchitem) == 1){
                searchitemdatabase[groceryitemkeys[index1]]=grocerydatabase[grocerytypekeys[index]][groceryitemkeys[index1]];
            }
        }
    }
    if(Object.keys(searchitemdatabase).length === 0){
        res.json({"key" : 0});
    }
    else{
      res.send(searchitemdatabase);
    }

})

app.post('/viewcartpage', (req,res) => {
  let body = req.body;
  const cartdata = require("./database/usercartdatabase.json");
  let userkeys = Object.keys(cartdata);
  if(userkeys.includes(body.useremail)){
    res.send(cartdata[body.useremail]);
  }else{
    res.json({"key" : "NoItems"});
  }
})

app.post('/removeitemincart', (req,res) => {
  let body = req.body;
  const cartdata = require("./database/usercartdatabase.json");
  let usercartdata = cartdata[body.useremail];
  delete usercartdata[body.itemname];
  cartdata[body.useremail] = usercartdata;
  fs.writeFile("./database/usercartdatabase.json", JSON.stringify(cartdata), (err) => {
    if(err){
      console.log(err);
    }
    else{
      res.send({"key":"Item is removed from the cart"});
    }
  })
})

app.post('/buyitemincart', (req,res) => {
  let body = req.body;
  const cartdata = require("./database/usercartdatabase.json");
  let usercartdata = cartdata[body.useremail];
  let groceryitemdata = usercartdata[body.itemname];
  let userboughtItem ={};
  userboughtItem[body.itemname] = groceryitemdata;
  let alluserboughtItem = {}; 
  alluserboughtItem[body.useremail] = userboughtItem;
  fs.readFile("./database/userpurchaseddatabase.json", (err,data) => {
    if(err){
      fs.writeFile("./database/userpurchaseddatabase.json", JSON.stringify(alluserboughtItem), (err) => {
        if(err){
          console.log(err);
        }
        else{
          let quantitydatabase = require("./database/groceryquantitydatabase.json");
          quantitydatabase[body.grocerytype][body.itemname].quantity -= 1;
          fs.writeFile("./database/groceryquantitydatabase.json", JSON.stringify(quantitydatabase), (err) => {
            if(err){
              console.log(err);
            }
          });
          deleteUserCartItemAfterBought(body.useremail, body.itemname)
          res.send({"key":"Item is successfully purchased"});
        }
      })
    }
    else{
      const userpurchaseddata = require("./database/userpurchaseddatabase.json");
      let usernamedata = Object.keys(userpurchaseddata);
      if(usernamedata.includes(body.useremail)){
        let userpurchaseditem = userpurchaseddata[body.useremail];
        userpurchaseditem[body.itemname] = usercartdata[body.itemname];
        let datapurchased = JSON.parse(data);
        datapurchased[body.useremail] = userpurchaseditem;
        fs.writeFile("./database/userpurchaseddatabase.json", JSON.stringify(datapurchased), (err) => {
          if(err){
            console.log(err);
          }
          else{
            let quantitydatabase = require("./database/groceryquantitydatabase.json");
            quantitydatabase[body.grocerytype][body.itemname].quantity -= 1;
            fs.writeFile("./database/groceryquantitydatabase.json", JSON.stringify(quantitydatabase), (err) => {
              if(err){
                console.log(err);
              }  
            });
            deleteUserCartItemAfterBought(body.useremail, body.itemname)
            res.send({"key":"Item is successfully purchased"});
          }
        });
      }else{
        let userboughtItem1 = {};
        userboughtItem1[body.useremail] = userboughtItem;
        let datacart = JSON.parse(data)
        let finalcartdata = {...datacart, ...userboughtItem1};
        fs.writeFile("./database/userpurchaseddatabase.json", JSON.stringify(finalcartdata), (err) => {
          if(err){
            console.log(err);
          }
          else{
            let quantitydatabase = require("./database/groceryquantitydatabase.json");
            // console.log(quantitydatabase);
            quantitydatabase[body.grocerytype][body.itemname].quantity -= 1;
            fs.writeFile("./database/groceryquantitydatabase.json", JSON.stringify(quantitydatabase), (err) => {
              if(err){
                console.log(err);
              }
            });
            deleteUserCartItemAfterBought(body.useremail, body.itemname)
            res.send({"key":"Item is successfully purchased"});
          }
        })
      }
      
    }
  })
})

app.post('/buyallitemincart', (req,res) => {
  let body = req.body;
  let useremail = body.useremail;
  const cartdata = require("./database/usercartdatabase.json");
  let usercartitems = cartdata[body.useremail];
  if(usercartitems === undefined){
    res.send({"key":"Cart is Empty...Add items to cart to purchase"});
  }
  else{
    let usercartitemkeys =Object.keys(usercartitems)
    for(let index=0; index<usercartitemkeys.length ; index++){
      let body1={};
      body1["useremail"] = body.useremail;
      body1["itemname"] = usercartitemkeys[index];

      const grocerydatabase = require("./database/groceryquantitydatabase.json");
      let grocerytypeList = Object.keys(grocerydatabase);
      let grocerytype;
      for(let typeindex=0; typeindex< grocerytypeList.length; typeindex++){
          let itemtypekeys = Object.keys(grocerydatabase[grocerytypeList[typeindex]])
          if(itemtypekeys.includes(body1.itemname)){
              grocerytype = grocerytypeList[typeindex];
              break;
          }
      }
      const quantitydatabase = require("./database/groceryquantitydatabase.json");
      quantitydatabase[grocerytype][body1.itemname].quantity -= 1;
      fs.writeFile("./database/groceryquantitydatabase.json", JSON.stringify(quantitydatabase), (err) => {
          if(err){
            console.log(err);
          }
      });
      addPurchasedItemToDatabase(body1);
    }
    deleteAllCartItemsAfterBought(useremail);
    res.send({"key" : "All Items in cart is successfully purchased"});
  }
})

app.post('/purchasehistorydata', (req,res) => {
  let body = req.body;
  const purchasedata = require("./database/userpurchaseddatabase.json");
  let userkeyspurchasedata = Object.keys(purchasedata)
  if(userkeyspurchasedata.includes(body.useremail)){
    res.send(purchasedata[body.useremail]);
  }
  else{
    res.send({});
  }
})

app.post('/deletepurchaseditem', (req,res) => {
  let body = req.body;
  const purchaseddata = require("./database/userpurchaseddatabase.json");
  let userpurchaseddata = purchaseddata[body.useremail];
  delete userpurchaseddata[body.itemname];
  purchaseddata[body.useremail] = userpurchaseddata;
  fs.writeFile("./database/userpurchaseddatabase.json", JSON.stringify(purchaseddata), (err) => {
    if(err){
      console.log(err);
    }
    else{
      res.send({"key":"Item is removed from the purchase history"});
    }
  })
})

app.post('/buyagainaddtocart', (req,res) => {
  let body = req.body;
  addtocart(body);
  res.send({"key" : "Item added to cart successfully"});

})

function deleteUserCartItemAfterBought(useremail,itemname){
  const cartdata = require("./database/usercartdatabase.json");
  let usercartdata = cartdata[useremail];
  delete usercartdata[itemname];
  cartdata[useremail] = usercartdata;
  fs.writeFile("./database/usercartdatabase.json", JSON.stringify(cartdata), (err) => {
    if(err){
      console.log(err);
    }
  })

}

function deleteAllCartItemsAfterBought(useremail){
  const cartdata = require("./database/usercartdatabase.json");
  cartdata[useremail] = {};
  fs.writeFile("./database/usercartdatabase.json", JSON.stringify(cartdata), (err) => {
    if(err){
      console.log(err);
    }
  });

}

function addPurchasedItemToDatabase(body){
  const cartdata = require("./database/usercartdatabase.json");
  let usercartdata = cartdata[body.useremail];
  let groceryitemdata = usercartdata[body.itemname];
  let userboughtItem ={};
  userboughtItem[body.itemname] = groceryitemdata;
  let alluserboughtItem = {}; 
  alluserboughtItem[body.useremail] = usercartdata;

  fs.readFile("./database/userpurchaseddatabase.json", (err,data) => {
    if(err){
      fs.writeFile("./database/userpurchaseddatabase.json", JSON.stringify(alluserboughtItem), (err) => {
        if(err){
          console.log(err);
        }
      })
    }
    else{
      const userpurchaseddata = require("./database/userpurchaseddatabase.json");
      let usernamedata = Object.keys(userpurchaseddata);
      if(usernamedata.includes(body.useremail)){
        let userpurchaseditem = userpurchaseddata[body.useremail];
        userpurchaseditem[body.itemname] = usercartdata[body.itemname];
        let datapurchased = JSON.parse(data)
        datapurchased[body.useremail] = userpurchaseditem;
        fs.writeFile("./database/userpurchaseddatabase.json", JSON.stringify(datapurchased), (err) => {
          if(err){
            console.log(err);
          }
        });
      }else{
        let datacart = JSON.parse(data)
        let finalcartdata = {...datacart, ...alluserboughtItem};
        fs.writeFile("./database/userpurchaseddatabase.json", JSON.stringify(finalcartdata), (err) => {
          if(err){
            console.log(err);
          }
        })
      }
      
    }
  })
}

function addtocart(body){
  let purchaseddatabase = require("./database/userpurchaseddatabase.json");

  let userpurchaseddatabase = purchaseddatabase[body.useremail]
  let data2 = userpurchaseddatabase[body.itemname];
  let cartItem ={};
  cartItem[body.itemname]= data2;
  let usercartItems ={};
  usercartItems[body.useremail]= cartItem;
  fs.readFile("./database/usercartdatabase.json", (err,data) => {
    if(err){
      fs.writeFile("./database/usercartdatabase.json", JSON.stringify(usercartItems), (err) => {
        if(err){
          console.log(err);
        }
      })
    }
    else{
      const cartdata = require("./database/usercartdatabase.json");
      let usernamedata = Object.keys(cartdata);
      if(usernamedata.includes(body.useremail) && cartdata != {}){
        let itemsincart = cartdata[body.useremail];
        itemsincart[body.itemname] = cartItem[body.itemname];
        let datacart = JSON.parse(data)
        datacart[body.useremail] = itemsincart;
        fs.writeFile("./database/usercartdatabase.json", JSON.stringify(datacart), (err) => {
          if(err){
            console.log(err);
          }
        });
      }else{
        let datacart = JSON.parse(data)
        let finalcartdata = {...datacart, ...usercartItems};
        fs.writeFile("./database/usercartdatabase.json", JSON.stringify(finalcartdata), (err) => {
          if(err){
            console.log(err);
          }
        })
      }
      
    }
  })
}

app.listen(port, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Server is running successfully");
    }
  });