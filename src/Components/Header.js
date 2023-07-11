import React from "react";
import "./CSS/Header.css";
import { useMemo } from "react";

const Header = ({ todo }) => {
  const analyzeTodo = useMemo(() => {
    const totalCount = todo.length;
    const doneCount = todo.filter((item) => item.isDone).length;
    const notDoneCount = totalCount - doneCount;
    return {
      totalCount,
      doneCount,
      notDoneCount,
    };
  }, [todo]);
  const { totalCount, doneCount, notDoneCount } = analyzeTodo;
  return (
    <div className="Todo_title">
      <h1>Todo List</h1>
      <div className="counts">
        <div className="all">All : {totalCount}</div>
        <div className="done">Done : {doneCount}</div>
        <div className="notdone">NotDone : {notDoneCount}</div>
      </div>
    </div>
  );
};

export default Header;
