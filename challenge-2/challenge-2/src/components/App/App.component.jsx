import React, {useReducer, createContext} from 'react'
import NavBar from "../Navbar"
import NotesComponent from "../../Pages/Notes"
import ArchiveComponent from "../../Pages/Archive"
import LoginComponent from "../../Pages/Login";
import LogoutComponent from "../../Pages/Logout"
import {StyledApp} from './styles'

import {
    BrowserRouter,
    Switch,
    Route,
    Link, useHistory
} from "react-router-dom";
import SideMenuComponent from "../SideMenu";

export function reducer(state, action) {
    switch (action.type) {
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
            console.log("FIND NOTES", {action})
            return {
                ...state,
                searchParameter: action.value
            }
        }
        case 'LOGIN': {
            window.sessionStorage.setItem("isLoggedIn", "true")
            window.sessionStorage.setItem("userData", JSON.stringify(action.value))
            return {
                ...state,
                isLoggedIn: true,
                userData: action.value
            }
        }
        case "LOGOUT": {
            window.sessionStorage.removeItem("isLoggedIn")
            window.sessionStorage.removeItem("userData")
            return {
                ...state,
                isLoggedIn: false,
                userData: {}
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

export const initialState = {
    notes: JSON.parse(window.sessionStorage.getItem("notes")) || [],
    archivedNotes: JSON.parse(window.sessionStorage.getItem("archivedNotes")) || [],
    searchParameter: "",
    isLoggedIn: !!window.sessionStorage.getItem("isLoggedIn"),
    userData: JSON.parse(window.sessionStorage.getItem("userData")) || {},
}

export const StateContext = createContext()
export const DispatchContext = createContext()

function AppComponent() {
    const [state, dispatch] = useReducer(reducer, initialState)

    return (
        <BrowserRouter>
            <DispatchContext.Provider value={dispatch}>
                <StateContext.Provider value={state}>
                    <StyledApp>
                        {state.isLoggedIn && <SideMenuComponent/>}
                        <Switch>
                            <Route path={"/archived"}>
                                <ArchiveComponent/>
                            </Route>
                            <Route path={"/login"}>
                                <LoginComponent/>
                            </Route>
                            <Route path={"/logout"}>
                                <LogoutComponent/>
                            </Route>
                            <Route path={"/"}>
                                <NavBar/>
                                <NotesComponent/>
                            </Route>

                        </Switch>
                    </StyledApp>
                </StateContext.Provider>
            </DispatchContext.Provider>
        </BrowserRouter>
    );
}

export default AppComponent;
