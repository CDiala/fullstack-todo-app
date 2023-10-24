import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import axios from "axios";
import TodoList from "../components/todolist";
import TodoAddWidget from "../components/todowidget";

const Todos = () => {
  const [todos, setTodos] = useState([]);
  const [todoUpdateInfo, setTodoUpdateInfo] = useState({
    id: null,
    isComplete: null,
  });
  const [todo, setTodo] = useState(null);

  useEffect(() => {
    async function getTodoList(id) {
      // Call endpoint here
      let response = await axios
        .get("http://127.0.0.1:5000/items")
        .then((res) => {
          console.log("my complete response", res);
          if ("data" in res) {
            setTodos([...res["data"]]);
          }
        });
      console.log("done", response);
      console.log("todos after", todos);
    }
    getTodoList();

    // console.log("isComplete", isComplete);
  }, []);

  useEffect(() => {
    if (todo) {
      async function updateTodo() {
        const filtered_todo = todos.filter(
          (todoItem) => todoItem.id === todo["id"]
        )[0];
        const updatedTodo = {
          ...filtered_todo,
          isCompleted: todoUpdateInfo["isComplete"],
        };

        let response = await axios
          .patch(`http://127.0.0.1:5000/items/${todo?.id}`, {
            id: todo?.id,
            todo: updatedTodo,
          })
          .then((res) => {
            if (res["status"] === 200) {
              if ("data" in res) {
                if ("data" in res["data"]) {
                  const new_todo = res["data"]["data"];
                  const old_todo_index = todos.findIndex(
                    (todo) => todo.id === new_todo.id
                  );
                  let newTodoList = [...todos];
                  newTodoList.splice(old_todo_index, 1, new_todo);
                  setTodos(newTodoList);
                }
              }
            }
          });
      }
      updateTodo();
    }
  }, [todoUpdateInfo, todo]);

  async function addNewItem(item) {
    // Call endpoint here
    let response = await axios
      .post("http://127.0.0.1:5000/items", item)
      .then((res) => res);

    if (response["status"] === 200) {
      alert("record updated succesfully");
      console.log("dataaaa", response["data"]["data"]);
      setTodos([response["data"]["data"], ...todos]);
      console.log("new todos", ...todos);
      return [response["data"]["data"]];
    } else {
      alert(response["status"] + response["statusText"]);
    }
    return response;
  }

  async function deleteTask(id) {
    console.log(id, typeof id);
    let response = await axios
      .delete(`http://127.0.0.1:5000/items/${id}`)
      .then((res) => {
        if (res["status"] === 200) {
          if ("data" in res) {
            if ("data" in res["data"]) {
              const deletedTodoId = res["data"]["data"];
              console.log("deletedTodoId", deletedTodoId);
              // return;
              const oldTodoIndex = todos.findIndex(
                (todo) => todo.id === deletedTodoId
              );
              let newTodoList = [...todos];
              console.log("oldTodoIndex", oldTodoIndex);
              // return;
              newTodoList.splice(oldTodoIndex, 1);
              setTodos(newTodoList);
            }
          }
        }
      });
  }

  function TodoApp() {
    return (
      <div className="m-auto" style={{ maxWidth: "1200px" }}>
        <h2>Todo App</h2>
        <TodoAddWidget updateItem={addNewItem} />
        <TodoList
          todos={todos}
          setTodoUpdateInfo={setTodoUpdateInfo}
          setTodo={setTodo}
          deleteTask={deleteTask}
          // isComplete={isComplete}
        />
      </div>
    );
  }

  return <TodoApp />;
};

export default Todos;
