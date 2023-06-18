const userModel =  require('../models/user.model');
const { sign } = require('jsonwebtoken');


getUserList = (req, res) => {
    userModel.getAllUser((err, user) => {
        console.log('User', user);
 
        res.send(user);
    });

}

login = async (req, res) => {

    const loginData = req.body;

    // console.log(loginData);

    if(req.body.contructor === Object && Object.keys(req.body).length === 0) {
        res.send(400).send({
            success: false, 
            message: 'Please fill all fields'
        })
    } else {

     userModel.login(loginData, (err, user) => {
            const jsontoken = sign({user: user}, "userLogin", {
              expiresIn: "1h"  
            });

             return res.json({
                success: 1,
                message: "Logn successfully",
                data: user,
                token: jsontoken
            })
        })

    }

    // return res.json({
    //     success: 1,
    //     message: 'Success'
    // });

}



module.exports = { login, getUserList }