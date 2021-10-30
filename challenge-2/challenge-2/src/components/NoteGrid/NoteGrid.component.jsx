import React from 'react'
import Note from '../Note'
import {NotesGrid, ErrorMessage} from "./styles";

const NoteGrid = (props) => {

    return (
        <NotesGrid role={"noteslist"}>
            { (props.notes && props.notes.length > 0) ?
            props.notes.map((note) => (
                <Note key={note.id}
                      id={note.id}
                      title={note.title}
                      content={note.content}
                      color={note.color}
                      isArchived={note.isArchived}/>
            ))
            :
                <ErrorMessage>{props.errorMessage}</ErrorMessage>
            }
        </NotesGrid>
    )
}

export default NoteGrid