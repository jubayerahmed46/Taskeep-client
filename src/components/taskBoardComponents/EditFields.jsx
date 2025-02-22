import { Dialog, DialogPanel } from "@headlessui/react";
import { useState } from "react";
import Input from "../Input";
import axios from "axios";

export default function EditFields({ isOpen, setIsOpen, task }) {
  const [edited, setEdited] = useState({
    title: task.title,
    description: task.description,
  });

  function close() {
    setIsOpen(false);
  }

  const handleEdit = async (e) => {
    e.preventDefault();
    await axios.patch(`${import.meta.env.VITE_apiUrl}/api/tasks/${task._id}`, {
      title: edited.title,
      description: edited.description,
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
              className="border shadow-xl w-full max-w-xl mx-2 rounded-xl bg-white md:p-6 p-2 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
            >
              <div>
                <h2 className="font-semibold text-xl text-center mb-5">
                  Update the Task
                </h2>
                <form
                  className="flex gap-2 flex-col max-w-xl  mx-auto p-4  rounded-md"
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

                  <textarea
                    name="description"
                    placeholder="description (optional)"
                    value={edited.description}
                    rows={5}
                    onChange={(e) =>
                      setEdited({
                        ...edited,
                        description: e.target.value,
                      })
                    }
                    className="focus:ring-1 focus:ring-[#0d0d0e97] outline-none border-littleBlack/30 rounded-md px-3 py-1  bg-transparent placeholder::text-gray-500 border w-full"
                  ></textarea>
                  <button
                    onClick={close}
                    className="mt-2 hover:bg-black/80 bg-black p-2 rounded-md shadow-md  text-white"
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
