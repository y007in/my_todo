import React, { useState, useRef } from "react";
import "./CSS/TodoItem.css";

const TodoItem = ({
  id,
  isDone,
  content,
  createdDate,
  onUpdate,
  onDelete,
  onEdit,
}) => {
  const [isEdit, setIsEdit] = useState(false);
  const [localContent, setLocalContent] = useState(content);
  const localContentInput = useRef();
  const handleDelete = () => {
    if (window.confirm(`삭제하시겠습니까?`)) onDelete(id);
  };
  const handleEdit = () => {
    if (localContentInput.length < 1) {
      localContentInput.current.focus();
      return;
    }

    onEdit(id, localContent);
    toggleIsEdit();
  };
  const toggleIsEdit = () => setIsEdit(!isEdit);
  const handleQuitEdit = () => {
    setIsEdit(false);
    setLocalContent(content);
  };
  return (
    <div className="TodoItem">
      <div className="checkbox_col">
        <input type="checkbox" checked={isDone} onChange={() => onUpdate(id)} />
      </div>
      <div className={isDone ? "title_col check" : "title_col"}>
        {isEdit ? (
          <textarea
            value={localContent}
            ref={localContentInput}
            onChange={(e) => setLocalContent(e.target.value)}
          />
        ) : (
          content
        )}
      </div>
      <div className="date_col">
        {new Date(createdDate).toLocaleDateString()}
      </div>
      {isEdit ? (
        <div className="btn_col">
          <button onClick={handleEdit}>완료</button>
          <button onClick={handleQuitEdit}>취소</button>
        </div>
      ) : (
        <div className="btn_col">
          <button onClick={toggleIsEdit}>🛠</button>
          <button onClick={handleDelete}>X</button>
        </div>
      )}
    </div>
  );
};

export default TodoItem;
