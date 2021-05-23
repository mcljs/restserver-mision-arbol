const { response, request } = require("express");
const User = require('../models/user')
const bcryptjs = require('bcryptjs');


const usersGet = async(req = request, res = response) => {

  //const {q,nombre = 'No name',apikey} = req.query;
  const  {limit= 5,desde = 0}= req.query
  const query = {state: true}




  const [total,users] = await Promise.all([
  User.countDocuments(query),
  User.find(query)
    .skip(Number(desde))
    .limit(Number(limit)),
  ])

  res.json({
    total,
    users
  });
};


const usersPost = async (req, res = response) => {

  

  const {name,email,password,ci,rol} = req.body;
  const user = new User({name,email,password,ci,rol});


  // verificar correo
  const existCI = await User.findOne({ci});
  if(existCI){
    return res.status(400).json({
      msg: 'Esta cedula ya esta registrado'
    })
  } 

 
  //
  const salt = bcryptjs.genSaltSync();
  user.password = bcryptjs.hashSync(password,salt)

 await user.save();


  res.json({
    user
  });
};

const usersPut = async(req, res = response) => {

  const {id} = req.params;
  const {_id,password,google,email,ci, ...resto} = req.body;

  if(password){
  const salt = bcryptjs.genSaltSync();
  resto.password = bcryptjs.hashSync(password,salt)
  }

  const user = await User.findOneAndUpdate(id,resto);

  res.json(user);
};

const usersPatch = (req, res = response) => {
  res.json({
    msg: "patch API ",
  });
};

const usersDelete = async(req, res = response) => {

  const {id} = req.params;

  //const user = await User.findByIdAndDelete(id);

  const user = await User.findByIdAndUpdate(id,{state:false})
  res.json(user);
};


module.exports = {
  usersGet,
  usersPost,
  usersPut,
  usersPatch,
  usersDelete
};
