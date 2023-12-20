"use client";

import React, { useState, useEffect } from 'react';
import Modal from "./Modal";
import axios from "axios";
import {useRouter} from 'next/navigation'

import { useHotkeys } from '@mantine/hooks';






export default function AddPost() {

  // ------------------------------------------------------
  
  const router = useRouter();

  const [modalOpen, setModalOpen] = useState(false);
  const [inputs, setInputs] = useState({});

  // ------------------------------------------------------

  const handleSubmit = (e) => {

    e.preventDefault();
    
    if (!inputs.title) {
      alert("Title is empty")
    } else if (!inputs.memo) {
      alert("Memo is empty")
    } else {

      axios
        .post("/api/memos", inputs)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setInputs({});
          setModalOpen(false);
          router.refresh();
      });

    }

  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputs((prevState) => ({ ...prevState, [name]: value }));
  };



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
    <div>
      <button
        onClick={() => setModalOpen(true)}
        className="bg-blue-700 text-white p-3 cursor-pointer rounded-md"
      >
        Add New Post
      </button>

      {/* ------------------------------------------------------------------------------------------------------------ */}
      <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
        <form className="w-full" onSubmit={handleSubmit}>
          <h1 className="text-2xl pb-3">Add New Post</h1>

          <input
            type="text"
            placeholder="Title"
            name="title"
            className="w-full p-2 my-5"
            value={inputs.title || ""}
            onChange={handleChange}
          />
          <textarea 
            className="w-full p-2 my-0"
            name="memo"
            placeholder="Write your note here..."
            rows="10"
            value={inputs.memo || ""}
            onChange={(
              handleChange,
              handleInputChange  // <--- Everytime there is a change, onChange, on textarea value, it will call handleInputChange function to provide user with Undo Redo experience.
            )}   
          />

          <br/>

          <button type="submit" className="bg-blue-700 text-white px-5 py-2">
            Submit
          </button>
        </form>
      </Modal>
      {/* ------------------------------------------------------------------------------------------------------------ */}
    </div>
  );
};

