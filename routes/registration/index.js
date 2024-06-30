// const Router = require('koa-router');
// const users = require('../../db/users.js');


// const router = new Router;

// router.post('/registration', (ctx) => {
//   const user = ctx.request.body;
//   ctx.response.set('Access-Control-Allow-Origin', '*');
//   if (users.data.find(item => item.name == user.user) !== undefined) {
//       ctx.response.status = 400
//       ctx.response.body = { status: "Пользователь с таким ником уже существует" }
//       return
//   }

//   users.data.find(item => item.name == '').name = user.user
//   ctx.response.status = 200
// });

// module.exports = router;


