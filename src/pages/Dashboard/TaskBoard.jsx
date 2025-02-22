import TasksList from "../../components/taskBoardComponents/TasksList";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import CreateTask from "../../components/taskBoardComponents/CreateTask";
import { useEffect, useState } from "react";
import useSocket from "../../hooks/useSocket";

function TaskBoard() {
  const { user, loading } = useAuth();
  const [tasks, setTasks] = useState([]);
  const socket = useSocket();

  useEffect(() => {
    const fetchTasks = async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_apiUrl}/api/tasks/${user.email}`
      );
      setTasks(data);
    };
    fetchTasks();
  }, [user?.email]);

  useEffect(() => {
    if (!socket) return;

    const handleCreate = (newTask) => {
      setTasks((prev) => [...prev, newTask]);
    };

    const handleUpdateTitleAndDesc = (updatedTask) => {
      setTasks((prev) => {
        return prev.map((t) =>
          t._id === updatedTask.id
            ? {
                ...t,
                title: updatedTask.title,
                description: updatedTask.description,
              }
            : t
        );
      });
    };

    const handleUpdateStatus = (updatedTask) => {
      setTasks((prev) => {
        return prev.map((t) =>
          t._id === updatedTask.id
            ? {
                ...t,
                status: updatedTask.status,
              }
            : t
        );
      });
    };

    const handleDelete = (deletedId) => {
      setTasks((prev) => {
        return prev.filter((t) => t._id !== deletedId);
      });
    };

    socket.on("task_created", handleCreate);
    socket.on("task_updated_title_description", handleUpdateTitleAndDesc);
    socket.on("task_updated_status", handleUpdateStatus);
    socket.on("task_deleted", handleDelete);

    return () => {
      socket.off("task_created", handleCreate);
    };
  }, [socket]);

  if (loading) return;

  return (
    <DndProvider backend={HTML5Backend}>
      <div className=" font-bold text-xl  w-full ">
        <div>
          <CreateTask tasks={tasks} setTasks={setTasks} />
          <TasksList tasks={tasks} setTasks={setTasks} />
        </div>
      </div>
    </DndProvider>
  );
}

export default TaskBoard;
