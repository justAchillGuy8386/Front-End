let todos = JSON.parse(localStorage.getItem('todos')) || [];
let currentFilter = 'all'; // all, active, completed

const form = document.getElementById('todoForm');
const input = document.getElementById('todoInput');
const todoList = document.getElementById('todoList');
const todoCount = document.getElementById('todoCount');
const filtersContainer = document.querySelector('.filters');
const clearCompletedBtn = document.getElementById('clearCompletedBtn');

function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

function renderTodos() {
    todoList.innerHTML = '';
    
    let filteredTodos = todos;
    if (currentFilter === 'active') {
        filteredTodos = todos.filter(t => !t.completed);
    } else if (currentFilter === 'completed') {
        filteredTodos = todos.filter(t => t.completed);
    }

    filteredTodos.forEach(todo => {
        const li = document.createElement('li');
        li.className = `todo-item ${todo.completed ? 'completed' : ''}`;
        li.dataset.id = todo.id;

        const span = document.createElement('span');
        span.className = 'text';
        span.textContent = todo.text;
        
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn';
        deleteBtn.textContent = '❌';

        li.appendChild(span);
        li.appendChild(deleteBtn);
        todoList.appendChild(li);
    });

    updateCount();
}

function updateCount() {
    const activeCount = todos.filter(t => !t.completed).length;
    todoCount.textContent = `${activeCount} item${activeCount !== 1 ? 's' : ''} left`;
}

// Thêm todo
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = input.value.trim();
    if (!text) return;

    todos.push({
        id: Date.now().toString(),
        text: text,
        completed: false
    });
    input.value = '';
    saveTodos();
    renderTodos();
});

// Event Delegation cho xóa, toggle, edit
todoList.addEventListener('click', (e) => {
    const li = e.target.closest('.todo-item');
    if (!li) return;
    const id = li.dataset.id;
    const todoIndex = todos.findIndex(t => t.id === id);

    // Xóa
    if (e.target.classList.contains('delete-btn')) {
        todos.splice(todoIndex, 1);
        saveTodos();
        renderTodos();
    } 
    // Toggle completed
    else if (e.target.classList.contains('text')) {
        todos[todoIndex].completed = !todos[todoIndex].completed;
        saveTodos();
        renderTodos();
    }
});

todoList.addEventListener('dblclick', (e) => {
    if (e.target.classList.contains('text')) {
        const li = e.target.closest('.todo-item');
        const id = li.dataset.id;
        const todo = todos.find(t => t.id === id);
        
        const editInput = document.createElement('input');
        editInput.type = 'text';
        editInput.className = 'edit-input';
        editInput.value = todo.text;
        
        li.innerHTML = '';
        li.appendChild(editInput);
        editInput.focus();

        editInput.addEventListener('blur', () => finishEdit(id, editInput.value));
        editInput.addEventListener('keydown', (evt) => {
            if (evt.key === 'Enter') finishEdit(id, editInput.value);
            if (evt.key === 'Escape') renderTodos();
        });
    }
});

function finishEdit(id, newText) {
    newText = newText.trim();
    const todoIndex = todos.findIndex(t => t.id === id);
    if (newText) {
        todos[todoIndex].text = newText;
    } else {
        todos.splice(todoIndex, 1); // Xóa nếu text trống
    }
    saveTodos();
    renderTodos();
}

// Lọc
filtersContainer.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') {
        document.querySelectorAll('.filters button').forEach(btn => btn.classList.remove('active'));
        e.target.classList.add('active');
        currentFilter = e.target.dataset.filter;
        renderTodos();
    }
});

// Xóa completed
clearCompletedBtn.addEventListener('click', () => {
    todos = todos.filter(t => !t.completed);
    saveTodos();
    renderTodos();
});

// Initial render
renderTodos();
