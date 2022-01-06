import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { useAuth } from "../context/auth-context";
import { addBoard, fetchUserBoards } from "../services/dataService";

import AddItem from "../components/AddItem";
import Loading from "../components/Loading";
import BaseHeader from "../components/BaseHeader";
import { useAlert } from "../context/alert-context";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const { setAlert } = useAlert();
  const [boards, setBoards] = useState([]);
  const { uid } = useAuth();

  useEffect(() => {
    const _fetchBoards = async () => {
      try {
        setLoading(true);
        const data = await fetchUserBoards(uid)
        setLoading(false);
        setBoards(data);
      } catch (err) {
        setAlert({ msg: err.message, isError: true });
      }
    };
    if (uid) _fetchBoards();
  }, [uid, setAlert]);

  const addBoardHandler = async (title) => {
    try {
      if (!title) return;
      const newBoard = await addBoard(uid, title);
      setBoards((prev) =>  [...prev, newBoard]);
    } catch (err) {
      setAlert({ msg: err.message, isError: true });
    }
  };
  
  return (
    <>
      {loading && <Loading />}
      {!loading && (
        <>
        <BaseHeader/>
        <div className="board-list gap-1 flex md:w-3/4 justify-center mx-auto flex-wrap mt-14">
            {boards.map(b => (
              <Link to={`/b/${b.id}`} key={b.id}>
              <div className="bg-gray-100 rounded-md h-20 w-48 hover:bg-gray-200 hover:shadow-md flex items-center justify-center">
                {b.title}
              </div>
            </Link>
          ))}
          {boards.length === 0 && (
            <p className="mr-2 pt-2">Add your first board</p>
          )}
          <div className="add-board-container h-32 w-48">
            <AddItem
              type="board"
              btnStyle="p-2 rounded-md mx-auto border"
              onAddItem={addBoardHandler}
            />
          </div>
          </div>
          </>
      )}
    </>
  );
}
