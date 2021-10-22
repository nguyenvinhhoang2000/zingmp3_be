const express = require("express");
const app = express();
const port = 3000;
var bodyParser = require("body-parser");
const AccountModel = require("./models/account");

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.json("home");
});

app.post("/register", (req, res) => {
  var username = req.body.username;
  var password = req.body.password;

  AccountModel.findOne({
    username: username,
  })
    .then((data) => {
      if (data) {
        res.json("user nay da ton tai");
      } else {
        return AccountModel.create({
          username: username,
          password: password,
        });
      }
    })
    .then((data) => {
      res.json("Tao tai khoan thanh cong");
    })
    .catch((err) => {
      res.status(500).json("tao tai khoan that bai");
    });
});

app.post("/login", (req, res) => {
  var username = req.body.username;
  var password = req.body.password;

  AccountModel.findOne({
    username: username,
    password: password,
  })
    .then((data) => {
      if (data) {
        res.json("dang nhap thanh cong");
      } else {
        res.status(400).json("account khong dung");
      }
    })
    .catch((err) => {
      res.status(500).json("co loi ben sever");
    });
});

var accountRouter = require("./routers/account");
app.use("/api/account/", accountRouter);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
