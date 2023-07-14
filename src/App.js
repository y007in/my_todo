import "./App.css";
import { useRef, useReducer, useEffect, useState } from "react";
import Header from "./Components/Header";
import TodoEditor from "./Components/TodoEditor";
import TodoList from "./Components/TodoList";
function reducer(state, action) {
  switch (action.type) {
    case "CREATE":
      const newState = [action.newItem, ...state];
      localStorage.setItem(`todo`, JSON.stringify(newState));
      return newState;
    case "UPDATE": {
      return state.map((item) =>
        item.id === action.targetId ? { ...item, isDone: !item.isDone } : item
      );
    }
    case "DELETE": {
      const newState = state.filter((item) => item.id !== action.targetId);
      localStorage.setItem(`todo`, JSON.stringify(newState));
      return newState;
    }
    case "EDIT": {
      const newState = state.map((item) =>
        item.id === action.targetId
          ? { ...item, content: action.newContent }
          : item
      );
      return newState;
    }
    case "INIT": {
      return action.data;
    }
    default:
      return state;
  }
}
function App() {
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [todo, dispatch] = useReducer(reducer, []);
  const idRef = useRef(0);
  useEffect(() => {
    const rawData = localStorage.getItem("todo");
    if (!rawData) {
      setIsDataLoaded(true);
      return;
    }
    const localData = JSON.parse(rawData);
    if (localData.length === 0) {
      setIsDataLoaded(true);
      return;
    }

    idRef.current = localData[0].id + 1;
    dispatch({ type: "INIT", data: localData });
    setIsDataLoaded(true);
    return;
  }, []);
  useEffect(() => {
    localStorage.setItem("todo", JSON.stringify(todo));
  }, [todo]);
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
  if (!isDataLoaded) {
    return <div>데이터를 불러오는 중입니다.</div>;
  } else {
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
}

export default App;
