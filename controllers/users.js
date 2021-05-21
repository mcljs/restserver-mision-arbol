const { response, request } = require("express");

const usersGet = (req = request, res = response) => {

  const {q,nombre = 'No name',apikey} = req.query;

  res.json({
    msg: "get API - constroller",
    q,
    nombre,
    apikey
  });
};


const usersPost = (req, res = response) => {

  const {nombre,edad} = req.body;

  res.json({
    msg: "post API ",
    nombre,
    edad
  });
};

const usersPut = (req, res = response) => {

  const {id} = req.params;

  res.json({
    msg: "put API ",
    id
  });
};

const usersPatch = (req, res = response) => {
  res.json({
    msg: "patch API ",
  });
};

const usersDelete = (req, res = response) => {
  res.json({
    msg: "delete API ",
  });
};


module.exports = {
  usersGet,
  usersPost,
  usersPut,
  usersPatch,
  usersDelete
};
