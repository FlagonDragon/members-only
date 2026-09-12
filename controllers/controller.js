const db = require("../db/queries");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");

async function homeGet(req, res) {

    // console.log(req.user);

    const messages = await db.getMessages();

    // console.log(messages);
    
    res.render("homeView", { messages: messages, user: req.user});

};

function logInGet(req, res) {

    res.render("logInView", { user: req.user });

};

function logOutGet(req, res, next) {
//req.logout is passport function to end session
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

    res.redirect("/");

};

async function joinClubGet(req, res) {

    console.log(req.user);

    res.render("joinClubView", { user: req.user });

};

async function joinClubPost(req, res) {

    let status;

    if (req.body.passcode == 'eggnog') status = 'yes';

    if (req.body.passcode == 'scotch') status = 'admin';
    
    // username comes from cookie, passcode comes from form
    
    await db.joinClub(req.user.username, status);

    res.redirect("/");

};

function newMessageGet(req, res) {

    res.render("newMessageView", { user: req.user });

};


async function newMessagePost(req, res) {

    const { title, message } = req.body;

    await db.insertMessage(req.user.username, title, message);

    res.redirect("/");

};

async function deleteMessageGet(req, res) {

    console.log(req.params.id);

    if (req.user.membership == 'admin') {
        await db.deleteMessage(req.params.id);
    } 

    res.redirect("/");

};

module.exports = {
    homeGet,
    logInGet,
    logOutGet,
    infoGet,
    signUpGet,
    signUpPost,
    joinClubGet,
    joinClubPost,
    newMessageGet,
    newMessagePost,
    deleteMessageGet
};