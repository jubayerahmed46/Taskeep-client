import { useDrop } from "react-dnd";
import Header from "./Header";
import Task from "./Task";
import axios from "axios";

function Section({ status, tasks, refetch, inProgress, done, todos }) {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "task",
    drop: (item) => {
      addItemToSection(item.id);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  let tasksToMap = todos;
  let headText = "";
  let bg = "";
  if (status === "todo") {
    headText = "Todo";
    tasksToMap = todos;
    bg = "bg-slate-400";
  }
  if (status === "inprogress") {
    headText = "inprogress";
    tasksToMap = inProgress;
    bg = "bg-green-500";
  }
  if (status === "done") {
    headText = "done";
    tasksToMap = done;
    bg = "bg-blue-400";
  }

  const addItemToSection = async (id) => {
    await axios
      .patch(`${import.meta.env.VITE_apiUrl}/api/tasks/status/${id}`, {
        status: status,
      })
      .then(() => {
        refetch();
      });
  };

  return (
    <div
      ref={drop}
      className={`p-2 rounded-md  bg-littleBlack/15 w-full ${
        isOver ? "bg-littleBlack/20" : ""
      }`}
    >
      <Header text={headText} count={tasksToMap.length} bg={bg} />
      {tasksToMap.length > 0 && (
        <div className="flex gap-3 flex-col mt-2">
          {tasksToMap.map((task, i) => {
            return <Task key={task._id || i} task={task} refetch={refetch} />;
          })}
        </div>
      )}
    </div>
  );
}

export default Section;
