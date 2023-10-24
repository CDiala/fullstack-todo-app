import Todo from "./todo";

function TodoList({ todos, setTodoUpdateInfo, setTodo, deleteTask }) {
  return (
    <>
      {todos.length > 0 && (
        <table className="table table-striped table-bordered w-100">
          <thead className="text-center">
            <tr>
              <th>S/N</th>
              <th>Item</th>
              <th style={{ width: "500px" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {todos.map((todo, index) => {
              return (
                <tr key={index + 1} className="align-middle">
                  <td className="p-2">{index + 1}</td>
                  <td className="p-2">
                    <Todo
                      key={todo["id"]}
                      name={todo["name"]}
                      isCompleted={todo["isCompleted"]}
                    />
                  </td>
                  <td className="p-2 d-flex justify-content-between gx-3">
                    <button
                      onClick={() => {
                        setTodoUpdateInfo({
                          id: todo["id"],
                          isComplete: !todo["isCompleted"],
                        });
                        setTodo({ ...todo });
                      }}
                      className="btn btn-success text-nowrap"
                    >
                      Mark {todo["isCompleted"] ? "Incomplete" : "Complete"}
                    </button>
                    <button className="btn btn-warning text-nowrap">
                      Edit Item
                    </button>
                    <button
                      onClick={() => {
                        deleteTask(todo["id"]);
                      }}
                      className="btn btn-danger text-nowrap"
                    >
                      Delete Item
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </>
  );
}

export default TodoList;
