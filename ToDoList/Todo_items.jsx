import React from 'react';
import tick from '../assets/tick.png';
import not_tick from '../assets/not_tick.png';
import delete_icon from '../assets/delete.png';

const Todo_items = ({
  text,
  completed,
  onToggle,
  onDelete,
  onEdit,
  isEditing,
  editText,
  setEditText,
  saveEdit
}) => {
  return (
    <div className='flex items-center my-3 gap-2'>
      <div className='flex flex-1 items-center'>
        {isEditing ? (
          <>
            <input
              type="text"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              className='bg-transparent border-0 outline-none flex-1 h-14 pl-6 pr-2'
            />
            <button
              className='border-none rounded-full bg-blue-400 w-32 h-14 text-white text-lg font-medium'
              onClick={saveEdit}
            >
              Save
            </button>
          </>
        ) : (
          <>
            <img
              src={completed ? tick : not_tick}
              alt="toggle"
              className='w-7 cursor-pointer'
              onClick={onToggle}
            />
            <p className={`text-slate-700 ml-4 text-[17px] ${completed ? 'line-through' : ''}`}>
              {text}
            </p>
            <button
              className='border-none bg-yellow-400 p-2 rounded-full text-white ml-2'
              onClick={onEdit}
            >
              Edit
            </button>
            <img
              src={delete_icon}
              className='h-6 cursor-pointer ml-2'
              alt="delete"
              onClick={onDelete}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Todo_items;
