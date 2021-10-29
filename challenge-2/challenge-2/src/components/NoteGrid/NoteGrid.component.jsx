import React from 'react'
import Note from '../Note'

const NoteGrid = (props) => {

    return (
        <div>
            <h2>Note Grid</h2>
            { props.notes &&
            props.notes.length > 0 &&
            props.notes.map((note) => (
                <Note key={note.id}
                      id={note.id}
                      title={note.title}
                      content={note.content}
                      color={note.color}
                      isArchived={note.isArchived}/>
            ))}
        </div>
    )
}

export default NoteGrid