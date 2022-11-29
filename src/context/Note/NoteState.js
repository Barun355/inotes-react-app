import NoteContext from "./NoteContext";
import { useState } from "react";

const NoteState = (props) => {

    const host = "http://localhost:5000"

    const [finalNote, setFinalNote] = useState([]);
    
    // Fetch all Notes
    const fetchNotes = async () => {
        const url = host + "/api/notes/fetchallnotes";
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem("token"),
            },
        });
        const note = await response.json();
        // console.log(note)
        setFinalNote(note);
    }

    // Add Note
    const addNotes = async (title, description, tag) => {
        const addNoteBody = {
            "title": title,
            "description": description,
            "tag": tag
        }
        const url = host + "/api/notes/addnote";
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem("token")
            },
            body: JSON.stringify(addNoteBody)
        });
        
        const note = await response.json();
        if(note){
            fetchNotes();
        }
    }

    // Delete Note
    const deleteNote = async (id) => {
        const url = host + `/api/notes/deletenote/${id}`;
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem("token"),
            }
        });

        const deleteNote = await response.json();
        if(deleteNote){
            fetchNotes();
            return true
        }
        else{ return false }
    }
    //Update Note
    const updateNote = async (id, title, description, tag) => {
        const updateNoteBody = {
            "title": title,
            "description": description,
            "tag": tag
        }
        const url = host + `/api/notes/updatenote/${id}`;
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem("token"),
            },
            body: JSON.stringify(updateNoteBody)
        });
        
        const updateNote = await response.json();
        if(updateNote){
            fetchNotes();
            return true;
        }
        else{ return false}
    }

    return (
        <NoteContext.Provider value={{ finalNote, fetchNotes, addNotes, deleteNote, updateNote }}>
            {props.children}
        </NoteContext.Provider>
    );

};

export default NoteState;