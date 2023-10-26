import { useState } from "react";
import Todo from "./todo";

function TodoList({ todos, setTodoUpdateInfo, setTodo, deleteTask }) {
  const [editable, setEditable] = useState({ id: null, edit: false });
  return (
    <>
      {todos.length > 0 && (
        <table className="table table-striped table-bordered w-100">
          <thead className="text-center">
            <tr>
              <th>S/N</th>
              <th>Items</th>
              <th>Due date</th>
              <th style={{ width: "500px" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {todos.map((todo, index) => {
              return (
                <Todo
                  key={index + 1}
                  index={index}
                  setTodoUpdateInfo={setTodoUpdateInfo}
                  setTodo={setTodo}
                  todo={todo}
                  editable={editable}
                  setEditable={setEditable}
                  deleteTask={deleteTask}
                />
              );
            })}
          </tbody>
        </table>
      )}
    </>
  );
}

export default TodoList;
