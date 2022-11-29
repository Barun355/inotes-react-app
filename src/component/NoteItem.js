import React, { useContext, useState, useEffect } from 'react'
import noteContext from '../context/Note/NoteContext'

function NoteItem() {
    const [note, setNote] = useState({ id: "", title: "", desc: "", tag: "" })

    const notesContext = useContext(noteContext);
    const { finalNote, fetchNotes, deleteNote, updateNote } = notesContext;
    const [closeModal, setCloseModal] = useState("hidden");

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }

    useEffect(() => {
        fetchNotes();
    }, [])

    return (
        <>
            <div className={`absolute w-full h-full top-0 flex flex-col justify-center items-center  ${closeModal}`}>
                <div className="relative top-0 w-full h-full bg-gray-400 opacity-60" onClick={() => { setCloseModal("hidden") }}></div>
                <div className="container absolute top-10 w-[90%] md:w-[70%] bg-white p-10 rounded-3xl">
                    <div className="mb-6">
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
                        <input type="title" name="title" id="title" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none" onChange={onChange} value={note.title} required />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                        <input type="text" name="desc" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none" onChange={onChange} value={note.desc} required />
                    </div>
                    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={() => { updateNote(note.id, note.title, note.desc, note.tag); setCloseModal("hidden") }}>Update Note</button>
                    <button type="submit" className="ml-1 text-white bg-gray-500 focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={() => { setCloseModal("hidden") }}>Close</button>
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 m-2 p-2">
                {finalNote && finalNote.map((note) => {
                    return <div className="max-w-sm rounded overflow-hidden shadow-lg" key={note._id}>
                        <div className="px-6 py-4">
                            <div className="font-bold text-xl mb-2">{note.title}</div>
                            <p className="text-gray-700 text-base">
                                {note.desc}
                            </p>
                        </div>
                        <div className="px-6 pt-4 pb-2 space-x-2">
                            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#Default</span>
                            <i className="fa-solid fa-trash-can" onClick={() => { deleteNote(note._id) }}></i>
                            <i className="fa-regular fa-pen-to-square" onClick={() => { setNote({ id: note._id, title: note.title, desc: note.desc, tag: note.tag }); setCloseModal("block") }}> </i>
                        </div>
                    </div>
                })
                }
                {finalNote.length === 0 &&
                    <div className="bg-green-100 w-[95vw] border-l-4 border-green-500 text-green-700 p-4" role="alert">
                        <p className="font-bold">Add a Note</p>
                        <p>No notes to Display</p>
                    </div>
                }
            </div>
        </>
    )
}

export default NoteItem
