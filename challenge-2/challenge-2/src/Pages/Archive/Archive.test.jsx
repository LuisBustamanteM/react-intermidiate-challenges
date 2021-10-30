import React, {useReducer} from 'react'
import { render, getByRole, getByText } from '@testing-library/react';
import { renderHook, act } from '@testing-library/react-hooks'
import Archive from './Archive.component';
import {StateContext, DispatchContext, initialState, reducer} from "../../components/App/App.component";
import {BrowserRouter} from "react-router-dom";

const build = () => {
    const {result} = renderHook(() => useReducer(reducer, initialState))
    const [state, dispatch ] = result.current

    const {container, debug} = render (
        <DispatchContext.Provider value={dispatch}>
            <StateContext.Provider value={state}>
                <BrowserRouter>
                    <Archive />
                </BrowserRouter>
            </StateContext.Provider>
        </DispatchContext.Provider>
    )

    return {
        container,
        debug,
        state,
        dispatch,
        title: () => getByText(container, "Archived Content"),
        noteGrid: () => getByRole(container, "noteslist"),
        errorMessage: () => getByText(container, "No notes have been archived"),
    }
}
describe("<Archive/> Testing", () => {

    it('Displays error value on empty <Archive/> ', async () => {
        const {title, noteGrid, errorMessage} = build()
        expect(title())
        expect(noteGrid())
        expect(errorMessage())
    });

    it('Updates <Archive/> data', async () => {
        const { state, dispatch} = build()

        act(() => {
            dispatch({type: "CREATE_NOTE", value:{id: "2", title: "title", content: "content"}})
            console.log(state)
        })



    });
})
