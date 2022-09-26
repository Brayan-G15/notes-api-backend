import {Router} from 'express'
const router = Router();

import {register,login, deposit, withdrawals, isAuthenticated, logout, guestUser} from '../controllers/authController.js'


//router para las vistas
router.get("/", isAuthenticated, (req, res)=>{
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

router.get("/deposit", isAuthenticated, (req, res)=>{
    res.render("deposit", {user:req.user})
})
router.get("/team", (req, res) => {
    res.render("team", {user:req.user})
})
router.get("/withdraw", isAuthenticated, (req, res)=>{
    res.render("withdraw", {user:req.user})
})
router.get("/finance", (req, res)=>{
    res.render("finance")
})
router.get("/aboutUs", (req, res)=>{
    res.render("aboutUs", {user:req.user})
})



//router para los métodos del controller
router.post('/register', register);
router.post('/login', login);
router.get('/logout', logout); // se pone get cuando no expecificamos un action en el archivo ejs
router.post("/deposit", deposit);
router.post("/withdraw", withdrawals);
router.post('/team', guestUser)
//router.post("/aboutUs", authController.aboutUs);
//segui realizando este procedimineto para encontrar las rutas faltantes

export default router;