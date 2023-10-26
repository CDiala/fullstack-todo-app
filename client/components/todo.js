import { useRef } from "react";
import styles from "./todo.module.css";

function Todo({
  index,
  setTodoUpdateInfo,
  setTodo,
  todo,
  deleteTask,
  editable,
  setEditable,
}) {
  const dateValue = useRef();
  const nameValue = useRef();

  const enableItem = (todo) => {
    if (!todo["isCompleted"]) {
      setEditable({
        id: index,
        edit: true,
      });
    } else {
      alert("Can't modify a completed todo item.");
    }
  };

  function disableEdit() {
    setEditable({
      id: null,
      edit: false,
    });
  }

  return (
    <tr className="align-middle">
      <td className="p-2">{index + 1}</td>
      <td className="p-2">
        <span
          className={
            editable.edit && index === editable.id ? styles.todo_title : null
          }
          contentEditable={editable.edit && index === editable.id}
          suppressContentEditableWarning={true}
          ref={nameValue}
        >
          {todo["name"]}
        </span>{" "}
        <span
          style={{
            fontWeight: "bold",
            color: todo["isCompleted"] ? "green" : "#d06020",
          }}
        >
          [{todo["isCompleted"] ? "completed" : "incomplete"}]
        </span>
      </td>
      <td className="p-2" style={{ maxWidth: "120px" }}>
        {editable.edit && index === editable.id ? (
          <input
            type="date"
            className="form-control"
            defaultValue={todo["dueDate"]}
            ref={dateValue}
          />
        ) : (
          todo["dueDate"]
        )}
      </td>
      <td className="p-2 d-flex justify-content-between gx-3">
        <button
          style={{
            maxWidth: "150px",
            width: "100%",
          }}
          onClick={() => {
            setTodoUpdateInfo({
              id: "id",
              isComplete: !todo["isCompleted"],
            });
            setTodo({ ...todo });
          }}
          className={`btn ${
            todo["isCompleted"] ? "btn-outline-success" : "btn-outline-warning"
          }  text-nowrap`}
        >
          {`Mark ${todo["isCompleted"] ? "Incomplete" : "Complete"}`}
        </button>
        <button
          onClick={(e) => {
            if (e.target.textContent === "Save Item") {
              setTodo({
                ...todo,
                name: nameValue.current.textContent,
                dueDate: dateValue.current.value,
              });
            } else {
              enableItem(todo);
            }
          }}
          className="btn btn-outline-info text-nowrap"
        >
          {`${
            editable.edit && editable.id === index ? "Save Item" : "Edit Item"
          }`}
        </button>
        <button
          onClick={() => {
            deleteTask(todo["id"]);
          }}
          className="btn btn-outline-danger text-nowrap"
        >
          Delete Item
        </button>
      </td>
    </tr>
  );
}

export default Todo;
