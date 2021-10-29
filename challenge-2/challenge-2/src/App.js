import React, {useReducer, createContext} from 'react'
import NavBar from  "./components/Navbar"
import NotesComponent from "./Pages/Notes"
import ArchiveComponent from "./Pages/Archive"
import {
    BrowserRouter,
    Switch,
    Route,
    Link
} from "react-router-dom";

export function reducer(state, action) {
    switch(action.type){
        case 'CREATE_NOTE': {
            const currentStorage = JSON.parse(window.sessionStorage.getItem("notes")) || []
            window.sessionStorage.setItem("notes", JSON.stringify(currentStorage.concat(action.value)))

            return {
                ...state,
                notes: [
                    ...state.notes,
                    action.value
                ]
            }
        }
        case 'ARCHIVE_NOTE': {
            const currentArchivedStorage = JSON.parse(window.sessionStorage.getItem("archivedNotes")) || []
            const filteredNotes = state.notes.filter((note) => note.id !== action.value.id)

            window.sessionStorage.setItem("archivedNotes", JSON.stringify(currentArchivedStorage.concat(action.value)))
            window.sessionStorage.setItem("notes", JSON.stringify(filteredNotes))

            return {
                ...state,
                notes: filteredNotes,
                archivedNotes: [
                    ...state.archivedNotes,
                    action.value
                ]
            }
        }
        case 'RESTORE_NOTE': {
            const currentStorage = JSON.parse(window.sessionStorage.getItem("notes")) || []
            const filteredNotes = state.archivedNotes.filter((note) => note.id !== action.value.id)

            window.sessionStorage.setItem("notes", JSON.stringify(currentStorage.concat(action.value)))
            window.sessionStorage.setItem("archivedNotes", JSON.stringify(filteredNotes))

            return {
                ...state,
                archivedNotes: filteredNotes,
                notes: [
                    ...state.notes,
                    action.value
                ]
            }
        }
        case 'EDIT_NOTE': {
            const otherNotes = state.notes.filter((note) => note.id !== action.value.id)
            window.sessionStorage.setItem("notes", JSON.stringify(otherNotes.concat(action.value)))

            return {
                ...state,
                notes: [
                    ...otherNotes,
                    action.value
                ]
            }
        }
        case 'FIND_NOTES': {
            return {
                ...state,
                searchParameter: action.value
            }
        }
        case 'ADD_FAVORITES': {
            let storedIds = JSON.parse(window.sessionStorage.getItem('favoriteVideos'))
            storedIds = [...storedIds, action.value]
            window.sessionStorage.setItem("favoriteVideos", JSON.stringify(storedIds))

            return {
                ...state,
                favoriteIds: [
                    ...state.favoriteIds,
                    action.value
                ]
            }
        }
        default:
            break
    }

    return state
}


const initialState = {
    notes: JSON.parse(window.sessionStorage.getItem("notes")) || [],
    archivedNotes: JSON.parse(window.sessionStorage.getItem("archivedNotes")) || [],
    searchParameter: "",
    loggedIn: true,
    userId: 123
}

export const StateContext = createContext()
export const DispatchContext = createContext()


function App() {
    const [state, dispatch] = useReducer(reducer, initialState)

    return (
        <DispatchContext.Provider value={dispatch}>
            <StateContext.Provider value={state}>
                <BrowserRouter>
                    <div>
                        <nav>
                            <ul>
                                <li>
                                    <Link to={"/"}>NOTES</Link>
                                </li>
                                <li>
                                    <Link to={"/archived"}>ARCHIVED</Link>
                                </li>
                                <li>
                                    <Link to={"/login"}>LOGIN</Link>
                                </li>
                                <li>
                                    <Link to={"/logout"}>LOGOUT</Link>
                                </li>
                            </ul>
                        </nav>
                    </div>
                    <Switch>
                        <Route path={"/archived"}>
                            <ArchiveComponent/>
                        </Route>
                        <Route path={"/"}>
                            <NavBar/>
                            <NotesComponent/>
                        </Route>
                    </Switch>
                </BrowserRouter>
            </StateContext.Provider>
        </DispatchContext.Provider>
      );
}

export default App;
