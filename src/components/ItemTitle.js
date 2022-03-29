import React, { useState } from "react";
import { HiTrash } from "react-icons/hi";

const ItemTitle = ({ textStyles, initValue, onUpdateTitle, onDeleteItem }) => {
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
        <div className="flex flex-1 justify-between items-center">
      {!isEditting && (
          <h2
            className={`w-full ${textStyles}`}
            onClick={() => setIsEditting(true)}
            aria-label={`${title} `}
          >
            {title}
          </h2>
      )} 
      {isEditting && (
        <input
        className={`bg-transparent w-full ${textStyles}`}
        onBlur={inputTitleHandler}
        onPause={inputTitleHandler}
        autoFocus
        onKeyDown={e => e.key === 'Enter' ? inputTitleHandler() : null}
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        />
        )}
        </div>
        {onDeleteItem &&
          <div className="group cursor-pointer w-10"
            onClick={deleteItemHandler}><HiTrash className="mt-1 text-gray-400 group-hover:text-black mx-auto" /></div>
            }
    </>
  );
};

export default ItemTitle;
