require("dotenv").config();
const express = require("express");
const app = express();
const fs = require("fs-extra");
const port = 8286;
const { MongoClient } = require("mongodb");
const { setDbData } = require("./mongodb");

const dbPort = process.env.DB_PORT;
const dbHost = process.env.DB_HOST;
const username = process.env.DB_USER;
const password = process.env.DB_PASS;

app.use(express.serveStatic("./public"));
app.use(express.urlencoded({ extended: true }));

const uri = `mongodb://${dbHost}:${dbPort}/?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false`;
const client = new MongoClient(uri);

app.post("/contacts", (req, res) => {
  const query = req.body;
  setDbData(client, "contacts", "userData", "insertOne", query);
  writeJsonFile(req.url, query);
  query.success = true;
  res.json(query);
});

app.post("/reminders", (req, res) => {
  const data = req.body;
  res.json(req.body);
  writeJsonFile(req.url, data);
});

function writeJsonFile(fileName, data) {
  let filePath = `./files${fileName}.json`;
  let file = [];
  try {
    file = fs.readJSONSync(filePath);
  } catch (error) {
    fs.writeJsonSync(filePath, file);
    file = fs.readJSONSync(filePath);
  }

  file.push(data);
  fs.writeJsonSync(filePath, file);
}

app.listen(port, () => {
  console.log(`Server open at http://127.0.0.1:${port}`);
});
