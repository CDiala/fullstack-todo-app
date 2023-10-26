import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import axios from "axios";
import TodoList from "../components/todolist";
import TodoAddWidget from "../components/todowidget";
import { baseUrl } from "../resources/base-url";

const Todos = () => {
  const [todos, setTodos] = useState([]);
  const [todoUpdateInfo, setTodoUpdateInfo] = useState({
    id: null,
    isComplete: null,
  });
  const [todo, setTodo] = useState(null);

  useEffect(() => {
    async function getTodoList(id) {
      // Get list of todos
      let response = await axios.get(`${baseUrl}items`).then((res) => {
        if ("data" in res) {
          setTodos([...res["data"]]);
        }
      });
    }
    getTodoList();
  }, []);

  useEffect(() => {
    // Save updated todo item
    if (todo) {
      async function updateTodo() {
        const filtered_todo = todos.filter(
          (todoItem) => todoItem.id === todo["id"]
        )[0];
        const updatedTodo = {
          ...filtered_todo,
          name: todo["name"],
          isCompleted: todoUpdateInfo["isComplete"] ?? todo["isCompleted"],
          dueDate: todo["dueDate"],
        };

        let response = await axios
          .patch(`${baseUrl}items/${todo?.id}`, {
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
                  alert("Record updated successfully.");
                }
              }
            }
          });
      }
      updateTodo();
    }
  }, [todoUpdateInfo, todo]);

  async function addNewItem(item) {
    // Save new todo item
    let response = await axios.post(`${baseUrl}items`, item).then((res) => res);

    if (response["status"] === 200) {
      alert("record updated succesfully");

      setTodos([response["data"]["data"], ...todos]);

      return [response["data"]["data"]];
    } else {
      alert(response["status"] + response["statusText"]);
    }
    return response;
  }

  async function deleteTask(id) {
    // Delete todo item
    if (confirm("Are you sure you want to delete this todo item?") === true) {
      let response = await axios.delete(`${baseUrl}items/${id}`).then((res) => {
        if (res["status"] === 200) {
          if ("data" in res) {
            if ("data" in res["data"]) {
              const deletedTodoId = res["data"]["data"];

              const oldTodoIndex = todos.findIndex(
                (todo) => todo.id === deletedTodoId
              );
              let newTodoList = [...todos];

              newTodoList.splice(oldTodoIndex, 1);
              setTodos(newTodoList);
            }
          }
        }
      });
    }
  }

  function TodoApp() {
    return (
      <div className="m-auto" style={{ maxWidth: "1000px" }}>
        <h2 className="text-center">Todo App</h2>
        <TodoAddWidget updateItem={addNewItem} />
        <TodoList
          todos={todos}
          setTodoUpdateInfo={setTodoUpdateInfo}
          setTodo={setTodo}
          deleteTask={deleteTask}
        />
        {/* <div class="alert alert-dark" role="alert">
          A simple dark alert with{" "}
          <a href="#" class="alert-link">
            an example link
          </a>
          . Give it a click if you like.
        </div> */}
      </div>
    );
  }

  return <TodoApp />;
};

export default Todos;
