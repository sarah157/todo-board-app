import { useState } from "react";
import CheckCircle from "./CheckCircle";

const CardDetails = ({ card, onToggleDone, onUpdate }) => {
    const [details, setDetails] = useState(card.details);

    const toggleDoneHandler = (isDone) => {
        onToggleDone(isDone);
    }
    const updateDueDateHandler = (e) => {
        onUpdate({ dueDate: e.target.value })
    };

    const updateDetailsHandler = (e) => {
        onUpdate({ details: e.target.value })
    }

    return (
        <div className="mt-3 p-3">
            <div className="flex justify-start text-3xl mb-3 gap-x-3">
                <CheckCircle
                    isDone={card.done}
                    onToggle={toggleDoneHandler}
                />
                <h3 className="text-center font-bold">{card.title}</h3>
            </div>
            <div className="mt-10 space-y-6">
                <div>
                    <label className="mr-3" id="due-date" for="due-date">Due Date:</label>
                    <input value={card.dueDate} className="border border-gray-300 outline-none px-1"
                        type="date" id="due-date" for="due-date"
                        onChange={updateDueDateHandler} />
                </div>
                <div>
                    <label className="block mb-1" for="card-details">Details:</label>
                    <textarea
                        value={details}
                        className="w-full border border-gray-300 p-1 outline-none" id="card-details" name="card-details" rows="6"
                        placeholder="Additional details"
                        onBlur={updateDetailsHandler}
                        onChange={(e) => setDetails(e.target.value)}>
                    </textarea>
                </div>
                <div>
                    <div>
                        {/* todo: subtasks */}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CardDetails;