import { useParams } from "react-router";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { deleteBoard } from "../services/dataService";
import { useAuth } from "../context/auth-context";
import { useActiveBoard } from "../context/active-board-context";
import { useAlert } from "../context/alert-context";
import {
  fetchBoard,
  updateBoard,
} from "../context/active-board-context/actions";

import Error404 from "./Error404";
import ItemTitle from "../components/ItemTitle";
import BoardDnD from "../components/BoardDnD";
import Loading from "../components/Loading";
import BaseHeader from "../components/BaseHeader";

const BoardPage = () => {
  const { boardId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const { setAlert } = useAlert();
  const { uid } = useAuth();
  const { state, dispatch } = useActiveBoard();
  const [isEdittingImage, setIsEdittingImage] = useState(false);
  const [imageUrl, setImageUrl] = useState(state.image);

  useEffect(() => {
    setAlert(null);
    if (boardId === state.id) {
      setLoading(false);
      return;
    }
    setImageUrl(state.image);
    fetchBoard(boardId)(dispatch).then(() => setLoading(false));
  }, [boardId, state.id, dispatch, setAlert, state.image]);

  const deleteBoardHandler = async () => {
    try {
      await deleteBoard(uid, boardId);
      navigate("/home");
      setAlert({ msg: "Board successfully deleted!", isError: false });
    } catch (err) {
      setAlert({ msg: err.message, isError: true });
    }
  };

  // Update board title or image
  const updateBoardHandler = async (data) => {
    setIsEdittingImage(false);
    await updateBoard(boardId, data)(dispatch);
    console.log(state);
  };

  const cancelEditImageHandler = () => {
    setIsEdittingImage(false);
    setImageUrl(state.image);
  };

  return (
    <>
      {loading && <Loading />}
      {!loading && !state.id && <Error404 />}
      {!loading && state.id && (
        <div
          className="board-container overflow-auto h-screen"
          style={{
            backgroundImage: `url(${state.image})`,
            backgroundSize: "cover",
          }}
        >
          <BaseHeader className="board-header">
            <div className="board-header-content w-full flex flex-wrap items-end gap-2">
              <div className="board-header-title w-1/3 flex sm:justify-center sm:items-center">
                <ItemTitle
                  textStyles="font-semibold text-center header-item"
                  initValue={state.title}
                  onUpdateTitle={updateBoardHandler}
                />
              </div>
              <div className="board-header-actions flex flex-wrap sm:items-center gap-2">
                <div
                  className="delete-board-btn header-item text-sm"
                  onClick={deleteBoardHandler}
                >
                  <button className="m-0.5 border-none outline-none">
                    Delete board
                  </button>
                </div>
                {!isEdittingImage && (
                  <div
                    className="edit-image-btn header-item text-sm"
                    onClick={() => setIsEdittingImage(true)}
                  >
                    <button className="m-0.5">Edit background image</button>
                  </div>
                )}
                {isEdittingImage && (
                  <div className="edit-image-form">
                    <input
                      onChange={(e) => setImageUrl(e.target.value)}
                      onFocus={(e) => e.target.select()}
                      value={imageUrl}
                      autoFocus
                      placeholder="Enter an image url"
                      className="outline-none border px-1"
                    />
                    <button
                      className="edit-image-form-btn bg-red-500 mx-2"
                      onClick={cancelEditImageHandler}
                    >
                      Cancel
                    </button>
                    <button
                      className="edit-image-form-btn bg-blue-500"
                      onClick={() => updateBoardHandler({ image: imageUrl })}
                    >
                      Save
                    </button>
                  </div>
                )}
              </div>
            </div>
          </BaseHeader>
          <div
            onClick={cancelEditImageHandler}
            className="board-content mt-2 mx-9"
          >
            <BoardDnD boardId={boardId} />
          </div>
        </div>
      )}
    </>
  );
};

export default BoardPage;
