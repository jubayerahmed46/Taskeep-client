import { Button, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import useAuth from "../../hooks/useAuth";
import { useState } from "react";
import Input from "../Input";

export default function EditFields({ isOpen, setIsOpen, task }) {
  const [edited, setEdited] = useState({
    title: task.title,
    description: task.description,
  });

  function close() {
    setIsOpen(false);
  }

  const handleEdit = (e) => {
    e.preventDefault();
    console.log(edited, task._id);
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
              className="w-full max-w-md rounded-xl bg-white text-black p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
            >
              <div>
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
                    Create
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
