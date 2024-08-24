import React, { useState } from "react";
import TaskForm from "./TaskForm";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import "../App.css";

function TaskItem({ tasks, completeTask, removeTask, updateTask }) {
  //setting the state
  const [edit, setEdit] = useState({
    id: null,
    name: "",
    description: "",
  });

  //convert the id of the task to a date to keep track of the last modification
  const getDate = (x) => {
    const today = new Date(x);
    const formattedDate = today.toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: true,
    });
    return `${formattedDate}`;
  };

  // update the new task
  const submitUpdate = (val) => {
    updateTask(edit.id, val);
    setEdit({
      id: null,
      name: "",
      description: "",
    });
  };
  if (edit.id) {
    return <TaskForm edit={edit} onSubmit={submitUpdate} />;
  }
  //displaying all the tasks
  return (
    <div className="task-grid">
      {tasks.map((task, i) => (
        <div className="task-container">
          <div className={task.isComplete ? "complete" : "incomplete"} key={i}>
            <div key={task.id} onClick={() => completeTask(task.id)}>
              {task.name}
              <br />
              {task.description}
              <br />
              <>Last Modification on {getDate(task.id)}</>
            </div>
            <div className="icons">
              <MdDelete
                onClick={() => removeTask(task.id)}
                className="delete-icon"
              />
              <FaEdit
                onClick={() =>
                  setEdit({
                    id: task.id,
                    name: task.name,
                    description: task.description,
                  })
                }
                className="edit-icon"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default TaskItem;
