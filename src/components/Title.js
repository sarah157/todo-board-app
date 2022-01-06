import React, { useState } from "react";
import { HiTrash } from "react-icons/hi";

const Title = ({ textStyles, initValue, onUpdateTitle, onDeleteItem}) => {
  const [isEditting, setIsEditting] = useState(false);
  const [title, setTitle] = useState(initValue);
  const [prevTitle, setPrevTitle] = useState(initValue);
  
  const inputTitleHandler = () => {
    setIsEditting(false);

    if (prevTitle !== title) {
      onUpdateTitle({title});
      setPrevTitle(title);
    }
  };

  const deleteItemHandler = () => {
    onDeleteItem()
  }

  return (
    <>
      {!isEditting ? (
        <div className="flex flex-1 justify-between items-center">
        <h2
          className={`w-full ${textStyles}`}
          onClick={() => setIsEditting(true)}
          aria-label={`${title} `}
        >
          {title}
        </h2>
            {onDeleteItem && <div className="group cursor-pointer w-10" onClick={deleteItemHandler}><HiTrash className="text-gray-400 group-hover:text-black mx-auto"/></div>}
            </div>
      ) : (
        <input
          className={`bg-transparent w-full ${textStyles}`}
          onBlur={inputTitleHandler}
            autoFocus
            onKeyDown={e => e.key === 'Enter' ? inputTitleHandler() : null}
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
      )}
    </>
  );
};

export default Title;
