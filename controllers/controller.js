const db = require("../db/queries");

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

    const { fullname, username } = req.body;

    await db.insertUser(fullname, username);

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