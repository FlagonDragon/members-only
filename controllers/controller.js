const db = require("../db/queries");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");

function homeGet(req, res) {

    res.send('Homepage');

};

async function infoGet(req, res) {

    const data = await db.getData();
    
    res.render("homeView", {data: data});

};

function signUpGet(req, res) {

    res.render("signUpView");

};

async function signUpPost(req, res) {

    const { fullname, username, password } = req.body;

    const result = validationResult(req);
    
    if (!result.isEmpty()) {

        console.log(result);
                
        res.send(result.errors[0].msg);

        return;
        
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.insertUser(fullname, username, hashedPassword);

    const data = await db.getData();

    console.log(data);

    res.redirect("/");

};



module.exports = {
    homeGet,
    infoGet,
    signUpGet,
    signUpPost
};