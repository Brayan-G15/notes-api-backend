const express = require('express')
const router = express.Router();

const authController = require('../controllers/authController')


//router para las vistas
router.get("/", authController.isAuthenticated, (req, res)=>{
    res.render("index", {user:req.user})
})

router.get("/login", (req, res)=>{
    res.render("login", {alert:false})
})

router.get("/register", (req, res)=>{
    res.render("register")
})

// router.get("/logout", (req, res)=>{
//     res.render("login")
// })

router.get("/deposit", authController.isAuthenticated, (req, res)=>{
    res.render("deposit", {user:req.user})
})

router.get("/finance", (req, res)=>{
    res.render("finance")
})
router.get("/withdraw", authController.isAuthenticated, (req, res)=>{
    res.render("withdraw", {user:req.user})
})



//router para los métodos del controller
router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/logout', authController.logout); // se pone get cuando no expecificamos un action en el archivo ejs
router.post("/deposit", authController.deposit);
router.post("/withdraw", authController.withdrawals);
//segui realizando este procedimineto para encontrar las rutas faltantes

module.exports = router