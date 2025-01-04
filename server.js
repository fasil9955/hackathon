import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const express = require("express");
const app = express();
const userRoutes = require("./routes/userRoutes");
require("dotenv").config();

// Middleware
app.use(express.json());

// Routes
app.use("/", userRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(bodyParser.json());

const url =
  "mongodb+srv://myakalasravan56:sanjana10@cluster0.foizt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(url);

const db = mongoose.connection;
db.once("open", () => {
  console.log("connected");
});
let users = db.collection("users");

const checkRole = (roles) => async (req, res, next) => {
  const id = req.params.profile;
  users.find({ username: id }, (err, result) => {
    if (err) {
      res.send(err.code);
    }
    if (result.length === 0) {
      res.send("No Record Found");
    } else {
      !roles.includes(result[0].role)
        ? res.status(401).json("Sorry you do not have access to this route")
        : next();
    }
  });

  //
};
const employeeAuth = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) return res.sendStatus(403);
  console.log(authHeader); // Bearer token
  const token = authHeader.split(" ")[1];
  jwt.verify(token, "snjdncjkcjnhbhabhjbahbhabhakj", (err, decoded) => {
    console.log("verifying");
    console.log(decoded);
    if (err) {
      console.log(err.message);
      return res.sendStatus(403);
    } //invalid token
    else {
      next();
    }
  });
};



app.post("users/register", async (req, res) => {
  const { username, password, role, email } = req.body;
  console.log(req.body);
  console.log(password, "password");
  const pass = await bcrypt.hash(password, 7);
  const data = {
    username: username,
    password: pass,
    role: role,
    email: email,
  };
  users.insertOne(data, async (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      let token = await jwt.sign(
        {
          role: role,
          username: username,
          password: password,
        },
        "snjdncjkcjnhbhabhjbahbhabhakj",
        { expiresIn: "3 days" }
      );
      res.status(201).send(token);
    }
  });
});

app.post("/signIn", employeeAuth, (req, res) => {
  let username = req.body.username;
  console.log("hello");
  let password = req.body.password;
  console.log(username, password);
  var isMatch;

  users.findOne({ username: username }, async (err, result) => {
    console.log(result);
    if (err) {
      res.send(err.code);
    }
    if (result) {
      console.log("gg");
      isMatch = await bcrypt.compare(password, result?.password);
      console.log(isMatch);
      if (isMatch) {
        res.send("Success");
      } else {
        res.status(403).send("Invalid Credentials");
      }
    }
  });
});

app.listen(8000, () => {
  console.log("server is running on port 8000");
});

app.listen(PORT, () => {
  console.log(Server is running on http://localhost:${PORT});
});