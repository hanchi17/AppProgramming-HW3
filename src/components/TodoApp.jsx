import { useState, useEffect } from "react";

function TodoApp() {
  const [text, setText] = useState("");
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem("todos");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleSubmit = (e) => {
    e.preventDefault();
    let trimmed = text.trim();
    if (!trimmed) return;
    setTodos([...todos, { id: Date.now(), text: trimmed, done: false }]);
    setText("");
  };

  const toggleDone = (id) => {
    setTodos(todos.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((t) => t.id !== id));
  };

  const colors = [
    "rgba(205, 244, 232, 1)",
    "rgba(208, 248, 248, 1)",
    "rgba(234, 238, 239, 1)",
  ];

  return (
    <div className="card">
      <h2>
        {new Date().toLocaleDateString("ko-KR", {
          month: "long",
          day: "numeric",
          weekday: "short",
        })}
      </h2>
      <form className="input" onSubmit={handleSubmit}>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="할 일을 입력하세요"
        />
        <button type="submit">추가</button>
      </form>

      <div className="list-container">
        {todos.map((t, i) => (
          <div
            className="list-box"
            key={t.id}
            style={{ backgroundColor: colors[i % 3] }}
          >
            <input
              type="checkbox"
              checked={t.done}
              onChange={() => toggleDone(t.id)}
            />
            <span style={{ textDecoration: t.done ? "line-through" : "none" }}>
              {t.text}
            </span>
            <button onClick={() => deleteTodo(t.id)}>X</button>
          </div>
        ))}
      </div>

      <p>남은 할일: {todos.filter((t) => !t.done).length}</p>
    </div>
  );
}

export default TodoApp;
