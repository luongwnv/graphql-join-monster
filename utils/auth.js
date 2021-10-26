const jwt = require('jsonwebtoken');

const secret = 'accesstoken';

module.exports = {
    getToken(username, password, role) {
        try {
            const payload = {
                username,
                password,
                role,
            };
            const token = jwt.sign(payload, secret, {
                algorithm: 'HS256',
                noTimestamp: false,
                expiresIn: '365d',
            });
            return token;
        } catch (error) {
            console.log(error);
        }
    },

    verifyToken(token) {
        try {
            const { username } = jwt.verify(token, secret);
            return { token, username };
        } catch (error) {
            console.log(error);
        }
    },

    async authenticateJWT(ctx, next) {
        const { authorization: token } = ctx.headers;
        if (!token) {
            ctx.body = {
                status: 401,
            };
        } else {
            try {
                jwt.verify(token, secret);
                await next();
            } catch (error) {
                ctx.body = {
                    status: 403,
                };
            }
        }
    },
};