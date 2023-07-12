import "./App.css";
import { useRef, useReducer } from "react";
import Header from "./Components/Header";
import TodoEditor from "./Components/TodoEditor";
import TodoList from "./Components/TodoList";
function reducer(state, action) {
  switch (action.type) {
    case "CREATE":
      return [action.newItem, ...state];
    case "UPDATE": {
      return state.map((item) =>
        item.id === action.targetId ? { ...item, isDone: !item.isDone } : item
      );
    }
    case "DELETE": {
      return state.filter((item) => item.id !== action.targetId);
    }
    case "EDIT": {
      return state.map((item) =>
        item.id === action.targetId
          ? { ...item, content: action.newContent }
          : item
      );
    }
    default:
      return state;
  }
}
function App() {
  const [todo, dispatch] = useReducer(reducer, []);
  const idRef = useRef(0);
  const onCreate = (content) => {
    dispatch({
      type: "CREATE",
      newItem: {
        id: idRef.current,
        content,
        isDone: false,
        createdDate: new Date().getTime(),
      },
    });
    idRef.current += 1;
  };
  const onUpdate = (targetId) => {
    dispatch({
      type: "UPDATE",
      targetId,
    });
  };
  const onDelete = (targetId) => {
    dispatch({
      type: "DELETE",
      targetId,
    });
  };
  const onEdit = (targetId, newContent) => {
    dispatch({
      type: "EDIT",
      targetId,
      newContent,
    });
  };
  return (
    <div className="App">
      <div className="container">
        <Header todo={todo} />
        <TodoEditor onCreate={onCreate} />
        <TodoList
          todo={todo}
          onUpdate={onUpdate}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      </div>
    </div>
  );
}

export default App;
