import React, {useReducer} from 'react'
import { render, getByRole, getAllByRole } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks'
import NoteGrid from './NoteGrid.component';
import {StateContext, DispatchContext, initialState, reducer} from "../App/App.component";
import data from '../../mockData/mockNotes.json'

const build = (notes = []) => {
    const {result} = renderHook(() => useReducer(reducer, initialState))
    const [state, dispatch ] = result.current

    const {container, debug} = render (
        <DispatchContext.Provider value={dispatch}>
            <StateContext.Provider value={state}>
                <NoteGrid notes={notes} errorMessage={"Error Displaying Cards"}/>
            </StateContext.Provider>
        </DispatchContext.Provider>
    )

    return {
        container,
        debug,
        state,
        dispatch,
        errorMessage: () => getByRole(container, "heading", {level: 2}),
        notes: () => getAllByRole(container, "note"),
    }
}
describe("Display content inside <NoteGrid/>", () => {

    it('Returns an error message if NoteGrid is empty', async () => {
        const {errorMessage } = build()
        expect(errorMessage()).toHaveTextContent("Error Displaying Cards")
    });

    it('Returns a list of notes when pased notes to  <NoteGrid/>', async () => {
        const { notes } = build(data.notes)

        expect(notes()).toHaveLength(data.notes.length)
    });
})
