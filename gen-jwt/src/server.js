const express = require("express");
const app = express();
const fs = require("fs");
const config = require("../config/config");
const token = require("../token/token");
const { v4: uuidv4 } = require("uuid");

app.use(express.static(__dirname));

app.get("/config", (req, res) => {
  res.json(config);
  res.end();
});

// Common User Token
app.get("/tokenUser", (req, res) => {
    const uuid = uuidv4();
    const sub = `${uuid}`;
    const name = "User Name";
    const email = "abc@xpto.com";
    const groups = [];
    
    const genT = token.generate(sub, name, email, groups);
    res.json({genT});
    console.log(genT);
  });

//Anonymous Token
app.get("/tokenAnon", (req, res) => {
    const uuid = uuidv4();
    const sub = `ANON\\${uuid}`;
    const name = 'Anonymous';
    const email = `${uuid}@anonymoususer.anon`;
    const groups = ['anonymous'];
    
    const genT = token.generate(sub, name, email, groups);
    res.json({genT});
    console.log(genT);
  });

//create a server object:
app.listen(8080); //the server object listens on port 8080


