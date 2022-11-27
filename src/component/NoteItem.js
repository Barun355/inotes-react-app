import React, { useContext } from 'react'
import noteContext from '../context/Note/NoteContext'

function NoteItem() {
    const notes = useContext(noteContext);
    console.log(notes.finalNote);
    return (
        <>
            {/* {note.name} */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 m-2 p-2">
                {notes.finalNote && notes.finalNote.map((note) => {
                    return <div className="max-w-sm rounded overflow-hidden shadow-lg" key={note._id}>
                        <div className="px-6 py-4">
                            <div className="font-bold text-xl mb-2">{note.title}</div>
                            <p className="text-gray-700 text-base">
                                {note.desc}
                            </p>
                        </div>
                        <div className="px-6 pt-4 pb-2 space-x-2">
                            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#Default</span>
                            <i className="fa-solid fa-trash-can"></i>
                            <i className="fa-regular fa-pen-to-square"> </i>
                        </div>
                    </div>
                })
                }
                {notes.finalNote.length === 0 &&
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
