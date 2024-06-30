// const Router = require('koa-router');
// const chat = require('../../db/chat.js')

// const router = new Router;

// router.post('/chat', (ctx) => {
//     const message = ctx.request.body;
//     ctx.response.set('Access-Control-Allow-Origin', '*');
//     const now = new Date();
//     const date = now.getHours()+':'+now.getMinutes()+' '+now.getFullYear()+'.'+now.getMonth()+'.'+now.getDate();
//     message.date = date;
//     chat.add(message);
//     ctx.response.status = 200;
//     ctx.response.body = chat.message
//     // console.log(chat.message);
// });

// module.exports = router;