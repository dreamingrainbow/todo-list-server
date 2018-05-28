# todo-list-server
In this lesson we build a simple todo api server.

Inside our project folder we can initialize a new project with `npm init`.
Once we confirm our setup, we need to add our dependancies.

`npm i express body-parser cors`

Now, we can create our `index.js` file, and start writing some logic for our server.

First we need to import express, body-parser, and cors.

While we are at it lets, execute express, and initialize our todo list to a new empty array;

```JavaScript
const express = require('express');
const bodyParser = require('body-parser');
const Cors = require('cors');
const server = express();
let todoList = [];

```

Now we can add the body-parser middleware so that we can access our data in the body of our request as clean json objects.

```JavaScript
server.use(bodyParser.json());

```

We will need to setup cors, as we may want to allow others access to our api later.

```JavaScript
server.use(Cors());

```

Now we have our middleware implemented we can create the routes that make up our API server.
First we can start with our landing page, often the home page of the API Server.

Route [GET]  `/` the default route for our API Server.

```JavaScript
server.get('/', (request, response) => {
    response.send('<h1>TODO List API</h1>');
});

```
In this route we just return a welcome to the API message.

Now we need a way to list all of our todo's so we create one with a get method to return the list of todos.

Route [GET]  `/todo-list` to get the todo list.

```JavaScript
    server.get('/todo-list', (request, response) => {
        response.json({todoList});
    });

```
In this route we simple use the respone to return the todoList object as json.

Now that we have our todo list we need a way to get our todo's in the list so we create a post route.

Route [POST]  `/todo` to add a todo to the todo list.

```JavaScript
server.post('/todo', (request, response) => {
    const { todo } = request.body;
    todoList.push(todo);
    response.json(todoList);
});

```
In this route we take the todo out of the request body and push it to our todo list, and return our updated todo list.

Awesome now we have todo's in our list we need a way to update them. In this example we just use the `todoIndex` request parameter to select the one that should be marked as completed and update it with the date, and return the new updated todo list.

Route [PUT]  `/todo/:todoIndex` to update the todo in the todo list.

```JavaScript
server.put('/todo/:todoIndex', (request, response) => {
    const { todoIndex } = request.params;
    todoList[todoIndex].completed = Date.now();    
    response.json(todoList);
});

```
Only thing left for us to do for our todo list is to remove todo's once we have completed our list. So we create a delete route.

Route [DELETE]  `/todo/:todoIndex` to delete a todo from the list.

```JavaScript
server.delete('/todo/:todoIndex', (request, response) => {
    const { todoIndex } = request.params;
    todoList = todoList.filter((todo, i) => Number(todoIndex) !== i);
    response.json(todoList);
});

```
In this delete method we filter out the todo by its index and return the updated todo list.


Now that our routes for our todo list are complete we have one final step. Now we setup our server to listen.

```JavaScript
const app = server.listen(3001, () => {
    console.log(`Server was started.`)
});

```

In this example we setup the server to listen on port `3001`. 
Now, that we are finished writing our logic, its time to run our program.

`npm index.js` 

Should get us running, but how can we tell if its working?
    Let's open up our browser to localhost:3001 and we should see our welcome message. We can test our routes in one of our favorite testing tools, or build the client. 

## What next?
 Try building your own client with this lesson on building the client with server.
    https://github.com/dreamingrainbow/todo-list-client-with-server-lesson


