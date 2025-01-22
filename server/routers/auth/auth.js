const authController = require("../../controllers/auth.controller");
module.exports = function(router) {
    router.post("/login", authController.login);
};