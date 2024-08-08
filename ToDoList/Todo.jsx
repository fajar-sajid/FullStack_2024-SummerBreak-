import React, { useState, useEffect } from 'react';
import todo_icon from '../assets/todo_icon.png';
import Todo_items from './Todo_items';

const Todo = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editText, setEditText] = useState('');

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(storedTasks);
  }, []);

  const addTask = () => {
    if (newTask.trim() === '') return;

    const updatedTasks = [...tasks, { text: newTask, completed: false, id: Date.now() }];
    setTasks(updatedTasks);
    setNewTask('');
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  const toggleTaskCompletion = (id) => {
    const updatedTasks = tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  const deleteTask = (id) => {
    const updatedTasks = tasks.filter(task => task.id !== id);
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  const startEditing = (id, currentText) => {
    setEditingTaskId(id);
    setEditText(currentText);
  };

  const saveEdit = () => {
    if (editText.trim() === '') return;

    const updatedTasks = tasks.map(task =>
      task.id === editingTaskId ? { ...task, text: editText } : task
    );
    setTasks(updatedTasks);
    setEditingTaskId(null);
    setEditText('');
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  return (
    <div className='bg-orange-200 place-self-center w-11/12 max-w-md min-h-[550px] rounded-xl border-solid flex flex-col p-7'>
      <div className='flex items-center mt-7 gap-2'>
        <img src={todo_icon} className='w-8 h-8' alt="Todo Icon" />
        <h1 className='text-3xl font-semibold'>To-Do List</h1>
      </div>

      <div className='flex items-center my-7 bg-gray-200 rounded-full'>
        <input
          type="text"
          placeholder='Add your task'
          className='bg-transparent border-0 outline-none flex-1 h-14 pl-6 pr-2'
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button
          className='border-none rounded-full bg-orange-400 w-32 h-14 text-white text-lg font-medium'
          onClick={addTask}
        >
          ADD +
        </button>
      </div>

      <div>
        {tasks.map((task) => (
          <Todo_items
            key={task.id}
            text={task.text}
            completed={task.completed}
            onToggle={() => toggleTaskCompletion(task.id)}
            onDelete={() => deleteTask(task.id)}
            onEdit={() => startEditing(task.id, task.text)}
            isEditing={editingTaskId === task.id}
            editText={editText}
            setEditText={setEditText}
            saveEdit={saveEdit}
          />
        ))}
      </div>
    </div>
  );
};

export default Todo;
