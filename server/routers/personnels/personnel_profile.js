const personnelProfileController = require("../../controllers/personnel_profile.controller");
const { auth } = require('../../middleware/auth');

module.exports = function(router) {
    router.get("/personnel-profile/:id",auth, personnelProfileController.getById);
    router.get("/personnel-profile-list-paginate", personnelProfileController.getAllPaginate);
    router.post("/personnel/create", personnelProfileController.createPersonnelProfile);
};

