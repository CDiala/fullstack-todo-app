import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/js/bootstrap.bundle.min";
import { useState, useRef, useEffect } from "react";

const Todos = () => {
  const [todos, setTodos] = useState(["Buy new gaming laptop", "Chase Cheese"]);
  const [item, setItem] = useState("");
  const inputRef = useRef();

  useEffect(() => {
    console.log("no");
  }, []);

  function addNewItem(e) {
    setTodos([...todos, item]);
    inputRef.current.value = "";
  }

  function Todo({ todo }) {
    return <div>{todo}</div>;
  }

  function Todos({ todos }) {
    return todos.map((todo) => {
      return <Todo key={todo} todo={todo} />;
    });
  }

  function TodoAddWidget() {
    return (
      <div className="d-flex">
        <input
          className="form-control"
          ref={inputRef}
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

  function TodoAppHeader() {
    return <h2>Todo App</h2>;
  }

  function TodoApp() {
    return (
      <div className="w-50 m-auto">
        <TodoAppHeader />
        <TodoAddWidget />
        <Todos todos={todos} />
      </div>
    );
  }

  return <TodoApp />;
};

export default Todos;
