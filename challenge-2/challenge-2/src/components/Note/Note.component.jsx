import React, {useState, useContext} from 'react'

import {DispatchContext} from "../../App";

const NoteComponent = (props) => {

    const [ title, setTitle ] = useState(props.title)
    const [ content, setContent ] = useState(props.content)
    const [ color, setColor ] = useState(props.color)

    const dispatch = useContext(DispatchContext)

    const moveNote = () => {
        if (props.isArchived) {
            dispatch({type: "RESTORE_NOTE", value: {
                    color: props.color,
                    content: props.content,
                    title: props.title,
                    id: props.id,
                    isArchived: false
                }})
        } else {
            dispatch({type: "ARCHIVE_NOTE", value: {
                    color: props.color,
                    content: props.content,
                    title: props.title,
                    id: props.id,
                    isArchived: true
                }})
        }
    }

    const editNote = () => {
        dispatch({type: "EDIT_NOTE", value: {
                color,
                content,
                title,
                id: props.id,
                isArchived: false
            }})
    }

    return (
        <div>
            <h2>Note</h2>
            <input value={color} onChange={({target}) => setColor(target.value)} type="color" disabled={props.isArchived}/>
            <input type={"text"} value={title} onChange={({target}) => setTitle(target.value)} placeholder={"Title"} disabled={props.isArchived}/>
            <textarea value={content}  onChange={({target}) => setContent(target.value)} placeholder={"Start Typing..."} disabled={props.isArchived}/>
            <button onClick={() => {moveNote()}}>{props.isArchived ? "Restore" : "Archive"} Note</button>
            {!props.isArchived && <button onClick={() => {editNote()}}>Edit Note</button>}
            <p>{color}</p>
        </div>
    )
}

export default NoteComponent