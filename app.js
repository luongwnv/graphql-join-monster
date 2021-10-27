const Koa = require("koa");
const KoaRouter = require("koa-router");
const graphqlHTTP = require("koa-graphql");
const koaConvert = require("koa-convert");

const schema = require("./schema/index");
const loginRouter = require("./api/login");

const app = new Koa();
const router = new KoaRouter();

router.post(
  "/",
  koaConvert(
    graphqlHTTP({
      schema,
      formatError: (e) => {
        console.error(e);
        return e;
      },
      context: (ctx) => context(ctx),
    })
  )
);

app.use(router.routes());
app.use(router.allowedMethods());
app.use(loginRouter.routes());

const context = (ctx, next) => {
  const { authorization: token } = ctx.headers;
  const userVerified = jwt.verify(token, secret);
  return { userVerified };
};

const port = 3000;
app.listen(port, () => console.log(`server listening at http://localhost:${port}`));
