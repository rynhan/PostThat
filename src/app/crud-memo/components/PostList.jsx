'use client'

import AddPost from "@/app/crud-memo/components/AddPost";
import Post from '@/app/crud-memo/components/Post'
import React, { useState, useCallback, useEffect } from 'react'






export default function PostList({posts}){
  const [textPattern, setTextPattern] = useState('') // <--- As a reference text for the search notes feature.

  const [sortOrder, setSortOrder] = useState(false) // <--- As a Toggle to change sortOrder (descending or ascending).
  const [sortBy, setSortBy] = useState(false) // <--- As a Toggle to change sortBy (createdAt date or updatedAt date).

  if (sortBy == true) { // <--- If sortBy is equal to true, sort the notes by its updateAt date.
    sortOrder && ( posts.sort((a, b) => (a["updatedAt"] > b["updatedAt"]) ? 1 : -1) ) // <--- If sortOrder is true, sort the array of notes in descending order.
    !sortOrder && ( posts.sort((a, b) => (a["updatedAt"] < b["updatedAt"]) ? 1 : -1) )// <--- If sortOrder is false, sort the array of notes in ascending order.
  } else if (sortBy == false) { // <--- If sortBy is equal to false, sort the notes by its createdAt date.
    sortOrder && ( posts.sort((a, b) => (a["createdAt"] > b["createdAt"]) ? 1 : -1) ) // <--- If sortOrder is true, sort the array of notes in descending order.
    !sortOrder && ( posts.sort((a, b) => (a["createdAt"] < b["createdAt"]) ? 1 : -1) )// <--- If sortOrder is false, sort the array of notes in ascending order.
  }


  
  return (
    <div>

      {/* --------------------------- */}
      <div className="relative flex flex-1 flex-shrink-0   gap-3">
        <AddPost />
        <input
          placeholder="Search"
          className="peer w-2/6 rounded-md border border-gray-200 py-[9px] pl-3 text-sm outline-2 placeholder:text-gray-500"
          onChange={(e) => {
            setTextPattern(e.target.value); // <--- Every time user change some stuff on input, retrieve its text and save it to textPattern.
          }}
        />
        
        <button onClick={() => setSortBy(!sortBy)}> { /* //<--- It is a toggle. One click to sort the list of notes according to createdAt, another click to sort according to updatedAt. */ }
          { sortBy && (<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAABJUlEQVR4nOXVzypFURTH8U/dAZI/c8n1CAZGPIDikre4DNyIJzDAgIE/L6GUkaEyoLwCUwYyEhlx6dS6ddJ1bcdRyq9W7fZa+/ft7LU6m/+iPsxjGWuxHijDuAebeMbbh3jCFrqLmg/iMsxecYpt7OM8B1oqCjgJgyuMtclPYBfVIuYzYX6HoYT62YhkHQWgkVC7iGZEtk7SbQBGEs1b/UiGvMSByhfX2GwDaEauo1oHOqkWo1rP1ddjrxTAT+p/BzCNByy0+eRaWYAiTatEbTYYX6rI2I1G7U0KIA9JnemVABz6hmoJ955pGPcBmFJAVexhsk1uHNdhfqygGrl+XOAAOzjL9Srb7y8K6MYGHj95cNbRpQT1Yw6r8Wxmv+beMoz/vt4BC7ttX0Ecf98AAAAASUVORK5CYII="></img>) }
          { !sortBy && (<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAA+ElEQVR4nO2VOw6CUBBFDx0d7kNrcR/qHhTsLWywcyHGNaC1S/DHFtQtIOYl14SY8HtQWHiSSRjezNy8GTLAn4Y4QAAkwAvIapqJvQFz1SgkUEIMbBparFwjUkiiQFv2wLUsIAXWLQTWqlFI1pEVYg6PFv3fyI51BCLsiZoIuEAI+LnzKTDJ+b5iXBuBhfyH/EGux329e8oPbQR8Fd/K94AzcNKzYaeYoY2ADdFPCYzUY9MGQw+4qE1eFwKfId9LhtxYIL8qXC2/zwDRJzpusypuLZfdoWrZzXVFsxVXwLKmrVTc5M7KBByJXHXVrKalyplV/XD+8M0b/KGKVni3FLQAAAAASUVORK5CYII="></img>) }
        </button>
        <button onClick={() => setSortOrder(!sortOrder)}>  { /* <--- It is a toggle. One click to sort the list in ascending order, another click to sort the list in descending order. */ }
          { sortOrder && (<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAh0lEQVR4nO2RUQqEIBRFzw6axQ1tt+H5EbWobgR+DGLUUwM/OiDCQzx6L7w4CYDi7mEBZo/AnALF9RjqRhD+Dnu6UKnAWgtKUTeCkESkm11UC6yVoBR1IwgnEemii2YCqxV4GIEt84hj9m0h+ABrRnDMhtKIlHSRStY4o1ZgyU9+wHR1+Qs5drhrbh51ezwdAAAAAElFTkSuQmCC"></img>) }
          { !sortOrder && (<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAe0lEQVR4nO2SWwqAIBAA5wZ1uOi6hfsReagMwX5E8E1+OODPwu7AIEwyEcAkPPH2buBqKVDe3jfvhhlGIJntmwvU8IlKMbWJpLdAtRKUYoYRSGb7aoH6M9EOPIEPYWdbC8EK6IDAzpZYIimUaDcjJkhtjzt4Akfs+IQQL4ZCbh4IXZuUAAAAAElFTkSuQmCC"></img>) }
        </button>
      </div>

      <br />
      <br />
      {/* --------------------------- */}


      <ul>
        {
          posts.filter( ({title, memo}) => 
            memo.toLowerCase().includes(textPattern.toLowerCase()) || 
            title.toLowerCase().includes(textPattern.toLowerCase()) // <--- This line is filtering the array of notes based on user input text in search bar input.
          ).map(memo => (
            <Post key={memo.id} post={memo} />
          ))
        } 
      </ul>

    </div>
  )
}

