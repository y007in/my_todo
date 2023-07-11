import React, { useState } from "react";
import "./CSS/TodoList.css";
import TodoItem from "./TodoItem";

const TodoList = ({ todo, onUpdate, onDelete }) => {
  const [search, setSearch] = useState("");
  const getSearchResult = () => {
    return search === ""
      ? todo
      : todo.filter((item) =>
          item.content.toLowerCase().includes(search.toLowerCase())
        );
  };

  return (
    <div className="TodoList">
      <input
        type="text"
        value={search}
        className="searchbar"
        placeholder="검색어를 입력하세요."
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="list_wrapper">
        {getSearchResult().map((item) => (
          <TodoItem
            key={item.id}
            {...item}
            onUpdate={onUpdate}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default TodoList;
