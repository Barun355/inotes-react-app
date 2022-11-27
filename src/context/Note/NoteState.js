import NoteContext from "./NoteContext";
import { useState } from "react";

const NoteState = (props) => {

    const currentNote = [
        {
            "_id": "63832ef98509528629c8f532",
            "user": "63832ea28509528629c8f52e",
            "title": "My title",
            "desc": "The description",
            "tag": "personal",
            "date": "2022-11-27T09:33:45.941Z",
            "__v": 0
        },
        {
            "_id": "63832f0c8509528629c8f534",
            "user": "63832ea28509528629c8f52e",
            "title": "My title",
            "desc": "The description",
            "tag": "personal",
            "date": "2022-11-27T09:34:04.272Z",
            "__v": 0
        },
        {
            "_id": "63832f0c8509528629c8f536",
            "user": "63832ea28509528629c8f52e",
            "title": "My title",
            "desc": "The description",
            "tag": "personal",
            "date": "2022-11-27T09:34:04.429Z",
            "__v": 0
        },
        {
            "_id": "63832f0c8509528629c8f538",
            "user": "63832ea28509528629c8f52e",
            "title": "My title",
            "desc": "The description",
            "tag": "personal",
            "date": "2022-11-27T09:34:04.639Z",
            "__v": 0
        },
        {
            "_id": "63832f0c8509528629c8f53a",
            "user": "63832ea28509528629c8f52e",
            "title": "My title",
            "desc": "The description",
            "tag": "personal",
            "date": "2022-11-27T09:34:04.775Z",
            "__v": 0
        },
        {
            "_id": "63832f0d8509528629c8f53c",
            "user": "63832ea28509528629c8f52e",
            "title": "My title",
            "desc": "The description",
            "tag": "personal",
            "date": "2022-11-27T09:34:05.040Z",
            "__v": 0
        },
        {
            "_id": "63832f0d8509528629c8f53e",
            "user": "63832ea28509528629c8f52e",
            "title": "My title",
            "desc": "The description",
            "tag": "personal",
            "date": "2022-11-27T09:34:05.337Z",
            "__v": 0
        },
        {
            "_id": "63832f0d8509528629c8f540",
            "user": "63832ea28509528629c8f52e",
            "title": "My title",
            "desc": "The description",
            "tag": "personal",
            "date": "2022-11-27T09:34:05.447Z",
            "__v": 0
        },
        {
            "_id": "63832f0d8509528629c8f542",
            "user": "63832ea28509528629c8f52e",
            "title": "My title",
            "desc": "The description",
            "tag": "personal",
            "date": "2022-11-27T09:34:05.768Z",
            "__v": 0
        }
    ];


    const [finalNote, setFinalNote] = useState(currentNote);

    // Add Note

    // Delete Note

    //Update Note
    return (
        <NoteContext.Provider value={{finalNote}}>
            {props.children}
        </NoteContext.Provider>
    );

};

export default NoteState;