import axios from "axios";
import { useState } from "react";
import { useDrag } from "react-dnd";
import EditFields from "./EditFields";

function Task({ task, refetch }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "task",
    item: { id: task._id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));
  let [isOpen, setIsOpen] = useState(false);

  const deleteHandler = async (id) => {
    await axios
      .delete(`${import.meta.env.VITE_apiUrl}/api/tasks/${id}`, {
        status,
      })
      .then(() => refetch());
  };

  function open() {
    setIsOpen(true);
  }

  return (
    <div
      ref={drag}
      className={` border flex justify-between  bg-white/90 rounded-md p-2 cursor-pointer select-none ${
        isDragging ? "cursor-move" : ""
      }`}
    >
      {" "}
      <div>
        {" "}
        <p>{task.title}</p> <p className="text-xs "> {task.description} </p>
      </div>
      <div>
        {/* delete */}
        <svg
          onClick={() => deleteHandler(task._id)}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-5 self-end  rounded-full p-0.5 bg-secondary/10 hover:bg-secondary/35 text-white transition-all"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18 18 6M6 6l12 12"
          />
        </svg>
        {/* edit */}
        <svg
          onClick={open}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-5 self-end  rounded-full p-0.5 bg-secondary/10 hover:bg-secondary/35 text-white transition-all"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
          />
        </svg>
      </div>
      <EditFields isOpen={isOpen} setIsOpen={setIsOpen} task={task} />
    </div>
  );
}

export default Task;
