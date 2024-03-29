import React, { useContext, useState } from 'react'
import noteContext from '../context/Note/NoteContext'

function AddNote() {
    const [note, setNote] = useState({ title:"", desc: "",  tag: "" })
    
    const {addNotes} = useContext(noteContext);

    const onNoteChange = (e)=>{
       setNote({...note, [e.target.name] : e.target.value})
    }

    const handleClick = (e)=>{
        e.preventDefault();
        addNotes(note.title, note.desc, note.tag)
    };
    return (
        <div className="mx-[10%] space-y-2">
            <span className="text-4xl">Add Notes</span>
            <form onSubmit={handleClick}>
                <div className="mb-6">
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
                    <input type="title" name="title" id="title" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none" placeholder="Enter your Note Title" onChange={onNoteChange} required />
                </div>
                <div className="mb-6">
                    <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                    <input type="text" name="desc" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none" onChange={onNoteChange} required />
                </div>
                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add Note</button>
            </form>

        </div>
    )
}

export default AddNote

