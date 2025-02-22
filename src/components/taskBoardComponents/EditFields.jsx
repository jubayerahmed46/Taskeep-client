import { Dialog, DialogPanel } from "@headlessui/react";
import { useState } from "react";
import Input from "../Input";
import axios from "axios";

export default function EditFields({ isOpen, setIsOpen, task, refetch }) {
  const [edited, setEdited] = useState({
    title: task.title,
    description: task.description,
  });

  function close() {
    setIsOpen(false);
  }

  const handleEdit = async (e) => {
    e.preventDefault();
    await axios
      .patch(`${import.meta.env.VITE_apiUrl}/api/tasks/${task._id}`, {
        title: edited.title,
        description: edited.description,
      })
      .then(() => {
        refetch();
      });
  };

  return (
    <>
      <Dialog
        open={isOpen}
        as="div"
        className="relative z-10 focus:outline-none "
        onClose={close}
        __demoMode
      >
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto ">
          <div className="flex min-h-full items-center justify-center p-4 ">
            <DialogPanel
              transition
              className="shadow-xl w-full max-w-md rounded-xl bg-white md:p-6 p-2 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
            >
              <div>
                <h2 className="font-semibold text-xl text-center mb-5">
                  Update the Task
                </h2>
                <form
                  className="flex gap-2 flex-col max-w-xl  mx-auto my-5 p-4 bg-slate-300 rounded-md"
                  onSubmit={handleEdit}
                >
                  <Input
                    label=""
                    name="title"
                    value={edited.title}
                    onChange={(e) =>
                      setEdited({
                        ...edited,
                        title: e.target.value,
                      })
                    }
                  />
                  <Input
                    label=""
                    name="description"
                    value={edited.description}
                    onChange={(e) =>
                      setEdited({
                        ...edited,
                        description: e.target.value,
                      })
                    }
                  />
                  <button
                    onClick={close}
                    className="bg-black p-2 rounded-md shadow-md  text-white ml-2"
                  >
                    Update
                  </button>
                </form>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
}
