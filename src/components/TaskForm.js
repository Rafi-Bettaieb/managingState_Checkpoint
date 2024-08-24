import React, { useState } from "react";
import "../App.css";

function TaskForm(props) {
  //setting the state
  const [taskName, setTaskName] = useState(props.edit ? props.edit.name : "");
  const [taskDescription, setTaskDescription] = useState(
    props.edit ? props.edit.description : ""
  );

  const handleSubmit = (e) => {
    //adding a new task
    e.preventDefault();
    props.onSubmit({
      id: Date.now(),
      name: taskName,
      description: taskDescription,
      isComplete: false,
    });
    setTaskDescription("");
    setTaskName("");
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      {/*if we are editing the displayed button is update task instead of add task*/}
      {props.edit ? (
        <>
          <div className="edit">
            <input
              type="text"
              placeholder="Update the name of the Task"
              value={taskName}
              className="task-name"
              onChange={(e) => setTaskName(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Update the description of the Task"
              value={taskDescription}
              className="task-description"
              onChange={(e) => setTaskDescription(e.target.value)}
              required
            />
            <button className="task-btn"> Update Task</button>
          </div>
        </>
      ) : (
        <>
          <input
            type="text"
            placeholder="enter the name of the Task"
            value={taskName}
            className="task-name"
            onChange={(e) => setTaskName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="enter the description of the Task"
            value={taskDescription}
            className="task-description"
            onChange={(e) => setTaskDescription(e.target.value)}
            required
          />
          <button className="task-btn"> Add Task</button>
        </>
      )}
    </form>
  );
}

export default TaskForm;
