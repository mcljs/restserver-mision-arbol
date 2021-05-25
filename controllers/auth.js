const {response} = require('express');
const bcryptjs = require('bcryptjs')
const User = require('../models/user');
const {generarJWT} = require('../helpers/generar-jwt');



const login = async(req,res = response) =>{

  const {ci,password} = req.body;

  try{


    const user = await User.findOne({ci});

    if(!user){
      return res.status(400).json({
        msg: 'Cedula/Contraseña no son corrrecta - Cedula'
      });
    }


 if(!user.state){
      return res.status(400).json({
        msg: 'Cedula/Contraseña no son corrrecta - estado:false'
      });
    }

    //verific password
    const validPassword = bcryptjs.compareSync(password, user.password);
    if(!validPassword){
 return res.status(400).json({
        msg: 'Cedula/Contraseña no son corrrecta - password'
      });

    }

    //JWT
    const token = await generarJWT(user.id);

  res.json({
    user,
    token
  })

  } catch(error){
    console.log(error);
    return res.status(500).json({
      msg: 'Hable con el administrador'
    })
  }


}




module.exports = {
  login
}
