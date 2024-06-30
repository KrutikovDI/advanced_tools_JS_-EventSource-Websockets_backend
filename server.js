const http = require('http');
const Koa = require('koa');
const koaBody = require('koa-body');
const WS = require('ws');
const { v4 } = require('uuid');

const app = new Koa();

const users = require('./db/users')

app.use(koaBody({
  urlencoded: true,
  multipart: true,
}));

app.use((ctx, next) => {
  const origin = ctx.request.get('Origin');
  if (!origin) {
    return next();
  }

  const headers = { 'Access-Control-Allow-Origin': '*', };

  if (ctx.request.method !== 'OPTIONS') {
    ctx.response.set({ ...headers });
    try {
      return next();
    } catch (e) {
      e.headers = { ...e.headers, ...headers };
      throw e;
    }
  }

  if (ctx.request.get('Access-Control-Request-Method')) {
    ctx.response.set({
      ...headers,
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH',
    });

    if (ctx.request.get('Access-Control-Request-Headers')) {
      ctx.response.set('Access-Control-Allow-Headers', ctx.request.get('Access-Control-Request-Headers'));
    }
    ctx.response.status = 204;
  }
});

const server = http.createServer(app.callback());
const port = 6060;
server.listen(port, (err) => {
    if (err) {
      console.log(err);
      return;
    }
  console.log('Server is listening to ' + port);
});


app.use((ctx) => {
  if (ctx.request.method !== 'POST') {
    return
  }
  const user = ctx.request.body;
  ctx.response.set('Access-Control-Allow-Origin', '*');
  if (users.data.find(item => item.name == user.name) !== undefined) {
      ctx.response.status = 400
      ctx.response.body = { status: "Пользователь с таким ником уже существует" }
      return
  }
  ctx.response.status = 200;
});

const wsServer = new WS.Server({
  server
});

wsServer.on('connection', (ws) => {

  ws.on('message', (message) => {
    const parseData = JSON.parse(message)
    console.log('слушаем сообщения:')
    console.log(parseData)

    if (parseData.userName) {
      ws.id = v4();
      users.add({id: ws.id, name: parseData.userName});
      console.log(users.data)
      Array.from(wsServer.clients)
      .filter(client => client.readyState === WS.OPEN)
      .forEach(client => client.send(JSON.stringify({ usersList: users.data })));
    }

    if (parseData.chatMessage) {
      const now = new Date();
      const date = now.getHours()+':'+now.getMinutes()+' '+now.getDate()+'.'+now.getMonth()+'.'+now.getFullYear();
      parseData.chatMessage.date = date
      const eventData = JSON.stringify({ chatMessage: parseData.chatMessage });
      Array.from(wsServer.clients)
      .filter(client => client.readyState === WS.OPEN)
      .forEach(client => client.send(eventData));
    }
  });

  ws.on('close', () => {
    users.delete(ws.id);
    Array.from(wsServer.clients)
    .filter(client => client.readyState === WS.OPEN)
    .forEach(client => client.send(JSON.stringify({ usersList: users.data })));
    console.log(users.data)
  });
});