const db = require('../db/knex');
const bcrypt = require('bcrypt');

const accounts = 'accounts';

module.exports = {
    login: async function(username, password) {
        const [user] = await db(accounts).where({ username });
        try {
            const validUser = bcrypt.compare(password, user.password);
            if (validUser) {
                return user;
            } else {
                console.log('password did not match');
            }
        } catch (e) {
            console.error(e);
        }
    },

    signup: async function(username, password) {
        const hashPassword = bcrypt.hashSync(password, 10);
        const entity = {
            username,
            password: hashPassword,
        };
        try {
            await db(accounts).insert(entity);
        } catch (error) {
            ctx.body = {
                message: error,
            };
        }
    },
};