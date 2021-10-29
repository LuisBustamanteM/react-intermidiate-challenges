import React, {useContext} from 'react';
import NoteGrid from "../../components/NoteGrid";
import {StateContext} from "../../App";


const ArchiveComponent = (props) => {

    const {archivedNotes} = useContext(StateContext)
    console.log(archivedNotes)
    return (
        <div>
            <h2>Archived Content</h2>
            <NoteGrid notes={archivedNotes}/>
        </div>
    )
}


export default  ArchiveComponent