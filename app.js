const Koa = require('koa');
const graphqlHTTP = require('koa-graphql');
const mount = require('koa-mount');
const bodyParser = require('koa-body-parser');

const schema = require('./graphql');
const loginRouter = require('./api/login');

const app = new Koa();

app.use(bodyParser());

app.use(loginRouter.routes());

const context = async(ctx, next) => {
    const { authorization: token } = ctx.headers;
    console.log(token);
    const userVerified = jwt.verify(token, secret);
    return { userVerified };
};

app.use(
    mount(
        '/',
        graphqlHTTP(async(ctx) => ({
            schema,
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                //token: context(ctx),
            },
        }))
    )
);

const port = 3000;
app.listen(port, () =>
    console.log(`server listening at http://localhost:${port}`)
);