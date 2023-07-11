import React, { useRef, useState } from "react";
import "./CSS/TodoEditor.css";

const TodoEditor = ({ onCreate }) => {
  const [content, setContent] = useState();
  const inputRef = useRef();
  const onSubmit = () => {
    if (!content) {
      inputRef.current.focus();
      return;
    }
    onCreate(content);
    setContent("");
  };

  return (
    <div className="TodoEditor">
      <div className="editor_wrapper">
        <input
          ref={inputRef}
          type="text"
          placeholder="새로운 Todo를 입력해주세요."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onKeyDown={(e) => {
            if (e.keyCode === 13) onSubmit();
          }}
        />
        <button onClick={onSubmit}>+</button>
      </div>
    </div>
  );
};

export default TodoEditor;
