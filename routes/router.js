const { Router } = require("express");
const controller = require("../controllers/controller");
const router = Router();
const { body, validationResult } = require("express-validator");


router.get("/", controller.homeGet);

router.get("/log-in", controller.logInGet);
// router.post("/log-in", controller.logInPost);

router.get("/log-out", controller.logOutGet);

router.get("/info", controller.infoGet);

router.get("/sign-up", controller.signUpGet);
router.post("/sign-up", body('passwordConfirmation').custom((value, { req }) => {return value === req.body.password;}), controller.signUpPost);

router.get("/join-club", controller.joinClubGet);
router.post("/join-club", controller.joinClubPost);

router.get("/new-message", controller.newMessageGet);
router.post("/new-message", controller.newMessagePost);

router.get("/delete-message/:id", controller.deleteMessageGet);

module.exports = router;
