

function getLogin (req,res) {
    res.render("login-form");
}

function getSystem (req, res) {
    res.render("system");
}

module.exports = {
    getLogin,
    getSystem
}
