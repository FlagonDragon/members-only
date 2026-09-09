const { Router } = require("express");
const controller = require("../controllers/controller");
const router = Router();

router.get("/", controller.homeGet);

router.get("/info", controller.infoGet);

router.get("/sign-up", controller.signUpGet);

router.post("/sign-up", controller.signUpPost);

module.exports = router;
