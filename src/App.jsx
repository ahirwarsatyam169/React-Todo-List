import React, { useState, useEffect } from "react";
function App() {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState(()=>{
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos): [];

  });
  
  
  useEffect(()=>{
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos])


  const btnclick = () => {
    if (task.trim() === "") {
      console.log("empty");
      return;
    }
    setTodos([...todos, { text: task, completed: false }]);
    setTask("");
    console.log(task);
  };
  const remOnclick = (indextoremove) => {
    const updatedTodo = todos.filter((_, index) => index !== indextoremove);
    setTodos(updatedTodo);
  };
  const toggleClick = (indextoToggle) => {
    const toggleTodo = [...todos];
    toggleTodo[indextoToggle].completed = !toggleTodo[indextoToggle].completed;

    setTodos(toggleTodo);
  };

  return (
    <>
      <div
        className="min-h-screen bg-gradient-to-r from-gray-800 to-gray-500"
      >
        <div className="flex justify-center bg-transparent ">
          <h2 className="text-center text-white/80 border border-gray-600 shadow shadow-white/70  rounded-sm mt-1 p-2">
            My Todo list
          </h2>
        </div>
        <div className="flex justify-center">
          <input
            onKeyDown={(e)=>{
              if(e.key === "Enter"){
                btnclick();
              }
            }}
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="type your task here..."
            className="border-1 border-gray-500 shadow shadow-white/20 rounded-sm p-4 mt-2 h-5  "
          ></input>
          <button
            onClick={btnclick}
            className=" border-1 border-gray-500 shadow shadow-white/30 rounded-sm h-5 p-4 mt-2 ml-1 flex items-center justify-center text-white/50"
          >
            Add
          </button>
        </div>
        <div className=" flex justify-center ">
          <div className=" overflow-auto border-1 border-gray-400 shadow shadow-white/30 mt-2 w-[286px] h-[200px] border-1 rounded-sm ">
            <ul>
              {todos.map((todo, index) => (
                <li
                  key={index}
                  className="p-2 m-1 text-white/80 text-sm shadow shadow-white/50 rounded text-gray-900 flex justify-between"
                >
                  <span className={todo.completed ? "line-through" : ""}>
                    {todo.text}
                  </span>
                  <div className="flex ">
                    <button
                      onClick={() => toggleClick(index)}
                      className="flex  items-center border rounded-sm p-1 mr-1 h-[20px]"
                    >
                      toggle
                    </button>
                    <button
                      onClick={() => remOnclick(index)}
                      className="flex justify-center items-center border rounded-sm p-1 h-[20px]"
                    >
                      x
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
