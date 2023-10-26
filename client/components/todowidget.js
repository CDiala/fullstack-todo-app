import { useState } from "react";

function TodoAddWidget({ updateItem }) {
  const [item, setItem] = useState("");

  async function addNewItem() {
    let payload = {
      data: {
        id: 3,
        name: item,
        isCompleted: false,
        datecreated: "14-08-2023",
      },
    };
    let updateResponse = await updateItem(payload);
    setItem("");
  }

  return (
    <div className="d-flex mb-2 gap-4" style={{ marginBottom: "20px" }}>
      <input
        className="form-control"
        type="text"
        onChange={(e) => setItem(e.target.value)}
      />
      <button
        className="btn btn-primary text-nowrap"
        onClick={() => addNewItem()}
      >
        Add Item
      </button>
    </div>
  );
}

export default TodoAddWidget;
