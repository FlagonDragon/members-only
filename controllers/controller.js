const db = require("../db/queries");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");

function homeGet(req, res) {

    res.render("homeView", { user: req.user });

};

// function logInPost(req, res) {

//     passport.authenticate("local", {
//         successRedirect: "/info",
//         failureRedirect: "/info",
//         failureMessage: true,
//     })

// };

function logOutGet(req, res, next) {

    req.logout((err) => {
        if (err) {
            return next(err);
        }
        res.redirect("/");
    });

};

async function infoGet(req, res) {

    const data = await db.getData();
    
    res.render("infoView", {data: data});

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

async function joinClubGet(req, res) {

    res.render("joinClubView");

};

async function joinClubPost(req, res) {

    const { username, passcode } = req.body;

    console.log('USERNAME: '+username);
    console.log('PASSCODE: '+passcode);
    

    if (passcode == 'eggnog') {
        await db.joinClub(username);
        console.log('SUCCESS!!!');
        
    }

    res.redirect("/");

};



module.exports = {
    homeGet,
    // logInPost,
    logOutGet,
    infoGet,
    signUpGet,
    signUpPost,
    joinClubGet,
    joinClubPost
};