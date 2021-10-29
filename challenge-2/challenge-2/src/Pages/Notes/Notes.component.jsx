import React, {useState, useContext, useEffect} from 'react';
import {DispatchContext, StateContext} from "../../App";
import { v4 as uuidv4 } from 'uuid';
import NoteGrid from "../../components/NoteGrid";

const NoteEditor = (props) => {

    const [ title, setTitle ] = useState("")
    const [ content, setContent ] = useState("")
    const [ color, setColor ] = useState("")

    const dispatch = useContext(DispatchContext)

    const createNote = () => {
        dispatch({type: "CREATE_NOTE", value: {color, content, title, id:uuidv4(), isArchived: false}})
    }
    return(
        <div>
            Note Editor
            <div>
                <input value={color} onChange={({target}) => setColor(target.value)} type="color"/>
                <input type={"text"} value={title} onChange={({target}) => setTitle(target.value)} placeholder={"Title"}/>
                <textarea value={content}  onChange={({target}) => setContent(target.value)} placeholder={"Start Typing..."}/>
                <button onClick={() => {createNote()}}>Create Note</button>
                <p>{color}</p>
            </div>
        </div>
    )
}

const NotesComponent = (props) => {

    const {notes, searchParameter} = useContext(StateContext)
    const [foundNotes, setFoundNotes] = useState(notes)

    useEffect(() => {

        let filteredNotes = notes.filter((note) => note.title.includes(searchParameter) || note.content.includes(searchParameter))
        setFoundNotes(filteredNotes)
    }, [searchParameter, notes])


    return (
        <div>
            <h2>Notes</h2>
            <NoteEditor/>
            <NoteGrid notes={foundNotes}/>
        </div>
    )
}


export default  NotesComponent