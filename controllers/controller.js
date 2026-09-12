const db = require("../db/queries");
const bcrypt = require("bcryptjs");
const { body, validationResult, matchedData } = require("express-validator");

// let validateUser = [
//   body("fullname").trim().isLength({ max: 50 }).withMessage(`Message must be at most 50 characters`),
//   body("username").trim().isLength({ min: 6, max: 50 }).withMessage(`Username must be between 6 and 50 characters.`),
//   body("password").trim().isLength({ max: 50 }).withMessage(`Password must be at most 50 characters`),
//   body("title").trim().isLength({ max: 50 }).withMessage(`Title must be at most 50 characters`),
//   body("message").trim().isLength({ max: 250 }).withMessage(`Message must be at most 250 characters`)
// ];

let validateUser;

async function homeGet(req, res) {

    const messages = await db.getMessages();
    
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

// async function signUpPost(req, res) {

//     const { fullname, username, password } = req.body;

//     const result = validationResult(req);
    
//     if (!result.isEmpty()) {

//         console.log(result);
                
//         res.send(result.errors[0].msg);

//         return;

//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     await db.insertUser(fullname, username, hashedPassword);

//     res.redirect("/");

// };

const signUpPost = [
    validateUser = [body("fullname").trim().isLength({ max: 50 }).withMessage(`Message must be at most 50 characters`),
  body("username").trim().isLength({ min: 6, max: 50 }).withMessage(`Email must be between 6 and 50 characters.`),
  body("password").trim().isLength({ max: 50 }).withMessage(`Password must be at most 50 characters`)],
    async (req, res) => {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {

            return res.status(400).render("signUpView", {errors: errors.array()});

        }

        const { fullname, username, password } = matchedData(req);

        const hashedPassword = await bcrypt.hash(password, 10);

        await db.insertUser(fullname, username, hashedPassword);

        res.redirect("/");

    }
];

// const  = [
//     validateUser,
//     async (req, res) => {

//         const errors = validationResult(req);

//         if (!errors.isEmpty()) {

//             return res.status(400).render("", {errors: errors.array()});

//         }

//         const {  } = matchedData(req);

//     }
// ];

async function joinClubGet(req, res) {

    console.log(req.user);
    // console.log(validateUser[2]);
    
    res.render("joinClubView", { user: req.user });

};

// async function joinClubPost(req, res) {

//     let status;

//     if (req.body.passcode == 'eggnog') status = 'yes';

//     if (req.body.passcode == 'scotch') status = 'admin';
    
//     // username comes from cookie, passcode comes from form
    
//     await db.joinClub(req.user.username, status);

//     res.redirect("/");

// };

const joinClubPost = [
    validateUser = [body("passcode").trim().isLength({ max: 50 }).withMessage(`Passcode must be at most 50 characters`)],
    async (req, res) => {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {

            console.log(errors.array());
            

            return res.status(400).render("joinClubView", {user: req.user, errors: errors.array()});

        }

        const { passcode } = matchedData(req);

        let status;

        if (passcode == 'eggnog') status = 'yes';

        else if (passcode == 'scotch') status = 'admin';

        else status = req.user.membership;

        // username comes from cookie, passcode comes from form

        console.log(passcode, req.user.membership, status);
    
        await db.joinClub(req.user.username, status);

        res.redirect("/");

    }
];

function newMessageGet(req, res) {

    res.render("newMessageView", { user: req.user });

};


// async function newMessagePost(req, res) {

//     const { title, message } = req.body;

//     await db.insertMessage(req.user.username, title, message);

//     res.redirect("/");

// };

const newMessagePost = [
    validateUser = [body("title").trim().isLength({ max: 50 }).withMessage(`Title must be at most 50 characters`),
  body("message").trim().isLength({ max: 250 }).withMessage(`Message must be at most 250 characters`)],
    async (req, res) => {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {

            return res.status(400).render("", {errors: errors.array()});

        }

        const { title, message } = matchedData(req);

        await db.insertMessage(req.user.username, title, message);

        res.redirect("/");

    }
];

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