

document.addEventListener('DOMContentLoaded', () => {
    const todoForm = document.getElementById('todo-form');
    const todoInput = document.getElementById('todo-input');
    const todoList = document.getElementById('todo-list');

    // Show notification
    const showNotification = (message, type = 'success') => {
        const notification = document.createElement('div');
        notification.className = `${type}-message`;
        notification.textContent = message;
        document.querySelector('.container').insertBefore(notification, todoList);
        
        setTimeout(() => {
            notification.remove();
        }, 3000);
    };

    // Add new todo
    todoForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const title = todoInput.value.trim();
        if (!title) return;

        try {
            const response = await fetch('/api/todos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ title })
            });

            if (!response.ok) throw new Error('Failed to create todo');

            const todo = await response.json();
            
            // Create new todo element
            const li = createTodoElement(todo);
            todoList.insertBefore(li, todoList.firstChild);
            
            // Clear input
            todoInput.value