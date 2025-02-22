import TasksList from "../../components/taskBoardComponents/TasksList";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import CreateTask from "../../components/taskBoardComponents/CreateTask";

function TaskBoard() {
  const { user, loading } = useAuth();

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["tasks"],
    enabled: !loading,
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_apiUrl}/api/tasks/${user.email}`
      );
      return data;
    },
  });

  if (isLoading) {
    return <h2>Loading....</h2>;
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div className=" font-bold text-xl  w-full ">
        <div>
          <CreateTask tasks={data} refetch={refetch} />
          <TasksList tasks={data} refetch={refetch} />
        </div>
      </div>
    </DndProvider>
  );
}

export default TaskBoard;
