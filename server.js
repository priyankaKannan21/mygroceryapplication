const express = require("express");
const app = express();
const fs = require("fs");
const data = require("./database/grocerydatabase.json")
app.use(express.static('./public'));
app.use(express.json())

const path = require("path");
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
                  { "key" : "successful" , "user" : body.useremail }
                );
              }
            }else{
              res.json(
                { "key" : "unsuccessful" }
              );
            }
            console.log(userdata);
        }
    })
})

app.post("/newuserdata", (req,res) => {
  let body = req.body;
  let userdetails = {};
  userdetails[body.useremail] = body;
  console.log("dD",userdetails);
  fs.readFile("./database/userdatabase.json", (err,data) => {
    if(err){
      console.log(err);
      fs.writeFile("./database/userdatabase.json", JSON.stringify(userdetails), (err) => {
        if(err){
          console.log(err);
        }
        else{
          res.json(
            { "key" : "successful" , "user" : body.useremail }
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
            { "key" : "successful" , "user" : body.useremail }
          );
        }
      })
    }
  })
})

app.get('/qrocerydatabase', (req,res) => {
  res.send(data);
})

app.listen(port, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Server is running successfully");
    }
  });