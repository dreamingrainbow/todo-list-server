const express = require('express');
const bodyParser = require('body-parser');
const Cors = require('cors');
const server = express();
let todoList = [];

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

const app = server.listen(3000, () => {
    console.log(`Server was started.`)
});
