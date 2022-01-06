import {
  collection,
  addDoc,
  setDoc,
  getDoc,
  deleteDoc,
  updateDoc,
  getDocs,
  doc,
  query,
  where,
  serverTimestamp,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";

import { auth, db } from "../firebase";
import { getRandomImage } from "../helpers";

export const fetchCollection = async (collectionName) => {
  const querySnapshot = await getDocs(collection(db, collectionName));
  const map = {};

  querySnapshot.forEach(async (d) => {
    map[d.id] = d.data();
  });
  return map;
};

export const fetchDocument = async (collectionName, docId) => {
  const docRef = await getDoc(doc(db, collectionName, docId));
  return { id: docRef.id, ...docRef.data() };
};

export const addDocument = async (collectionName, data) => {
  const docRef = await addDoc(collection(db, collectionName), {
    ...data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
    owner: auth.currentUser.uid,
  });
  return docRef.id;
};

export const updateDocument = async (collectionName, id, data) => {
  await updateDoc(doc(db, collectionName, id), {
    ...data,
    updatedAt: serverTimestamp(),
  });
  return id;
};

export const deleteDocument = async (collectionName, id) => {
  await deleteDoc(doc(db, collectionName, id));
};

export const fetchItemsByBoardId = async (type, id) => {
  const q = query(collection(db, type), where("boardId", "==", id));
  const querySnapshot = await getDocs(q);
  const map = {};

  querySnapshot.docs.forEach((doc) => {
    map[doc.id] = doc.data();
  });

  return map;
};

export const fetchBoard = async (id) => {
  const board = await fetchDocument("boards", id);

  if (!board.title) return null;

  const listMap = await fetchItemsByBoardId("lists", id);
  const cardMap = await fetchItemsByBoardId("cards", id);

  return { ...board, listMap, cardMap };
};

export const fetchUserBoards = async (uid) => {
  const user = await getDoc(doc(db, "users", uid));
  if (!user.exists()) await addUser(uid);

  const boards = [];
  user.data().boards.forEach((id) => boards.push(fetchDocument("boards", id)));

  const resolvedBoards = await Promise.all(boards);
  return resolvedBoards;
};

export const addBoard = async (uid, title) => {
  const boardData = {
    owner: uid,
    title: title.trim(),
    image: getRandomImage(),
    lists: [],
  };
  const newBoardId = await addDocument("boards", boardData);
  await updateDocument("users", uid, { boards: arrayUnion(newBoardId) });
  return { id: newBoardId, ...boardData };
};

export const deleteBoard = async (uid, boardId) => {
  await deleteDocument("boards", boardId);
  await updateDocument("users", uid, { boards: arrayRemove(boardId) });
  return;
};

export const addList = async (data, boardId) => {
  const id = await addDocument("lists", { ...data, cards: [] });
  await updateDocument("boards", boardId, { lists: arrayUnion(id) });
  return id;
};

export const deleteList = async (id, boardId) => {
  await deleteDocument("lists", id);
  await updateDocument("boards", boardId, { lists: arrayRemove(id) });
};

export const addCard = async (data, listId) => {
  const id = await addDocument("cards", { ...data });
  await updateDocument("lists", listId, { cards: arrayUnion(id) });
  return id
};

export const deleteCard = async (id, listId) => {
  await deleteDocument("cards", id);
  await updateDocument("lists", listId, { cards: arrayRemove(id) });
};

export const addUser = async (uid) => {
  return setDoc(doc(db, "users", uid), {
    boards: [],
    createdAt: serverTimestamp(),
  });
};
