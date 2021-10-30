import React, {useState, useContext} from 'react'

import {DispatchContext} from "../App/App.component";
import {NoteContainer, NoteTitle, NoteText, ButtonContainer, ColorPicker, CreateButton} from "./styles";

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
        <NoteContainer color={color} role={"note"}>
            <NoteTitle type={"text"} value={title} onChange={({target}) => setTitle(target.value)} placeholder={"Title"} disabled={props.isArchived}/>
            <NoteText value={content}  onChange={({target}) => setContent(target.value)} placeholder={"Start Typing..."} disabled={props.isArchived}/>
            <ButtonContainer>
                <ColorPicker role={"colorpicker"} value={color} onChange={({target}) => setColor(target.value)} type="color" disabled={props.isArchived}/>
                <CreateButton onClick={() => {moveNote()}}>{props.isArchived ? "Restore" : "Archive"} Note</CreateButton>
                {!props.isArchived && <CreateButton onClick={() => {editNote()}}>Edit Note</CreateButton>}
            </ButtonContainer>
        </NoteContainer>
    )
}

export default NoteComponent