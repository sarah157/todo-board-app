import React, { useState } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";

import { addCard, deleteList, updateList } from "../context/active-board-context/actions";
import { useActiveBoard } from "../context/active-board-context";
import { useAuth } from "../context/auth-context";

import CardPreview from "./CardPreview";
import AddItem from "./AddItem";
import ItemTitle from "./ItemTitle";

const Column = ({ listId, index, list }) => {
  const { uid } = useAuth();
  const { state, dispatch } = useActiveBoard();
  const [loading, setLoading] = useState(false);

  const updateListTitleHandler = async (title) => {
    updateList(listId, title)(dispatch);
  };

  const deleteListHandler = async () => {
    deleteList(listId, state.id)(dispatch);
  };

  const addCardHandler = async (title) => {
    setLoading(true);
    const data = {
      title,
      boardId: state.id,
      owner: uid,
      done: false,
      details: "",
      dueDate: ""
    };
    addCard(data, listId)(dispatch).then(() => setLoading(false));
  };

  return (
    <Draggable draggableId={listId} index={index}>
      {(provided, snapshot) => (
        <div
          className="list-container flex-none w-72 p-1"
          ref={provided.innerRef}
          {...provided.draggableProps}
        >
          <div className="list-content rounded-md  p-2 bg-gray-200  ">
            <div className="list-header flex" {...provided.dragHandleProps}>
              <ItemTitle
                textStyles="font-semibold"
                initValue={list.title}
                onUpdateTitle={updateListTitleHandler}
                onDeleteItem={deleteListHandler}
              />
            </div>

            <Droppable droppableId={listId} index={index} type="CARD">
              {(dropProvided) => (
                <div
                  className="list-cards flex flex-col my-2"
                  {...dropProvided.droppableProps}
                  ref={dropProvided.innerRef}
                >
                  {list.cards &&
                    list.cards.map((cardId, idx) => (
                      <CardPreview
                        key={cardId}
                        cardId={cardId}
                        card={state.cardMap[cardId]}
                        index={idx}
                        listId={listId}
                      />
                    ))}
                  {dropProvided.placeholder}
                </div>
              )}
            </Droppable>

            <AddItem type="card" onAddItem={addCardHandler} loading={loading} />
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default Column;
