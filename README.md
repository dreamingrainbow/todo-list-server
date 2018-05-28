# todo-list-server
In this lesson we build a simple todo api server.

Inside project folder we can initialize a new project with `npm init`.

Once we confirm our setup, we can create our `index.js` file, and start writing some logic for our server.

First we need to import express, body-parser, and cors.
While we are at it lets, execute express, and initialize our todo list to a new empty array;

```JavaScript
const express = require('express');
const bodyParser = require('body-parser');
const Cors = require('cors');
const server = express();
let todoList = [];

```
Now we can add body-parser so that we can access our data in the body of our request.
```JavaScript
server.use(bodyParser.json());

```
We will need to setup cors, as we may need to allow others access to our api.

```JavaScript
server.use(Cors());

```
Now we can create the routes that make up our API server.
First we can start with our landing page, often the home page of the API Server.

Route [GET]  `/` the default route for our API Server.
```JavaScript
server.get('/', (request, response) => {
    response.send('<h1>TODO List API</h1>');
});

```

Route [GET]  `/todo-list` to get the todo list.
```JavaScript
    server.get('/todo-list', (request, response) => {
        response.json({todoList});
    });

```

Route [POST]  `/todo` to add a todo to the todo list.

```JavaScript
server.post('/todo', (request, response) => {
    const { todo } = request.body;
    todoList.push(todo);
    response.json(todoList);
});

```

Route [PUT]  `/todo/:todoIndex` to update the todo in the todo list.
```JavaScript
server.put('/todo/:todoIndex', (request, response) => {
    const { todoIndex } = request.params;
    todoList[todoIndex].completed = Date.now();    
    response.json(todoList);
});

```

Route [DELETE]  `/todo/:todoIndex` to delete a todo from the list.
```JavaScript
server.delete('/todo/:todoIndex', (request, response) => {
    const { todoIndex } = request.params;
    todoList = todoList.filter((todo, i) => Number(todoIndex) !== i);
    response.json(todoList);
});

```

Finally we setup our server to listen.

```JavaScript
const app = server.listen(3001, () => {
    console.log(`Server was started.`)
});

```

