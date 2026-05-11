import mongoose from "mongoose"

const userSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            required:true,
            trim:true
        },
        email:{
            type:String,
            trim:true,
            required:true,
            unique:true,
            lowercase:true,
        },
        credits:{
            type:Number,
            default:100,
            min:0
        }
    },
    {
        timestamps:true
    }
);

//we r crating a model with name

const User = mongoose.model("User",userSchema);

export default User;





















import React, { useState } from "react";

const TodoList = ({ username }) => 
    {
  const [tasks, setTasks] = useState([
    "Learn React",
    "Build Project",
    "Practice DSA",
  ]);

  const [input, setInput] = useState("");

  const addTask = () => 
    {
    if (input.trim() === "") return;

    setTasks([...tasks, input]);
    setInput("");
  };

  return (
    <div>
      <h1>{username}'s Todo List</h1>

      <input
        type="text"
        placeholder="Enter task"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <button onClick={addTask}>Add</button>

      {tasks.length === 0 ? (
        <p>No tasks available</p>
      ) : (
        <ul>
          {tasks.map((task, index) => (
            <li key={index}>{task}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TodoList;