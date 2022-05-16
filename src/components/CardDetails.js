import { useState } from "react";

import { useActiveBoard } from "../context/active-board-context";
import {
  updateCard,
  deleteCard,
} from "../context/active-board-context/actions";
import CheckCircle from "./CheckCircle";
import ItemTitle from "./ItemTitle";

const CardDetails = ({ card, cardId, listId, onToggleDone }) => {
  const [details, setDetails] = useState(card.details);
  const { dispatch } = useActiveBoard();

  const toggleDoneHandler = (isDone) => {
    onToggleDone(isDone);
  };
  const updateDueDateHandler = (e) => {
    updateCard(cardId, { dueDate: e.target.value })(dispatch);
  };

  const updateDetailsHandler = (e) => {
    updateCard(cardId, { details: e.target.value })(dispatch);
  };
  const updateTitleHandler = (title) => {
    updateCard(cardId, title)(dispatch);
  };

  const deleteCardHandler = async () => {
    deleteCard(cardId, listId)(dispatch);
  };

  return (
    <div className="mt-3 p-3">
      <div className="flex justify-start text-2xl mb-3 gap-x-3">
        <CheckCircle isDone={card.done} onToggle={toggleDoneHandler} />
        <ItemTitle
          textStyles={card.done ? "text-gray-400 line-through" : ""}
          initValue={card.title}
          onUpdateTitle={updateTitleHandler}
          onDeleteItem={deleteCardHandler}
        />
      </div>
      <div className="mt-10 space-y-6">
        <div>
          <label className="mr-3" id="due-date" for="due-date">
            Due Date:
          </label>
          <input
            value={card.dueDate}
            className="border border-gray-300 outline-none px-1"
            type="date"
            id="due-date"
            for="due-date"
            onChange={updateDueDateHandler}
          />
        </div>
        <div>
          <label className="block mb-1" for="card-details">
            Details:
          </label>
          <textarea
            value={details}
            className="w-full border border-gray-300 p-1 outline-none"
            id="card-details"
            name="card-details"
            rows="6"
            placeholder="Additional details"
            onBlur={updateDetailsHandler}
            onChange={(e) => setDetails(e.target.value)}
          ></textarea>
        </div>
        <div>
          <div>{/* todo: subtasks */}</div>
        </div>
      </div>
    </div>
  );
};

export default CardDetails;
