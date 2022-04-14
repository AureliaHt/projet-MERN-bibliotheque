const jwt = require('jsonwebtoken');

const verifyJWT = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!authHeader?.startWith('Bearer')) return res.sendStatus(401);

    const token = authHeader.split(' ')[1];
    jwt.verify(
        token,
        process.env.SECRET_ACCESS_TOKEN,
        (err, decoded) => {
            if (err) return res.sendStatus(403);
            req.user = decoded.userInfo.pseudo;
            req.roles = decoded.userInfo.roles;
            next();
        }
    );
};

module.exports = verifyJWT;