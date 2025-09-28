import './App.css'
import TodoApp from "./components/TodoApp";

function App() {
  return (
    <div className="container">
      <header>
        <h1 style={{color:"#52a6af"}}>Todo List</h1>
      </header>
      <main>
        <TodoApp />
      </main>
    </div>
  );
}

export default App
