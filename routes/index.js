var express = require('express');
var router = express.Router();

var jsend = require('jsend');//
router.use(jsend.middleware);//

var bodyParser = require('body-parser');//
var jsonParser = bodyParser.json();//

require('dotenv').config();//

var jwt = require('jsonwebtoken');//

const { isAuth } = require('../middleware/middleware');//

const fs = require('fs');//
const path = require('path');//
const participants = require('../data/participants');

const Ajv = require('ajv');//
const addFormats = require("ajv-formats");//
const ajv = new Ajv();//
addFormats(ajv);//
const schema = require('../json_schema/participantSchema');//

router.post('/login', jsonParser, function(req, res, next) {
  const { username, password } = req.body;
	if (username == null && password != null) {
		return res.jsend.fail({"statusCode": 400, "username": "Username is required!"});
	};
	if (username != null && password == null) {
		return res.jsend.fail({"statusCode": 400, "password": "Password is required!"})
	};
	if (username == null && password == null) {
		return res.jsend.fail({"statusCode": 400, "username": "Username is required!", "password": "Password is required!"})
	};

  let usersArray = JSON.parse(fs.readFileSync(path.resolve(__dirname, "../data/users.json")));
  let filteredArray = usersArray.filter(x => x.username == username);

  if(!filteredArray || filteredArray.length === 0 || filteredArray[0].password !== password) {
    return res.jsend.fail({"statusCode": 400, "result": "Incorrect username or password!"});
  };

  let token;
  try {
    token = jwt.sign(
      { username: filteredArray[0].username },
      process.env.TOKEN_SECRET,
      { expiresIn: "1h"}
    );
  } catch (err) {
    res.jsend.error("Something went wrong with creating JWT token!");
  }
  res.jsend.success({"statusCode": 200, "result": "You are now logged in.", "username": filteredArray[0].username, "token": token});
});

router.post('/participants/add', isAuth, function(req, res, next) {
  const newParticipant = req.body;
  const validate = ajv.compile(schema);
  const valid = validate(newParticipant);
  if(!valid) {
    return res.jsend.fail({"statusCode": 400, "result": validate.errors});
  };
  participants.push(newParticipant);
  res.jsend.success({"statusCode": 200, "result": newParticipant});
});

router.get('/participants', isAuth, function(req, res, next) {
  if(participants.length === 0) {
    return res.jsend.fail({"statusCode": 400, "result": "There are NO participants!"});
  };
  res.jsend.success({"statusCode": 200, "result": participants});
});

router.get('/participants/details', isAuth, function(req, res, next) {
  if(participants.length === 0) {
    return res.jsend.fail({"statusCode": 400, "result": "There are NO participants!"});
  };
  const result = participants.map((participant) => Object.values(participant)[0]);
  res.jsend.success({"statusCode": 200, "result": result});
});

router.get('/participants/details/:email', isAuth, function(req, res, next) {
  if(participants.length === 0) {
    return res.jsend.fail({"statusCode": 400, "result": "There are NO participants!"});
  };

  const filteredParticipant = participants.filter(x => x.participant[0].email == req.params.email);

  if(filteredParticipant.length === 0) {
    return res.jsend.fail({"statusCode": 400, "result": "No such a participant with that email!"});
  };

  const result = filteredParticipant.map((participant) => Object.values(participant)[0]);
  res.jsend.success({"statusCode": 200, "result": result});
});

router.get('/participants/work/:email', isAuth, function(req, res, next) {
  if(participants.length === 0) {
    return res.jsend.fail({"statusCode": 400, "result": "There are NO participants!"});
  };

  const filteredParticipant = participants.filter(x => x.participant[0].email == req.params.email);

  if(filteredParticipant.length === 0) {
    return res.jsend.fail({"statusCode": 400, "result": "No such a participant with that email!"});
  };

  const result = filteredParticipant.map((participant) => Object.values(participant)[1]);
  res.jsend.success({"statusCode": 200, "result": result});
});

router.get('/participants/home/:email', isAuth, function(req, res, next) {
  if(participants.length === 0) {
    return res.jsend.fail({"statusCode": 400, "result": "There are NO participants!"});
  };

  const filteredParticipant = participants.filter(x => x.participant[0].email == req.params.email);

  if(filteredParticipant.length === 0) {
    return res.jsend.fail({"statusCode": 400, "result": "No such a participant with that email!"});
  };

  const result = filteredParticipant.map((participant) => Object.values(participant)[2]);
  res.jsend.success({"statusCode": 200, "result": result});
});

router.delete('/participants/:email', isAuth, function(req, res, next) {
  if(participants.length === 0) {
    return res.jsend.fail({"statusCode": 400, "result": "There are NO participants!"});
  };

  const participantIndex = participants.findIndex(x => x.participant[0].email == req.params.email);

  if(participantIndex === -1) {
    return res.jsend.fail({"statusCode": 400, "result": "No such a participant with that email!"});
  };

  const result = participants.splice(participantIndex, 1);
  res.jsend.success({"statusCode": 200, "result": "The participant has been deleted!"});
});

router.put('/participants/:email', isAuth, function(req, res, next) {
  if(participants.length === 0) {
    return res.jsend.fail({"statusCode": 400, "result": "There are NO participants!"});
  };
  
  const participantIndex = participants.findIndex(x => x.participant[0].email == req.params.email);
  
  if(participantIndex === -1) {
    return res.jsend.fail({"statusCode": 400, "result": "No such a participant with that email!"});
  };

  const updatedParticipant = req.body;
  const validate = ajv.compile(schema);
  const valid = validate(updatedParticipant);
  if(!valid) {
    return res.jsend.fail({"statusCode": 400, "result": validate.errors});
  };
  participants[participantIndex] = updatedParticipant;
  res.jsend.success({"statusCode": 200, "result": updatedParticipant});
});

module.exports = router;

