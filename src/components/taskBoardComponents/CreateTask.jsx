import { useState } from "react";
import Input from "../Input";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import { Dialog, DialogPanel } from "@headlessui/react";

function CreateTask() {
  const { user } = useAuth();
  const [task, setTask] = useState({
    title: "",
    description: "",
    status: "todo",
  });
  let [isOpen, setIsOpen] = useState(false);

  function open() {
    setIsOpen(true);
  }

  function close() {
    setIsOpen(false);
  }
  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios
      .post(`${import.meta.env.VITE_apiUrl}/api/tasks`, {
        ...task,
        email: user.email,
      })
      .then(() => {
        close();
      });

    setTask({ title: "", description: "", status: "todo" });
    e.target.reset();
  };

  return (
    <div className="bg-white dark:bg-black/95 p-4 shadow-sm flex justify-between rounded-md">
      <div>
        <h2 className=" dark:text-littleWhite md:text-3xl text-xl">
          Welcome to Taskeep
        </h2>
      </div>
      <button
        onClick={open}
        className="flex  gap-1 items-center border p-2 bg-white dark:text-white dark:bg-littleBlack dark:border-none shadow-md  border-gray-200 rounded-full"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-8 "
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
      </button>

      <Dialog
        open={isOpen}
        as="div"
        className="relative z-10 focus:outline-none"
        onClose={close}
      >
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="border shadow-xl w-full max-w-xl mx-2  rounded-xl bg-white md:p-6 p-2 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
            >
              <h2 className="font-semibold text-xl text-center mb-5">
                Create New Task
              </h2>
              <form
                className="flex gap-2 flex-col max-w-xl  mx-auto p-4  rounded-md"
                onSubmit={handleSubmit}
              >
                <Input
                  label=""
                  name="title"
                  className="w-full"
                  placeholder="Title..."
                  value={task.title}
                  onChange={(e) =>
                    setTask({
                      ...task,
                      title: e.target.value,
                    })
                  }
                />
                <textarea
                  name="description"
                  placeholder="description (optional)"
                  value={task.description}
                  rows={5}
                  onChange={(e) =>
                    setTask({
                      ...task,
                      description: e.target.value,
                    })
                  }
                  className="focus:ring-1 focus:ring-[#0d0d0e97] outline-none border-littleBlack/30 rounded-md px-3 py-1  bg-transparent placeholder::text-gray-500 border w-full"
                ></textarea>
                <button className="mt-2 hover:bg-black/80 bg-black p-2 rounded-md shadow-md  text-white">
                  Create
                </button>
              </form>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </div>
  );
}

export default CreateTask;
