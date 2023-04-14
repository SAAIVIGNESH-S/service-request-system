const express = require("express");
const mongoose = require("mongoose");

const app = express();
const ejs = require("ejs");
app.set("view engine", "ejs");
app.use(express.static("public"));

// const bodyParser = require("body-parser");
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json())
// app.use(require('connect').bodyParser());

const router = require("./source/routes/routes");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", router);

// For accessing the variables in .env files..
const dotenv = require("dotenv");
dotenv.config();

// async function listDatabases(client){
//     databasesList = await client.db().admin().listDatabases();

//     console.log("Databases:");
//     databasesList.databases.forEach(db => console.log(` - ${db.name}`));
// };
// // Version upgrade so this code..
// async function dbConnect() {
//     const client = new MongoClient(process.env.MONGODB_URL);
//     try {
//         await client.connect()
//         await  listDatabases(client);

//     } catch (e) {
//         console.error(e);
//     } finally {
//         await client.close();
//     }

// }

// dbConnect().then(() => {
//     console.log("DB connected Tring to run server")
//     app.listen((process.env.PORT || 8080), () => {
//         console.log("Server is running")
//     })
// })

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("Connected to the database ");
    app.listen(process.env.PORT || 8080, () => {
      console.log("Server is running");
    });
  })
  .catch((err) => {
    console.error(`Error connecting to the database. n${err}`);
  });
