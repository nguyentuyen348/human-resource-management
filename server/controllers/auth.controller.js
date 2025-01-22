const auth = require("../models/auth.model");

module.exports = {

    login: (req, res) => {
        const request = req.body;
        auth.login(request, (result) => {
            res.send(result);
        });
    },

}