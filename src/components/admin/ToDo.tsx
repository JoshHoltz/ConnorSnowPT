import React, { useEffect, useState } from "react";
import { ListTodo } from "lucide-react";
import { CirclePlus } from "lucide-react";
import { Trash } from 'lucide-react';

export const ToDo = () => {
  const [todos, setTodos] = useState([]);
  const [insertToDo, setInsertToDo] = useState('')

  useEffect(() => {
    fetch("https://connorsnowpt.onrender.com/api/trainer-todo")
      .then((res) => res.json())
      .then((data) => setTodos(data));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new URLSearchParams();
    formData.append('todo', insertToDo);
    
    fetch("https://connorsnowpt.onrender.com/api/insert-todo", {
      method: 'POST',
      body: formData
    }).then(() => {
      setInsertToDo('');
      fetch("https://connorsnowpt.onrender.com/api/trainer-todo") //refresh a new api call
        .then((res) => res.json())
        .then((data) => setTodos(data));
    });
  };

  return (
    <>
    {/* Heading */}
      <div className="mb-6 rounded-xl border-gray-100 bg-white p-6 shadow-lg">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="flex items-center text-lg font-semibold text-gray-800">
            <ListTodo size={20} className="mr-2 text-blue-600" />
            To-Do List
          </h2>
        </div>

        {/* Input of todo and add button */}
        <form onSubmit={handleSubmit} className="flex w-full gap-4">
          <div className="w-2/3">
            <input
              type="text"
              className="w-full rounded-lg border border-blue-600 bg-slate-100 p-2"
              placeholder="Enter To-Do"
              value={insertToDo}
              onChange={(e) => setInsertToDo(e.target.value)}
            />
          </div>
          <div className="w-1/3 rounded-lg border border-blue-300 bg-blue-300 p-2 transition hover:bg-blue-400">
            <button type="submit" className="flex w-full items-center justify-center gap-2">
              <CirclePlus size={20} />
              Add
            </button>
          </div>
        </form>

        {/* ToDo mapping */}
        <div className="mt-4 space-y-2">
        {todos.map((todo) => (
          <div key={todo.todo_id} className="flex w-full bg-slate-100 p-4 rounded-lg justify-between items-center hover:bg-slate-200 transition">
            <h1>{todo.todo_item}</h1>
            <button 
              onClick={() => {
                fetch(`https://connorsnowpt.onrender.com/api/delete-trainer-todo/${todo.todo_id}`, { method: 'DELETE' })
                  .then(() => fetch("https://connorsnowpt.onrender.com/api/trainer-todo"))
                  .then((res) => res.json())
                  .then((data) => setTodos(data));
              }}
              className="text-red-500"
            >
              <Trash />
            </button>
          </div>
        ))}
        </div>
      </div>
    </>
  );
};