const db = require("../db/queries");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");

async function homeGet(req, res) {

    console.log(req.user);

    const messages = await db.getMessages();

    console.log(messages);
    
    res.render("homeView", { messages: messages, user: req.user});

};

function logInGet(req, res) {

    res.render("logInView", { user: req.user });

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
        res.redirect("/log-in");
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

function newMessageGet(req, res) {

    res.render("newMessageView", { user: req.user });

};


function newMessagePost(req, res) {

    res.redirect("/");

};

module.exports = {
    homeGet,
    logInGet,
    // logInPost,
    logOutGet,
    infoGet,
    signUpGet,
    signUpPost,
    joinClubGet,
    joinClubPost,
    newMessageGet,
    newMessagePost,
};