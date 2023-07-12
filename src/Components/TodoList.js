import React, { useState, useEffect } from "react";
import "./CSS/TodoList.css";
import TodoItem from "./TodoItem";

const TodoList = ({ todo, onUpdate, onDelete, onEdit }) => {
  const [isList, setIsList] = useState(true); // 초기값을 true로 설정

  useEffect(() => {
    setIsList(todo.length === 0); // todo 배열의 길이에 따라 isList 업데이트
  }, [todo]);

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
        {isList ? (
          <p className="noTodo">입력된 Todo가 없습니다.</p>
        ) : (
          getSearchResult().map((item) => (
            <TodoItem
              key={item.id}
              {...item}
              onUpdate={onUpdate}
              onDelete={onDelete}
              onEdit={onEdit}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default TodoList;
