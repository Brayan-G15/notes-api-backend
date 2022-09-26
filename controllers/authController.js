import pkg from "jsonwebtoken";
import bcryptjs from "bcryptjs"
import { conection } from "../src/db.js";
import { promisify } from "util";

const  jwt = pkg;

//Procedimiento para registrarnos
export const register = async (req, res) => {
    try {
        const name = req.body.name;
        const user = req.body.user;
        const pass = req.body.pass;
        const mail = req.body.mail;
        let passHash = await bcryptjs.hash(pass, 8);
        console.log(name+ " "+user+" "+pass);
        //console.log(passHash);
        conection.query("INSERT INTO users SET ?", {user:user, name:name, mail:mail ,pass:passHash}, (error, results) => {
            if(error){
                console.log("el error es: " + error);
            }else {
                res.render('register', {
                    alert: true,
                    alertTitle: "Registration",
                    alertMessage: "¡Successful Registration!",
                    alertIcon:'success',
                    showConfirmButton: false,
                    timer: 5500,
                    ruta: 'login'
                });
            }
            if (user!=user) {
                console.log("usuario existente");
            }
            //res.redirect("/login")
        })
    } catch (error) {
         console.log(error);
    }
}

//Procedimineto para logearnos
export const login = async (req, res) => {
    try {
        const user = req.body.user
        const pass = req.body.pass        

        if(!user || !pass ){
            //mensaje de alerta si los datos son invalidos
            res.render('login',{
                alert:true,
                alertTitle: "Advertencia",
                alertMessage: "Ingrese un usuario y password",
                alertIcon:'info',
                showConfirmButton: true,
                timer: false,
                ruta: 'login'
            })
        }else{ //Si son validos busca en la tabla el usuario
            conection.query('SELECT * FROM users WHERE user = ?', [user], async (error, results)=>{
                if( results.length == 0 || ! (await bcryptjs.compare(pass, results[0].pass)) ){
                    res.render('login', {
                        alert: true,
                        alertTitle: "Error",
                        alertMessage: "Usuario y/o Password incorrectas",
                        alertIcon:'error',
                        showConfirmButton: true,
                        timer: false,
                        ruta: 'login'    
                    })
                }else{
                    //inicio de sesión OK
                    const id = results[0].id
                    const token = jwt.sign({id:id}, process.env.JWT_SECRETO, {
                        expiresIn: process.env.JWT_TIEMPO_EXPIRA
                    })
                    //generamos el token SIN fecha de expiracion
                   //const token = jwt.sign({id: id}, process.env.JWT_SECRETO)
                   console.log("TOKEN: "+token+" para el USUARIO : "+user)

                   const cookiesOptions = {
                        expires: new Date(Date.now()+process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
                        httpOnly: true
                   }
                   res.cookie('jwt', token, cookiesOptions)
                   res.render('login', {
                        alert: true,
                        alertTitle: "Conexión exitosa",
                        alertMessage: "¡LOGIN CORRECTO!",
                        alertIcon:'success',
                        showConfirmButton: false,
                        timer: 800,
                        ruta: ''
                   })
                }
            })
        }
    } catch (error) {
        console.log(error)
    }
}

export const isAuthenticated = async (req, res, next)=>{
    if (req.cookies.jwt) {
        try {
            const decodificada = await promisify(jwt.verify)(req.cookies.jwt, process.env.JWT_SECRETO)
            conection.query('SELECT * FROM users WHERE id = ?', [decodificada.id], (error, results)=>{
                if(!results){return next()}
                req.user = results[0]
                return next()
            })
        } catch (error) {
            console.log(error)
            return next()
        }
    }else{
        res.redirect('/login')        
    }
}

export const logout = (req, res)=>{
    res.clearCookie('jwt')   
    return res.redirect('/')
}

//Metodo para depositos
export const deposit = (req, res) =>{
    try {
        const userDeposit = req.body.userDeposit;
        const txid =req.body.TXID;
        const usd = req.body.depositTotal;
        const file = req.body.file;
        console.log(userDeposit+" "+ txid+" "+usd+" "+file);
        conection.query("INSERT INTO deposit SET ?", {userDeposit:userDeposit, TXID:txid, usd:usd, file:file}, (error, results) => {
            if (error) {
                console.log("el error es: "+ error);
            }else {
                res.render('register', {
                    alert: true,
                    alertTitle: "Deposit",
                    alertMessage: "¡Successful deposit!",
                    alertIcon:'success',
                    showConfirmButton: false,
                    timer: null,
                    ruta: ''
                });
            }

            //res.redirect("/")
        })
    } catch (error) {
        console.log(error)
    }
}

//metodo para retiros
export const withdrawals = (req, res) => {
    try {
        const wallet = req.body.wallet;
        const usd = req.body.usdRetiro;
        const user = req.body.userName;

        console.log(`${user} ${wallet} ${usd}`);
        conection.query("INSERT INTO retiros SET ?", {userName:user, wallet:wallet, usdRetiro:usd}, (error, results) => {
            if(error){
                console.log(error);
            } else {
                res.render('register', {
                    alert: true,
                    alertTitle: "Withdraw",
                    alertMessage: "¡Successful withdraw!",
                    alertIcon:'success',
                    showConfirmButton: false,
                    timer: null,
                    ruta: ''
                });
            }
        })
    } catch (error) {
        console.log(error);
    }
    
}

//Procedimiento para registrar usuario invitado
export const guestUser = (req, res) =>{
    try {
        const user = req.body.user;
        const guestUser = req.body.guestUser;
        
        console.log(user+" "+ guestUser);
        conection.query("INSERT INTO guestUsers SET ?", {user:user, guestUser:guestUser}, (error, results) => {
            if (error) {
                console.log("el error es: "+ error);
            }else {
                res.render('register', {
                    alert: true,
                    alertTitle: "Success",
                    alertMessage: "¡Registered user!",
                    alertIcon:'success',
                    showConfirmButton: false,
                    timer: null,
                    ruta: ''
                });
            }

            //res.redirect("/")
        })
    } catch (error) {
        console.log(error)
    }
}