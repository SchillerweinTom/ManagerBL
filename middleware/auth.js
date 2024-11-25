function authSession(req, res, next) {
    if (!req.session.userId) {
        return res.status(401).render('403');
    }
    req.user = {
        id: req.session.userId,
        username: req.session.username,
    };
    next();
}

module.exports = authSession;