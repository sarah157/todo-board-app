export const reorder = (list,
    startIndex,
    endIndex
  ) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
  
    return result;
  };
  
  export const reorderMap = (map,source, destination) => {
    const current = [...map[source.droppableId].cards];
    const next = [...map[destination.droppableId].cards];
    const target = current[source.index];
  
    // moving card to same list
    if (source.droppableId === destination.droppableId) {
      const reordered = reorder(current, source.index, destination.index);
      const updatedCol = { ...map[source.droppableId], cards: reordered }

      return {
        ...map,
        [source.droppableId]: updatedCol
      };
    }
  
    // moving card to different list
    current.splice(source.index, 1);
    next.splice(destination.index, 0, target);
  
    return {
      ...map,
      [source.droppableId]: {...map[source.droppableId], cards: current},
      [destination.droppableId]: {...map[destination.droppableId], cards: next}
    };
  };

const IMAGES = [
  "https://images.unsplash.com/photo-1542261777448-23d2a287091c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
  "https://images.unsplash.com/photo-1641400504445-99dc922bbe63?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
  "https://images.unsplash.com/photo-1502732728614-8329a1bf1415?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
  "https://images.unsplash.com/photo-1637247475751-0cbe92e86d4b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
  "https://images.unsplash.com/photo-1559674939-7f9c1101b585?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1035&q=80"
]


export const getRandomImage = () => {
  const index = Math.floor(Math.random() * IMAGES.length)
    return IMAGES[index]
  }