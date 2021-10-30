import React, {useState, useContext, useEffect} from 'react';
import {DispatchContext, StateContext} from "../../components/App/App.component";
import { v4 as uuidv4 } from 'uuid';
import NoteGrid from "../../components/NoteGrid";
import {useHistory} from "react-router-dom";
import {
    NoteEditorContainer,
    NoteContainer,
    NoteTitle,
    NoteText,
    ButtonContainer,
    ColorPicker,
    CreateButton,
    Title
} from "./styles";

const NoteEditor = (props) => {

    const [ title, setTitle ] = useState("")
    const [ content, setContent ] = useState("")
    const [ color, setColor ] = useState("#ffffff")

    const dispatch = useContext(DispatchContext)
    const {isLoggedIn} = useContext(StateContext)
    const history = useHistory();

    useEffect(() => {
        if(!isLoggedIn){
            history.push('/login')
        }
    }, [])


    const createNote = () => {
        dispatch({type: "CREATE_NOTE", value: {color, content, title, id:uuidv4(), isArchived: false}})
        setColor("#ffffff")
        setContent("")
        setTitle("")
    }
    return(
        <NoteEditorContainer>
            <Title> New Note </Title>
            <NoteContainer color={color}>
                <NoteTitle type={"text"} value={title} onChange={({target}) => setTitle(target.value)} placeholder={"Title"}/>
                <NoteText value={content}  onChange={({target}) => setContent(target.value)} placeholder={"Start Typing..."}/>
                <ButtonContainer>
                    <ColorPicker value={color} onChange={({target}) => setColor(target.value)} type="color"/>
                    <CreateButton disabled={title === "" || content === ""} onClick={() => {createNote()}}>Create</CreateButton>
                </ButtonContainer>
            </NoteContainer>
        </NoteEditorContainer>
    )
}

const NotesComponent = (props) => {

    const {notes, searchParameter} = useContext(StateContext)
    const [errorMessage, setErrorMessage] = useState("No notes have been created")
    const [foundNotes, setFoundNotes] = useState(notes)

    useEffect(() => {

        let filteredNotes = notes.filter((note) => note.title.includes(searchParameter) || note.content.includes(searchParameter))
        if (notes.length === 0 ){
            setErrorMessage("No notes have been created")
        }
        else if (notes.length !== 0 && filteredNotes.length === 0){
            setErrorMessage("No notes found with those parameters")
        }
        setFoundNotes(filteredNotes)
    }, [searchParameter, notes])


    return (
        <div>
            <NoteEditor/>
            <NoteGrid notes={foundNotes} errorMessage={errorMessage}/>
        </div>
    )
}


export default  NotesComponent