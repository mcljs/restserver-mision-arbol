const {Schema,model} = require('mongoose')

const UserSchema = Schema({
  name: {
    type: String,
    required: [true, 'El nombre es obligatorio']
  },
   ci: {
    type: String,
    required: [true, 'La cedula de identidad es obligatorio'],
     unique: true
  },
   email: {
    type: String,
    required: [true, 'EL correo  es obligatorio'],
     unique: true
  },
  password: {
    type: String,
    required: [true, 'La contraseña es obligatoria']
  },
  img: {
    type: String,
   },
  rol: {
    type: String,
    require: true,
    emun: ['ADMIN_ROLE','USER_ROLE']
  },
  state: {
    type: Boolean,
    default: true
  },
  google: {
    type: Boolean,
    default: false
  }

});

UserSchema.methods.toJSON = function(){
  const {__v, password,...user} = this.toObject();
  return user;
}

module.exports = model('User',UserSchema);
