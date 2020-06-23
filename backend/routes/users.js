const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user");
const UserDetails = require("../models/userDetails");
const router = express.Router();

router.post("/signup", (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User({
                fullName: req.body.fullname,
                email: req.body.email,
                password: hash,
                type: "Standard"
            });
            user.save()
                .then(result => {
                    const userDetails = new UserDetails({
                        firstName: "",
                        lastName: "",
                        gender: "",
                        doBirth: "",
                        level: "",
                        institute: "",
                        created_on: Date.now(),
                        modified_on: Date.now(),
                        description : null,    
                        user: result._id
                      });
                      userDetails.save();
                    res.status(201).json({
                        message: 'User created',
                        result: result
                    });
                })
                .catch(err => {
                    res.status(500).json({
                        error: err
                    });
                });
        });
});

router.post("/login", (req, res, next) => {
  let fetchedUser;
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res.status(401).json({
          message: "Auth failed",
        });
      }
      fetchedUser = user;
      return bcrypt.compare(req.body.password, user.password);
    })
    .then((result) => {
      if (!result) {
        return res.status(401).json({
          message: "Authentication failed",
        });
      }
      const token = jwt.sign(
        {
          email: fetchedUser.email,
          fullname: fetchedUser.fullName,
          userId: fetchedUser._id,
        },
        "this_is_secret",
        { expiresIn: "1h" }
      );
      res.status(200).json({
        token: token,
         expiresIn: 3600,
        username: fetchedUser.fullName,
        accessLevel : fetchedUser.accessLevel,
        id: fetchedUser._id
      });
    })
    .catch((err) => {
      return res.status(401).json({
        message: "Authentication failed",
      });
    });
});

router.post("/:id",(req,res,next) => {
    UserDetails.updateOne({ user: req.params.id},{
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      gender: req.body.gender,
      //doBirth: null,
      level: req.body.level,
      institute: req.body.institute,
      //created_on: Date.now(),
      modified_on: Date.now(),
      description : req.body.description,    
      //user: req.body.user
    })
    .then((user) => {
      res.status(200).json({
        message : "opreration Success"
      });
    })
    .catch((err) => {
      res.status(401).json({
        message : "opreration Failed"
      });
    });
  });
  
  router.get("/:id",(req,res,next) => {
    UserDetails.findOne({user: req.params.id}).then((user) => {
      res.status(200).json({
        message : "operation succefull",
        userDetails : user
      });
    })
    .catch((err) => {
      res.status(401).json({
        userDetails : null
      });
    });
  });
module.exports = router;