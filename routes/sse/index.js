// const Router = require('koa-router');
// const { streamEvents } = require('http-event-stream');
// const { v4 } = require('uuid');
// const users = require('../../db/users.js');

// const router = new Router();

// router.get('/sse', async (ctx) => {
//   streamEvents(ctx.req, ctx.res, {
//     async fetch() {
//       console.log();
//       return [];
//     },
//     async stream(sse) {
//       users.listen((item) => {
//         sse.sendEvent({
//           data: JSON.stringify(users.data),
//         });
//       });
//       return () => {};
//     },
//   });
//   ctx.respond = false;
// });

// module.exports = router;
