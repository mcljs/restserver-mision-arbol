const Role = require('../models/role')
const User = require('../models/user')

const isRoleValid = async(rol='') => {
    const existRol = await Role.findOne({rol});
    if(!existRol){
      throw new Error(`el rol ${rol} no esta registrado en la BD`)
    }
  }

const isEmailExist = async(email= '') =>{
  const existEmail = await User.findOne({email});
  if(existEmail){
   throw new Error(`el email ${email} ya esta registrado en la BD`)
  } 

}

const isUserbyIdExist = async(id) =>{
  const existUser = await User.findById(id);
  if(!existUser){
   throw new Error(`el id no existe ${id}`)
  } 

}



module.exports = {
  isRoleValid,
  isEmailExist,
  isUserbyIdExist,
}
