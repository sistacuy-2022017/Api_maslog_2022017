const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../db/config')

class Server{

    constructor(){
        this.app = express();
        this.port = process.env.PORT;  
        this.usuariosPath = '/api/usuarios';  
        this.usuariosPathe = '/api/mascotas';   
        this.authPath = '/api/auth';
        this.conetarDB();
        this.middlewares();
        this.routes();
    }

     async conetarDB(){
        await dbConnection();
     }

    middlewares(){
        this.app.use(express.static('public'));
        this.app.use(cors());
        this.app.use(express.json());
    }

    routes(){
        this.app.use(this.usuariosPath, require('../routes/user.routes'));
        this.app.use(this.usuariosPathe, require('../routes/mascota.routes'));
        this.app.use(this.authPath, require('../routes/auth.routes'));
    }

    listen(){
        this.app.listen(this.port, ()=>{
            console.log("servidos conectao" , this.port)
        });
    }

}

module.exports = Server;