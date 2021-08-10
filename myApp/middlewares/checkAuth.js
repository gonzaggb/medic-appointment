function checkAuth(req, res, next) {
    if (req.isAuthenticated()) {
        next()
    }
    return res.redirect('/usuarios/login')
}

module.exports = { chechAuth }