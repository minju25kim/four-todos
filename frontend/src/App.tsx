import "./App.css";
import SidePanel from "./components/SidePanel";
import TodoContainer from "./components/TodoContainer";

function App() {
  return (<>
    <h1>4 todos</h1>
    <div className="container">
      <SidePanel />
      <TodoContainer />
    </div>
  </>
  );
}

export default App;
