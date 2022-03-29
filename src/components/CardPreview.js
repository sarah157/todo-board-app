import React, { useState, useEffect } from 'react';
import { Draggable } from "react-beautiful-dnd";
import { HiArrowsExpand } from 'react-icons/hi';

import {
  updateCard,
  deleteCard,
} from "../context/active-board-context/actions";
import { useActiveBoard } from "../context/active-board-context";

import ItemTitle from "./ItemTitle";
import CardDetails from "./CardDetails";
import CheckCircle from './CheckCircle';
import Modal from "./Modal";

const CardPreview = ({ cardId, card, index, listId }) => {
  const [openModal, setOpenModal] = useState(false);
  const { dispatch } = useActiveBoard();

  const toggleDoneHandler = (isDone) => {
    updateCard(cardId, { done: isDone })(dispatch);
  }

  // update title, due date, details
  const updateCardHandler = async (data) => {
    updateCard(cardId, data)(dispatch);
  };

  const deleteCardHandler = async () => {
    deleteCard(cardId, listId)(dispatch);
  };
  const closeModalHandler = () => {
    setOpenModal(false);
  }

  return (
    <>
      {openModal && (
        <Modal
          component={CardDetails}
          props={{ card, onUpdate: updateCardHandler, onToggleDone: toggleDoneHandler }}
          onClose={closeModalHandler}
        />
      )}
      <Draggable key={cardId} draggableId={cardId} index={index}>
        {(dragProvided) => (
          <div
          className="card-container py-1"
          ref={dragProvided.innerRef}
          {...dragProvided.draggableProps}
          {...dragProvided.dragHandleProps}
          >
            <div className="card-content p-1 flex rounded-md shadow-sm bg-gray-50 items-center hover:bg-gray-100 space-x-1">
              <CheckCircle isDone={card.done} onToggle={toggleDoneHandler} />
              <ItemTitle
                textStyles={card.done ? "text-gray-400 line-through" : ""}
                initValue={card.title}
                onUpdateTitle={updateCardHandler}
                onDeleteItem={deleteCardHandler}
              />

              <div className="group cursor-pointer" onClick={() => setOpenModal(true)}>
                <HiArrowsExpand
                  className="text-gray-400 group-hover:text-black mx-auto" />
              </div>
            </div>
          </div>
        )}
      </Draggable>
    </>
  );
};

export default CardPreview;
