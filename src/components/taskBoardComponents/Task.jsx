import axios from "axios";
import { useState } from "react";
import { useDrag } from "react-dnd";
import EditFields from "./EditFields";
import Divider from "../Divider";
import { TbEdit } from "react-icons/tb";
import { HiMiniXMark } from "react-icons/hi2";

function Task({ task }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "task",
    item: { id: task._id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));
  let [isOpen, setIsOpen] = useState(false);
  const [descSize, setDescSize] = useState(80);

  const deleteHandler = async (id) => {
    await axios.delete(`${import.meta.env.VITE_apiUrl}/api/tasks/${id}`);
  };

  function open() {
    setIsOpen(true);
  }

  return (
    <div
      ref={drag}
      className={` border flex flex-col justify-between  bg-white/90 dark:bg-black/80 dark:text-littleWhite/95 dark:border-black/70 rounded-md md:p-4 shadow-md  p-2 cursor-pointer select-none ${
        isDragging ? "cursor-move opacity-50" : "opacity-100"
      }`}
    >
      {" "}
      <div>
        {" "}
        <p className="sm:text-base  text-xs font-medium">{task.title}</p>{" "}
        <p className="sm:text-xs text-xs mt-2 font-normal">
          {" "}
          <span>{task.description.slice(0, descSize)}</span>
          {task.description.length > 30 && (
            <span
              className="text-lg font-bold hover:underline "
              onClick={() =>
                setDescSize((prev) =>
                  prev === task.description.length
                    ? 80
                    : task.description.length
                )
              }
            >
              ...
            </span>
          )}{" "}
        </p>
      </div>
      <Divider />
      <div className="flex gap-1">
        {/* delete */}
        <svg
          onClick={() => deleteHandler(task._id)}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className=" hover:text-secondary dark:hover:bg-secondary text-black md:size-7 size-6 self-end  rounded-full p-0.5   transition-all"
        >
          <HiMiniXMark className="dark:text-white" />
        </svg>
        {/* edit */}
        <svg
          onClick={open}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="dark:hover:bg-primary h-4 flex justify-center items-center aspect-square  hover:text-primary text-black md:size-7 size-6 self-end  rounded-full p-0.5   transition-all"
        >
          <TbEdit className="dark:text-white " />
        </svg>
      </div>
      <EditFields isOpen={isOpen} setIsOpen={setIsOpen} task={task} />
    </div>
  );
}

export default Task;
