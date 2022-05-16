import { DragDropContext, Droppable } from "react-beautiful-dnd";

import { reorder, reorderMap } from "../helpers";
import { useActiveBoard } from "../context/active-board-context";
import {
  reorderLists,
  reorderCards,
  addList,
} from "../context/active-board-context/actions";

import AddItem from "./AddItem";
import Column from "./Column";
import { useState } from "react";

const BoardDnD = ({ boardId }) => {
  const { state, dispatch } = useActiveBoard();
  const [loading, setLoading] = useState(false);

  const onDragEnd = async (result) => {
    // dropped nowhere
    if (!result.destination) return;

    const source = result.source;
    const destination = result.destination;

    // did not move anywhere - can bail early
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    // reordering columns
    if (result.type === "COLUMN") {
      const newListOrder = reorder(
        state.listOrder,
        source.index,
        destination.index
      );
      reorderLists(newListOrder, boardId)(dispatch);
    } else {
      // else reordering cards
      const newListMap = reorderMap(state.listMap, source, destination);
      reorderCards(newListMap)(dispatch);
    }
  };

  const addListHandler = async (title) => {
    setLoading(true);
    addList(
      { title, boardId, cards: [] },
      boardId
    )(dispatch).then(() => setLoading(false));
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="board-canvas-container">
        {
          <Droppable droppableId="board" type="COLUMN" direction="horizontal">
            {(provided, snapshot) => (
              <div
                className="board-canvas-content w-full flex bg-fixed"
                ref={provided.innerRef}
                {...provided.droppableProps}
                {...provided.dragHandleProps}
              >
                {state.listOrder.map((listId, index) => (
                  <Column
                    key={listId}
                    listId={listId}
                    index={index}
                    list={state.listMap[listId]}
                  />
                ))}
                {provided.placeholder}
                <div className="add-list-container flex-none w-72 p-1">
                  <AddItem
                    type="list"
                    btnStyle="border bg-white bg-opacity-80 h-10 rounded-md px-4"
                    onAddItem={addListHandler}
                    loading={loading}
                  />
                </div>
              </div>
            )}
          </Droppable>
        }
      </div>
    </DragDropContext>
  );
};

export default BoardDnD;
