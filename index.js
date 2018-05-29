const express = require('express');
const bodyParser = require('body-parser');
const Cors = require('cors');
const Twilio = require('twilio');
const twilio_credentials = require('./twilio_credentials');
const server = express();
const twilio = new Twilio(twilio_credentials.acount_sid, twilio_credentials.auth_token);
let todoList = [];

const stringifyTodoList = () => {
    return (todoList.map(todo => { return `${todo.todo} ${todo.completed}`}).join("\n"));
}

const sendTodoList = () => {
    if(todoList.length)
    twilio
        .messages
            .create({
                from: '+14807711723',
                to: '+14804338495',
                body: stringifyTodoList()
            })
            .then(function(message) {
                console.log('Reminder sent!');
                console.log('Message Id:', message.sid);
            });
}

setInterval(sendTodoList, 24 * 60 * 60 * 1000);

server.use(bodyParser.json());

server.use(Cors());

server.get('/', (request, response) => {
    response.send('<h1>TODO List API</h1>');
});

server.get('/todo-list', (request, response) => {
    response.json({todoList});
});

server.post('/todo', (request, response) => {
    const { todo } = request.body;
    todoList.push(todo);
    response.json(todoList);
    sendTodoList();
});

server.put('/todo/:todoIndex', (request, response) => {
    const { todoIndex } = request.params;
    todoList[todoIndex].completed = Date.now();
    response.json(todoList);
});


server.delete('/todo/:todoIndex', (request, response) => {
    const { todoIndex } = request.params;
    todoList = todoList.filter((todo, i) => Number(todoIndex) !== i);
    response.json(todoList);
});


const app = server.listen(3001, () => {
    console.log(`Server was started.`);
    sendTodoList();
});
