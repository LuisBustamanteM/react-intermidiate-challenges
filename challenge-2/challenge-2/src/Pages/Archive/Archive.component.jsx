import React, {useContext, useEffect} from 'react';
import NoteGrid from "../../components/NoteGrid";
import {StateContext} from "../../components/App/App.component";
import {useHistory} from "react-router-dom";
import {Title} from './styles'

const ArchiveComponent = (props) => {
    const {archivedNotes, isLoggedIn} = useContext(StateContext)
    const history = useHistory();

    useEffect(() => {
        if(!isLoggedIn){
            history.push('/login')
        }
    }, [])

    return (
        <div>
            <Title>Archived Content</Title>
            <NoteGrid notes={archivedNotes} errorMessage={"No notes have been archived"}/>
        </div>
    )
}


export default  ArchiveComponent