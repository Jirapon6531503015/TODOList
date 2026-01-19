import { useState, useEffect } from 'react'
import './App.css'

const API_URL = 'http://localhost:8080/api/todos';

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState({ title: '', description: '' });
  const [filter, setFilter] = useState('all');
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ title: '', description: '' });

  // Fetch todos
  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setTodos(data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  // Add new todo
  const handleAddTodo = async (e) => {
    e.preventDefault();
    if (!newTodo.title.trim()) return;

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTodo)
      });
      const data = await response.json();
      setTodos([...todos, data]);
      setNewTodo({ title: '', description: '' });
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  // Toggle todo completion
  const handleToggleTodo = async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}/toggle`, {
        method: 'PATCH'
      });
      const updatedTodo = await response.json();
      setTodos(todos.map(todo => todo.id === id ? updatedTodo : todo));
    } catch (error) {
      console.error('Error toggling todo:', error);
    }
  };

  // Delete todo
  const handleDeleteTodo = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      setTodos(todos.filter(todo => todo.id !== id));
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  // Start editing
  const handleStartEdit = (todo) => {
    setEditingId(todo.id);
    setEditForm({ title: todo.title, description: todo.description || '' });
  };

  // Update todo
  const handleUpdateTodo = async (id) => {
    if (!editForm.title.trim()) return;

    try {
      const todoToUpdate = todos.find(t => t.id === id);
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...todoToUpdate,
          title: editForm.title,
          description: editForm.description
        })
      });
      const updatedTodo = await response.json();
      setTodos(todos.map(todo => todo.id === id ? updatedTodo : todo));
      setEditingId(null);
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  // Filter todos
  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  const stats = {
    total: todos.length,
    active: todos.filter(t => !t.completed).length,
    completed: todos.filter(t => t.completed).length
  };

  return (
    <div className="app">
      <div className="container">
        <h1>📝 Todo App</h1>
        
        {/* Add Todo Form */}
        <form onSubmit={handleAddTodo} className="add-todo-form">
          <input
            type="text"
            placeholder="Title..."
            value={newTodo.title}
            onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
            className="input-title"
          />
          <input
            type="text"
            placeholder="Description (optional)..."
            value={newTodo.description}
            onChange={(e) => setNewTodo({ ...newTodo, description: e.target.value })}
            className="input-description"
          />
          <button type="submit" className="btn-add">Add Todo</button>
        </form>

        {/* Stats */}
        <div className="stats">
          <span>Total: {stats.total}</span>
          <span>Active: {stats.active}</span>
          <span>Completed: {stats.completed}</span>
        </div>

        {/* Filter Buttons */}
        <div className="filters">
          <button 
            className={filter === 'all' ? 'active' : ''} 
            onClick={() => setFilter('all')}
          >
            All
          </button>
          <button 
            className={filter === 'active' ? 'active' : ''} 
            onClick={() => setFilter('active')}
          >
            Active
          </button>
          <button 
            className={filter === 'completed' ? 'active' : ''} 
            onClick={() => setFilter('completed')}
          >
            Completed
          </button>
        </div>

        {/* Todo List */}
        <div className="todo-list">
          {filteredTodos.length === 0 ? (
            <p className="empty-message">No todos yet!</p>
          ) : (
            filteredTodos.map(todo => (
              <div key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
                {editingId === todo.id ? (
                  <div className="edit-form">
                    <input
                      type="text"
                      value={editForm.title}
                      onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                      className="edit-input"
                    />
                    <input
                      type="text"
                      value={editForm.description}
                      onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                      className="edit-input"
                    />
                    <button onClick={() => handleUpdateTodo(todo.id)} className="btn-save">Save</button>
                    <button onClick={() => setEditingId(null)} className="btn-cancel">Cancel</button>
                  </div>
                ) : (
                  <>
                    <div className="todo-content" onClick={() => handleToggleTodo(todo.id)}>
                      <input
                        type="checkbox"
                        checked={todo.completed}
                        onChange={() => {}}
                        className="checkbox"
                      />
                      <div className="todo-text">
                        <h3>{todo.title}</h3>
                        {todo.description && <p>{todo.description}</p>}
                      </div>
                    </div>
                    <div className="todo-actions">
                      <button onClick={() => handleStartEdit(todo)} className="btn-edit">✏️</button>
                      <button onClick={() => handleDeleteTodo(todo.id)} className="btn-delete">🗑️</button>
                    </div>
                  </>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default App
