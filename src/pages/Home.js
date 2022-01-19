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
        const data = await fetchUserBoards(uid);
        setLoading(false);
        setBoards(data);
      } catch (err) {
        setAlert({ msg: err.message, isError: true });
      }
    };
    if (uid) _fetchBoards();
  }, [uid, setAlert]);

  const addBoardHandler = async (title) => {
    setAlert(null)
    try {
      if (!title) return;
      const newBoard = await addBoard(uid, title);
      setBoards((prev) => [...prev, newBoard]);
    } catch (err) {
      setAlert({ msg: err.message, isError: true });
    }
  };

  return (
    <div className="bg-blue-50 h-full">
      {loading && <Loading />}
      {!loading && (
        <>
          <BaseHeader>
            <span className="px-1 text-lg font-light border border-black">BOARDS</span>
          </BaseHeader>
          <div className="board-list-container bg-white mt-10 p-5 mx-auto max-w-4xl">
            <div className="board-list-header mb-3 border-b border-gray-400">
              <h3 className="board-list-title text-lg font-semibold">
                All Boards
              </h3>
            </div>
            <div className="board-list-content grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1">
              {boards.map((b) => (
                <div
                  key={b.id}
                  className="board-list-item col-auto border bg-white"
                  style={{
                    backgroundImage: `url(${b.image})`,
                    backgroundSize: "cover",
                  }}
                >
                  <Link to={`/b/${b.id}`}>
                    <div className="h-28 w-full hover:bg-white hover:bg-opacity-50">
                      <p className="pl-2 text-lg font-semibold bg-white opacity-75">
                        {b.title}
                      </p>
                    </div>
                  </Link>
                </div>
              ))}

              <div className="add-board col-auto">
                <AddItem
                  type="board"
                  btnStyle="p-2 rounded-md border-dashed border border-gray-400 h-28 justify-center"
                  onAddItem={addBoardHandler}
                />
              </div>
          {boards.length === 0 && (
            <p className="mr-2 pt-2 text-right">Add your first board!✨</p>
          )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
