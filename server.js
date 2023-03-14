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
                  { "key" : "Successful" , "user" : body.useremail }
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
})

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
      let finaluserdata = {...data1, ...userdetails};
      fs.writeFile("./database/userdatabase.json", JSON.stringify(finaluserdata), (err) => {
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
  })
})

app.get('/qrocerydatabase', (req,res) => {
  res.send(data);
})

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
      console.log(err);
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
      if(usernamedata.includes(body.username)){
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

app.post('/viewcartpage', (req,res) => {
  let body = req.body;
  const cartdata = require("./database/usercartdatabase.json");
  let userkeys = Object.keys(cartdata);
  if(userkeys.includes(body.useremail)){
    res.send(cartdata[body.useremail]);
  }else{
    res.send();
  }
})

app.post('/removeitemincart', (req,res) => {
  let body = req.body;
  console.log(body);
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
  console.log(alluserboughtItem);
  fs.readFile("./database/userpurchaseddatabase.json", (err,data) => {
    if(err){
      fs.writeFile("./database/userpurchaseddatabase.json", JSON.stringify(alluserboughtItem), (err) => {
        if(err){
          console.log(err);
        }
        else{
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
        let datapurchased = JSON.parse(data)
        datapurchased[body.useremail] = userpurchaseditem;
        console.log(datapurchased);
        fs.writeFile("./database/userpurchaseddatabase.json", JSON.stringify(datapurchased), (err) => {
          if(err){
            console.log(err);
          }
          else{
            deleteUserCartItemAfterBought(body.useremail, body.itemname)
            res.send({"key":"Item is successfully purchased"});
          }
        });
      }else{
        let datacart = JSON.parse(data)
        let finalcartdata = {...datacart, ...userboughtItem};
        fs.writeFile("./database/usercartdatabase.json", JSON.stringify(finalcartdata), (err) => {
          if(err){
            console.log(err);
          }
          else{
            deleteUserCartItemAfterBought(body.useremail, body.itemname)
            res.send({"key":"Item is successfully purchased"});
          }
        })
      }
      
    }
  })
})

// app.post('/buyallitemincart', (req,res) => {
//   let body = req.body;
//   const cartdata = require("./database/usercartdatabase.json");
//   let usercartitems = cartdata[body.useremail];
//   fs.readFile("./database/userpurchaseddatabase.json", (err,data) => {
//     if(err){
//       fs.writeFile("./database/userpurchaseddatabase.json", JSON.stringify(alluserboughtItem), (err) => {
//         if(err){
//           console.log(err);
//         }
//         else{
//           deleteUserCartItemAfterBought(body.useremail, body.itemname)
//           res.send({"key":"Item is successfully purchased"});
//         }
//       })
//     }
//     // else{
//     //   const userpurchaseddata = require("./database/userpurchaseddatabase.json");
//     //   let usernamedata = Object.keys(userpurchaseddata);
//     //   if(usernamedata.includes(body.useremail)){
//     //     let userpurchaseditem = userpurchaseddata[body.useremail];
//     //     userpurchaseditem[body.itemname] = usercartdata[body.itemname];
//     //     let datapurchased = JSON.parse(data)
//     //     datapurchased[body.useremail] = userpurchaseditem;
//     //     console.log(datapurchased);
//     //     fs.writeFile("./database/userpurchaseddatabase.json", JSON.stringify(datapurchased), (err) => {
//     //       if(err){
//     //         console.log(err);
//     //       }
//     //       else{
//     //         deleteUserCartItemAfterBought(body.useremail, body.itemname)
//     //         res.send({"key":"Item is successfully purchased"});
//     //       }
//     //     });
//     //   }else{
//     //     let datacart = JSON.parse(data)
//     //     let finalcartdata = {...datacart, ...userboughtItem};
//     //     fs.writeFile("./database/usercartdatabase.json", JSON.stringify(finalcartdata), (err) => {
//     //       if(err){
//     //         console.log(err);
//     //       }
//     //       else{
//     //         deleteUserCartItemAfterBought(body.useremail, body.itemname)
//     //         res.send({"key":"Item is successfully purchased"});
//     //       }
//     //     })
//     //   }
      
//     // }
//   })
// })

function deleteUserCartItemAfterBought(useremail,itemname){
  const cartdata = require("./database/usercartdatabase.json");
  let usercartdata = cartdata[useremail];
  delete usercartdata[itemname];
  cartdata[useremail] = usercartdata;
  fs.writeFile("./database/usercartdatabase.json", JSON.stringify(cartdata), (err) => {
    if(err){
      console.log(err);
    }
    else{
      res.send({"key":"Item is removed from the cart"});
    }
  })

}

function deleteAllCartItemsAfterBought(useremail){
  const cartdata = require("./database/userpur.json");
  cartdata[req.useremail] = {};
  fs.writeFile("./database/usercartdatabase.json", JSON.stringify(cartdata), (err) => {
    if(err){
      console.log(err);
    }
    else{
      deleteAllCartItemsAfterBought(body.useremail)
      res.send({"key":"All Items in cart is successfully purchased"});
    }
  });

}

app.listen(port, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Server is running successfully");
    }
  });