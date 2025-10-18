import React, { useEffect, useState } from "react";
import { ListTodo } from "lucide-react";
import { CirclePlus } from "lucide-react";
import { Trash } from 'lucide-react';

export const ToDo = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetch("https://connorsnowpt.onrender.com/api/trainer-todo")
      .then((res) => res.json())
      .then((data) => setTodos(data));
  }, []);

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
        <div className="flex w-full gap-4">
          <div className="w-2/3">
            <input
              type="text"
              className="w-full rounded-lg border border-blue-600 bg-slate-100 p-2"
              placeholder="Enter To-Do"
            />
          </div>
          <div className="w-1/3 rounded-lg border border-blue-300 bg-blue-300 p-2 transition hover:bg-blue-400">
            <button className="flex w-full items-center justify-center gap-2">
              <CirclePlus size={20} />
              Add
            </button>
          </div>
        </div>

        {/* ToDo mapping */}
        <div className="mt-4 space-y-2">
          {todos.map((todo) => (
            <div key={todo.id} className="flex w-full bg-slate-100 p-4 rounded-lg justify-between items-center hover:bg-slate-200 transition">
              <h1>{todo.todo_item}</h1>
              <button className="text-red-500 hover:text-red-600">
                <Trash />
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};