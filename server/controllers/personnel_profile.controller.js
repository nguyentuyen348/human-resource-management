const personnelProfile = require("../models/personnel_profile.model");

module.exports = {

    getById: (req, res) => {
        const id = req.params.id;
        personnelProfile.getById(id, (result) => {
            res.send(result);
        });
    },

    getAllPaginate: (req, res) => {
        const query = req.query;
        personnelProfile.getAllPaginate(query,(result) => {
            res.send(result);
        });
    },

    createPersonnelProfile: (req, res) => {
        const request = req.query;
        personnelProfile.create_profile(request,(result) => {
            res.send(result);
        });
    }


}