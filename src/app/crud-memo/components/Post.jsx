"use client";

import React, { useState } from "react";

import Modal from "./Modal";
import axios from "axios";
import { useRouter } from "next/navigation";

import { useHotkeys } from '@mantine/hooks';





export default function Post({ post }) {

  // ------------------------------------------------------

  const router = useRouter();

  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [postToEdit, setPostToEdit] = useState(post);

  const [openModalDelete, setOpenModalDelete] = useState(false);

  // ------------------------------------------------------

  const handleEditSubmit = (e) => {
    
    e.preventDefault();
    
    if (!postToEdit.title) {
      alert("Title is empty")
    } else if (!postToEdit.memo) {
      alert("Memo is empty")
    } else {

      axios
        .patch(`/api/memos/${post.id}`, postToEdit)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setOpenModalEdit(false);
          router.refresh();
        });

    }
  };

  const handleChangeTitle = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setPostToEdit((prevState) => ({ ...prevState, [name]: value }));
  };
  const handleChangeMemo = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setPostToEdit((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleDeletePost = (id) => {
    axios
    .delete(`/api/memos/${id}`)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      setOpenModalEdit(false);
      router.refresh();
    });
  }
  // ------------------------------------------------------



  

  // ------------------------------------------------------
  // UNDO and REDO  
  // ------------------------------------------------------
  const [inputValue, setInputValue] = useState(''); // State for the current input value.
  const [undoStack, setUndoStack] = useState([]); // State for the undo stack.
  const [redoStack, setRedoStack] = useState([]); // State for the redo stack.

  // Event handler for input change.
  const handleInputChange = (e) => {
    const newValue = e.target.value; // Get the new value from the input.
    setInputValue(newValue); // Update the input value state.

    setUndoStack((prevStack) => [...prevStack, newValue]); // Push the current value to the undo stack.
    setRedoStack([]); // Clear the redo stack when a new value is entered.
  };

  // Event handler for undo.
  const handleUndo = () => {
    if (undoStack.length > 1) { // Check if there are more than one item in the undo stack.
      const current = undoStack.pop(); // Remove the current value from the undo stack.
      setRedoStack((prevStack) => [current, ...prevStack]); // Add the current value to the redo stack.
      setInputValue(undoStack[undoStack.length - 1]); // Set the input value to the previous value in the undo stack.
    }
  };

  // Event handler for redo.
  const handleRedo = () => {
    if (redoStack.length > 0) { // Check if there are items in the redo stack.
      const next = redoStack.shift(); // Remove the next value from the redo stack.
      setUndoStack((prevStack) => [...prevStack, next]); // Add the next value to the undo stack.
      setInputValue(next); // Set the input value to the next value.
    }
  };

  // Use @mantine/hooks to listen for keyboard shortcuts.
  useHotkeys([
    ['ctrl+z', handleUndo], // Register the Ctrl+Z shortcut for undo.
    ['ctrl+shift+z', handleRedo], // Register the Ctrl+Shift+Z shortcut for redo.
  ]);
  // ------------------------------------------------------





  return (
    <li className="p-5 my-5 bg-slate-200" key={post.id}>
      <h1 className="text-2xl font-bold">{post.title}</h1>
      <p className="text-lg">{post.memo}</p>
      <br/>
      {/* <p>userId: <b>{post.userId}</b></p> */}
      <p className="text-xs">noteId: <b>{post.id}</b></p>
      <p className="text-xs">createdAt: {post.createdAt}</p>
      <p className="text-xs">updatedAt: {post.updatedAt}</p>

      {/* --------------------------------------------------------------- */}
      <div className="pt-5">
        <button
          className="text-blue-700 mr-3"
          onClick={() => setOpenModalEdit(true)}
        >
          Edit
        </button>

        <Modal modalOpen={openModalEdit} setModalOpen={setOpenModalEdit}>
          <form className="w-full" onSubmit={handleEditSubmit}>
            <h1 className="text-2xl pb-3">Edit Post</h1>

            <input
              type="text"
              placeholder="Title"
              name="title"
              className="w-full p-2 my-5"
              value={postToEdit.title || ""}
              onChange={(handleChangeTitle)}
            />
            <textarea 
              className="w-full p-2 my-0"
              name="memo"
              placeholder="Write your note here..."
              rows="10"
              value={postToEdit.memo || ""}
              onChange={(
                handleChangeMemo,
                handleInputChange  // <--- Everytime there is a change, onChange, on textarea value, it will call handleInputChange function to provide user with Undo Redo experience.
              )}
            />

            <button type="submit" className="bg-blue-700 text-white px-5 py-2">
              Submit
            </button>
          </form>
        </Modal>
        {/* --------------------------------------------- */}
        <button 
          onClick={() => setOpenModalDelete(true)} 
          className="text-red-700 mr-3"
        >
          Delete
        </button>

        <Modal modalOpen={openModalDelete} setModalOpen={setOpenModalDelete}>
          <h1 className="text-xl pb-3">
            Are you sure, You want to delete this post?
          </h1>

          <div>
            <button
              onClick={() => handleDeletePost(post.id)}
              className="text-blue-700 font-bold mr-5"
            >
              YES
            </button>
            <button
              onClick={() => setOpenModalDelete(false)}
              className="text-red-700 font-bold mr-5"
            >
              NO
            </button>
          </div>
        </Modal>
      </div>
      {/* --------------------------------------------------------------- */}
    </li>
  );
};

