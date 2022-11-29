import Notes from "./Notes";
import AddNote from "./AddNote";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function Home() {
    const navigate = useNavigate()
    useEffect(()=>{
        if(!localStorage.getItem('token')){
            navigate('/login');
        }
    },[]);
    
    return (
        <>
            <AddNote />
            <Notes />
        </>
    )
}

export default Home
