<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Todo App</title>
    <link rel="stylesheet" href="/css/style.css">
</head>
<body>
    <div class="container">
        <h1>Todo List</h1>
        
        <form id="todo-form" class="todo-form">
            <input type="text" id="todo-input" placeholder="Add a new todo" required>
            <button type="submit">Add Todo</button>
        </form>

        <ul id="todo-list" class="todo-list">
            <% todos.forEach(todo => { %>
                <li class="todo-item <%= todo.completed ? 'completed' : '' %>" data-id="<%= todo._id %>">
                    <input type="checkbox" class="todo-checkbox" <%= todo.completed ? 'checked' : '' %>>
                    <span class="todo-text"><%= todo.title %></span>
                    <button class="delete-btn">Delete</button>
                </li>
            <% }); %>
        </ul>
    </div>
    <script src="/js/main.js"></script>
</body>
</html>

<!-- src/views/error.ejs -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Error</title>
    <link rel="stylesheet" href="/css/style.css">
</head>
<body>
    <div class="container">
        <h1>Error</h1>
        <p><%= error %></p>
        <a href="/" class="btn">Go Back</a>
    </div>
</body>
</html>