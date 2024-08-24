import React, { useState, useEffect } from "react";
import TaskForm from "./TaskForm";
import TaskItem from "./TaskItem";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./Header";
import "../App.css"

function TaskList() {
  //setting the state and the local storage the keep the data after reloading
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const [completedTasks, setCompletedTasks] = useState(() => {
    const savedCompletedTasks = localStorage.getItem("completedtasks");
    return savedCompletedTasks ? JSON.parse(savedCompletedTasks) : [];
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem("completedtasks", JSON.stringify(completedTasks));
  }, [completedTasks]);


  //to filter the completed tasks
  useEffect(() => {
    const complete = tasks.filter((task) => task.isComplete === true);
    setCompletedTasks(complete);
  }, [tasks]);

  //add a task
  const addTask = (task) => {
    if (!task.name || /^\s*$/.test(task.name)) {
      return;
    }
    if (!task.description || /^\s*$/.test(task.description)) {
      return;
    }
    const allTasks = [task, ...tasks];
    setTasks(allTasks);
  };

  //to change the value of the completion of the task when clicking of a task
  const completeTask = (id) => {
    let updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        task.isComplete = !task.isComplete;
      }
      return task;
    });
    setTasks(updatedTasks);
  };


  //removing a task
  const removeTask = (id) => {
    let flag = window.confirm("Are you sure you want to delete this");
    if (flag) {
      const remainingTasks = tasks.filter((task) => task.id !== id);
      setTasks(remainingTasks);
    }
  };

  //update a task
  const updateTask = (id, newVal) => {
    if (!newVal.name || /^\s*$/.test(newVal.name)) {
      return;
    }
    if (!newVal.description || /^\s*$/.test(newVal.description)) {
      return;
    }
    setTasks((prev) => prev.map((i) => (i.id === id ? newVal : i)));
  };

  return (
    <BrowserRouter>
      <div className="App">
        <Header />

        <Routes>
          {/*display all the tasks*/}
          <Route
            path="/"
            element={
              <div>
                <p className="nb">
                  you have Completed {completedTasks.length} out of{" "}
                  {tasks.length}
                </p>
                <TaskForm onSubmit={addTask} />
                <TaskItem
                  tasks={tasks}
                  completeTask={completeTask}
                  removeTask={removeTask}
                  updateTask={updateTask}
                />
                {tasks.length && completedTasks.length === tasks.length ? <>
                  <img className="finish" src="https://i.pinimg.com/564x/19/4d/12/194d12bacd136752a7153eb0d5b4a73d.jpg" alt="YOU DID IT"/>
                </>:<></>}
              </div>
            }
          />
          {/*display the completed tasks*/}
          <Route
            path="/completed"
            element={
              <TaskItem
                tasks={completedTasks}
                completeTask={completeTask}
                removeTask={removeTask}
                updateTask={updateTask}
              />
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default TaskList;
