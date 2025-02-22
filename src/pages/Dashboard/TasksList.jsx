/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import Section from "../../components/taskBoardComponents/Section";
import EditFields from "../../components/taskBoardComponents/EditFields";

function TasksList({ tasks, refetch }) {
  const [todos, setTodos] = useState([]);
  const [inProgress, setInProgress] = useState([]);
  const [done, setDone] = useState([]);

  useEffect(() => {
    const fTodos = tasks.filter((task) => task.status === "todo");
    const fInProgress = tasks.filter((task) => task.status === "inprogress");
    const fDone = tasks.filter((task) => task.status === "done");

    setTodos(fTodos);
    setInProgress(fInProgress);
    setDone(fDone);
  }, [tasks]);

  const statuses = ["todo", "inprogress", "done"];
  return (
    <div className=" flex  gap-2 mt-3">
      {statuses.map((status, i) => (
        <Section
          key={i}
          status={status}
          tasks={tasks}
          refetch={refetch}
          todos={todos}
          inProgress={inProgress}
          done={done}
        />
      ))}
    </div>
  );
}

export default TasksList;
