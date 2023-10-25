function Todo({ name, isCompleted }) {
  return (
    <div>
      <span>{name}</span>{" "}
      <span
        style={{ fontWeight: "bold", color: isCompleted ? "green" : "#d06020" }}
      >
        [{isCompleted ? "completed" : "incomplete"}]
      </span>
    </div>
  );
}

export default Todo;
