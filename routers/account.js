const express = require("express");
var router = express.Router();
const AccountModel = require("../models/account");

router.get("/", (req, res, next) => {
  AccountModel.find({})
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(500).json("co loi ben sever");
    });
});

router.get("/:id", (req, res, next) => {
  var id = req.params.id;
  AccountModel.findById(id)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(500).json("co loi ben phia sever");
    });
});

router.post("/", (req, res, next) => {
  var username = req.body.username;
  var password = req.body.password;

  AccountModel.findOne({
    username: username,
  })
    .then((data) => {
      if (data) {
        res.status(400).json("tai khoan da ton tai");
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
      res.status(500).json("co loi o phia sever");
    });
});

router.put("/:id", (req, res, next) => {
  var id = req.params.id;
  var newPassword = req.body.newPassword;

  AccountModel.findByIdAndUpdate(id, {
    password: newPassword,
  })
    .then((data) => {
      res.json("update thanh cong");
    })
    .catch((err) => {
      res.status(500).json("co loi ben phia sever");
    });
});

router.delete("/:id", (req, res, next) => {
  var id = req.params.id;
  AccountModel.findByIdAndDelete(id)
    .then((data) => {
      res.json("xoa thanh cong");
    })
    .catch((err) => {
      res.status(500).json("co loi ben phia sever");
    });
});

module.exports = router;
