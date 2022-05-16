import React, { useState, useRef } from "react";
import { HiPlus, HiX } from "react-icons/hi";

const AddItem = ({ type, onAddItem, btnStyle, loading }) => {
  const [showForm, setShowForm] = useState(false);
  const titleRef = useRef();

  const addItemHandler = () => {
    setShowForm(false);
    if (titleRef.current.value) {
      onAddItem(titleRef.current.value);
    }
  };

  return (
    <div className={`cursor-pointer`}>
      {!showForm && (
        <div
          onClick={() => setShowForm(true)}
          className={` text-gray-500 hover:text-black w-full flex items-center ${btnStyle}`}
        >
          {loading && <div className="mx-auto py-5">Loading...</div>}
          {!loading && (
            <div className="flex">
              <span>
                <HiPlus className="mr-1 text-xl" />
              </span>
              <span>{`Add ${type}`}</span>
            </div>
          )}
        </div>
      )}

      {showForm && (
        <div className={`add-${type}-form  w-full`}>
          <input
            className="outline-none w-full py-2 px-1 mb-2 border border-gray-300 rounded-md"
            ref={titleRef}
            onBlur={addItemHandler}
            onKeyDown={(e) => (e.key === "Enter" ? addItemHandler() : null)}
            autoFocus
            name={`${type}-title`}
            placeholder={`Enter a title for this ${type}...`}
          />
          <div className="buttons space-x-3 flex items-center">
            <button
              className="bg-blue-500 hover:bg-blue-500 text-white py-1 px-2 rounded-md"
              onClick={addItemHandler}
            >{`Add ${type}`}</button>
            <button
              className="text-gray-500 hover:text-gray-700 "
              onClick={() => {
                setShowForm(false);
              }}
            >
              <HiX className="text-xl" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddItem;
