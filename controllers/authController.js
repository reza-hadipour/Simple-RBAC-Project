const passport = require('passport');
const Role = require('../models/role');
const User = require('../models/user');

exports.registerUser = (req,res) => {
    const {username, password, role} =  req.body;
    const user = new User({username, role});

    User.register(user,password,(err)=>{
        if(err){
            console.log(err);
            return res.status(500).json({error: err.message})
        }else{
            req.login(user, (er) => { 
                if (er) { 
                    res.json({ success: false, message: er }); 
                } 
                else { 
                    res.json({ success: true, message: "Your account has been saved" }); 
                } 
            }); 
        }
    })
}

exports.loginUser = (req,res) => {
    return res.json({
        session: req.session,
        user: req.user
    })
}

exports.showAll = async (req,res)=>{
    const users = await User.find();
    return res.json(users);
}