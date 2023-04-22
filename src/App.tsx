import { useState } from "react";

function App() {
  const [canEdit, setCanEdit] = useState(false);
  const [formResult, setFormResult] = useState<FormDataEntryValue[] | null>(
    null
  );

  const formValues = [
    { name: "Swimming", id: 101 },
    { name: "Cycling", id: 102 },
    { name: "Running", id: 103 },
    { name: "Calisthenics", id: 104 },
    { name: "Yoga", id: 105 },
  ];

  function submitForm(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = new FormData(event.currentTarget);
    const values = [form.getAll("sport")];

    console.log(values[0]);
    setFormResult(values[0]);
  }

  function moveUp(targetNode: HTMLElement) {
    const parentNode = targetNode.parentNode;
    const prevSibling = targetNode.previousElementSibling;

    if (parentNode == null || prevSibling == null) {
      console.error("Error with finding nodes");
      return;
    }

    targetNode.replaceWith(prevSibling);
    parentNode.insertBefore(targetNode, prevSibling);
  }

  function moveDown(targetNode: HTMLElement) {
    const parentNode = targetNode.parentNode;
    const nextSibling = targetNode.nextElementSibling;
    const secondSibling = nextSibling?.nextElementSibling;

    if (secondSibling == null) {
      parentNode?.appendChild(targetNode);
      return;
    }

    targetNode.replaceWith(nextSibling!);
    parentNode?.insertBefore(targetNode, secondSibling);
  }

  return (
    <>
      <div className="py-24 bg-gradient-to-b from-neutral-300 to-slate-50 sm:py-32">
        <div className="max-w-3xl px-6 mx-auto lg:px-8">
          <div className="max-w-3xl mx-auto lg:mx-0">
            <p className="text-base font-semibold leading-7 text-blue-600">
              Created by Lochyb
            </p>
            <h2 className="mt-2 text-4xl font-bold tracking-tight text-transparent bg-gradient-to-tl from-emerald-400 to-blue-500 bg-clip-text sm:text-6xl">
              Swappable Form List
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              A small program to pratice moving dom elements with javascript.
              The below form order is swappable via the arrow buttons.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-3xl p-8 mx-auto rounded-lg bg-slate-200">
        <div className="max-w-xl m-8 mx-auto space-y-4 ">
          <form className="" onSubmit={submitForm}>
            <ol className="flex flex-col w-full gap-1 list-decimal list-inside">
              {formValues.map((value, id) => {
                return (
                  <li
                    key={`${value.name}-${id}`}
                    id="orderable_item"
                    className="pl-12 pr-4 w-full min-h-[60px] grid gap-4 grid-cols-[1fr_0.25fr_0.25fr] items-center list-decimal border bg-white rounded-lg odd:bg-gray-100 group"
                    aria-readonly={!canEdit}
                  >
                    <p className="p-4 border-l">{value.name}</p>

                    <button
                      className="p-2 my-2 border rounded-md bg-gray-50 group-last:invisible group-aria-readonly:hidden"
                      type="button"
                      onClick={(event) =>
                        moveDown(event.currentTarget.parentElement!)
                      }
                    >
                      ↓
                    </button>
                    <button
                      className="p-2 my-2 border rounded-md bg-gray-50 group-first:invisible group-aria-readonly:hidden"
                      type="button"
                      onClick={(event) =>
                        moveUp(event.currentTarget.parentElement!)
                      }
                    >
                      ↑
                    </button>
                    <input
                      name="sport"
                      hidden
                      type="text"
                      className="border read-only:border-none read-only:bg-transparent"
                      readOnly={!canEdit}
                      value={value.name}
                    />
                  </li>
                );
              })}
            </ol>

            <div className="flex justify-center gap-2 mt-4">
              <button
                type="button"
                className="p-4 border border-black rounded-md bg-gray-50"
                onClick={() => setCanEdit(!canEdit)}
              >
                {!canEdit ? "Show Reorder" : "Hide Reorder"}
              </button>

              <button
                className="p-4 text-white bg-blue-500 border rounded-md"
                type="submit"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>

      {formResult != null ? (
        <p className="w-full text-center">{JSON.stringify(formResult)}</p>
      ) : null}
    </>
  );
}

export default App;
