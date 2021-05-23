const express = require("express");
const cors = require('cors');
const {dbConnection} = require("../database/config");

class Server {
  
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.usersPath = '/api/users';

    // Connect Database
    this.connectDB();
    

    // Middlewares
    this.middlewares();


    // Rutas de mi aplicación

    this.routes();
  }

  async connectDB(){

    await dbConnection();
  }
  
  middlewares(){

    //cors
    this.app.use(cors());

    // Parseo and row body
    this.app.use(express.json());

    // Directory public
    this.app.use(express.static('public'))
  }

  routes() {
   
   this.app.use(this.usersPath ,require('../routes/users'))

  }


  listen() {
    this.app.listen(this.port, () => {
      console.log("Servidor corriendo en puerto",this.port);
    });
  }

}

module.exports = Server;
