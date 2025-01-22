const personnelProfileController = require("../../controllers/personnel_profile.controller");
module.exports = function(router) {
    router.get("/personnel-profile/:id", personnelProfileController.getById);
    router.get("/personnel-profile-list-paginate", personnelProfileController.getAllPaginate);
    router.post("/personnel/create", personnelProfileController.createPersonnelProfile);
};