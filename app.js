//Invocamos variables express, dotenv, cookie-parser
import express from  'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser';
import router from './routes/router.js';

const app = express();

//seteamos el motor de las plantillas
app.set("view engine", "ejs");

//Seteamos la carpeta app para los archivos estaticos
app.use(express.static("public"));

//procesar datos enviados desde forms
app.use(express.urlencoded({extended:true}));
app.use(express.json());

//seteamos las variabes de entorno
dotenv.config({path: "./env/.env"});

//para poder setear las cookies
app.use(cookieParser());

//Llamar al router
app.use("/", router)

//Para eliminar la cache
app.use(function(req,res, next){
    if(!req.user)
        res.header("Cache-Control", "private, no-cache, no-store, must-revalidate");
    next();
})

const PORT = process.env.PORT || 7280
app.listen(PORT, ()=>{
    console.log(`SERVER UP running in ${PORT}`);
})