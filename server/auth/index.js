const router = require('express').Router();
const jwt = require('jsonwebtoken');


module.exports = router;

const users = {phil:{id:"phil", username:"phil",password:"junk"}};

const generateToken = async function(id) {
  return jwt.sign({id}, process.env.JWT)
}

const findByToken = async function(token) {
  return jwt.verify(token, process.env.JWT);
}

router.post('/login', async (req, res, next) => {

  console.log('zzzzzzzzzzzzzzzz', users);
  console.log('xxxxxxxxxxxxxxxx',req.body);

  const {username, password} = req.body;


  if ( users[username]) {
    res.send( { token: await generateToken(username)});
  }
  else {
    next( new Error("no user:", username));
  }

});

router.post('/signup', async (req, res, next) => {

  const {username,password} = req.body;
  if ( users[username] ) {
    res.status(401).send('User already exists');
  }
  else {
    users[username] = {id:username, username,password}; 
    res.send({ token: await generateToken( username ) });
  }

});

router.get('/me', async (req, res, next) => {

  const token = req.headers.authorization;

  const {id:username} = await findByToken(token);

  console.log('decoded token', username);

  if ( users[username]) {
    res.send( users[username]);
  }
  else {
    next( new Error("no user:", username) );
  }


});
