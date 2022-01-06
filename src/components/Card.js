import { Draggable } from "react-beautiful-dnd";
import { HiCheckCircle } from "react-icons/hi";

import {
  updateCard,
  deleteCard,
} from "../context/active-board-context/actions";
import { useActiveBoard } from "../context/active-board-context";

import Title from "./Title";

const Card = ({ cardId, card, index, listId }) => {
  const { dispatch } = useActiveBoard();

  const updateCardHandler = async (data) => {
    updateCard(cardId, data)(dispatch);
  };
  const deleteCardHandler = async () => {
    deleteCard(cardId, listId)(dispatch);
  };

  return (
    <Draggable key={cardId} draggableId={cardId} index={index}>
      {(dragProvided) => (
        <div
          className="card-container py-1"
          ref={dragProvided.innerRef}
          {...dragProvided.draggableProps}
          {...dragProvided.dragHandleProps}
        >
          <div className="card-content p-1 flex rounded-md shadow-sm bg-gray-50 items-center hover:bg-gray-100 space-x-1">
            <span
              className="group w-6 cursor-pointer"
              onClick={() => updateCardHandler({ done: !card.done })}>
              <HiCheckCircle
                className={`${
                  card.done
                    ? "text-green-400 group-hover:text-gray-600"
                    : "text-gray-400 group-hover:text-green-600"
                }`}
              />
            </span>

            <Title
              textStyles={card.done ? "text-gray-400 line-through" : ""}
              initValue={card.title}
              onUpdateTitle={updateCardHandler}
              onDeleteItem={deleteCardHandler}
            />
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default Card;
