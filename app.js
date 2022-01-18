require("dotenv").config();
const { urlencoded } = require("body-parser");
const express = require("express");
const app = express();
const fs = require("fs-extra");
const serveStatic = require("serve-static");
const port = 8286;
const { MongoClient } = require("mongodb");
const { getDbData } = require("./mongodb");

const dbPort = process.env.DB_PORT;
const dbHost = process.env.DB_HOST;
const username = process.env.DB_USER;
const password = process.env.DB_PASS;

app.use(serveStatic("./public"));
app.use(urlencoded({ extended: true }));

const uri = `mongodb://${dbHost}:${dbPort}/?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false`;
const client = new MongoClient(uri);

app.get("/index", (req, res) => {
  res.send("index.html");
});

app.get("/contacts", (req, res) => {
  res.send("contacts.html");
});

app.get("/reminders", (req, res) => {
  res.send("reminders.html");
});

app.post("/contacts", (req, res) => {
  const data = req.body;
  res.json(req.body);
  //writeJsonFile(req.url, data);
  getDbData(client, "contacts", "userData", "insertOne", data);
});

app.post("/reminders", (req, res) => {
  const data = req.body;
  res.json(req.body);
  writeJsonFile(req.url, data);
  //console.log(getDbData("reminders", "reminders", "methodCB", "query"));
});

function writeJsonFile(fileName, data) {
  let filePath = `./files${fileName}.json`;
  let file = [];
  try {
    file = fs.readJSONSync(filePath);
  } catch (error) {
    fs.writeJsonSync(filePath, file);
    const file = fs.readJSONSync(filePath);
  }

  file.push(data);
  fs.writeJsonSync(filePath, file);
}

app.listen(port, () => {
  console.log(`server open at http://127.0.0.1:${port}`);
});
