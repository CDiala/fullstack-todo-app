function Todo({ name, isCompleted }) {
  return (
    <div>
      <span>{name}</span>{" "}
      <span style={{ fontWeight: "bold" }}>
        [{isCompleted ? "completed" : "incomplete"}]
      </span>
    </div>
  );
}

export default Todo;
