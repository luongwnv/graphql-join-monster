const bcrypt = require('bcrypt');
const koa_router = require('koa-router');

const utils = require('../utils/auth');
const { authenticateJWT } = require('../utils/auth');
const db = require('../db/knex');
const router = new koa_router({
    prefix: '',
});

router.post('/signup', async(ctx) => {
    const { username, password } = ctx.request.body;
    const hashPassword = bcrypt.hashSync(password, 10);
    const entity = {
        username,
        password: hashPassword,
    };
    const user = await db('accounts')
        .insert(entity)
        .returning('*');
    ctx.body = {
        status: 201,
        messsage: 'signup ok',
        user: user,
    };
});

router.post('/login', async(ctx, next) => {
    const { username, password } = ctx.request.body;
    const [user] = await db('accounts').where({ username });
    const isValid = bcrypt.compare(password, user.password);
    if (isValid) {
        const token = utils.getToken(user.username, user.password, user.role);
        ctx.body = {
            username,

            token,
        };
    } else {
        ctx.body = {
            messsage: 'login no',
        };
    }
});

router.get('/test', authenticateJWT, async(ctx, next) => {
    const book = await db('books');
    ctx.body = {
        status: 200,
        messsage: 'authenzation ok',
        book: book,
    };
});

module.exports = router;