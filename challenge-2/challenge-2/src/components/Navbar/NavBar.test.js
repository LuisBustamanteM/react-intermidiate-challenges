import React, {useReducer} from 'react'
import { render, getByRole, getByText, fireEvent, waitFor, act } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks'
import NavBar from './NavBar.component';
import {StateContext, DispatchContext, initialState, reducer} from "../App/App.component";

const build = () => {
    const {result} = renderHook(() => useReducer(reducer, initialState))
    const [state, dispatch ] = result.current

    const {container, debug} = render (
        <DispatchContext.Provider value={dispatch}>
            <StateContext.Provider value={state}>
                <NavBar/>
            </StateContext.Provider>
        </DispatchContext.Provider>
        )

    return {
        container,
        debug,
        state,
        dispatch,
        searchBar: () => getByRole(container, "textbox")
    }
}
describe("Display content inside <NavBar/>", () => {

    it('Updates NavBar Value', async () => {
        const {searchBar, container, state, dispatch} = build()
        expect(searchBar())
        await act(async () => {
            await waitFor(() => {
                fireEvent.change(searchBar(), {target: {value: 'CARDS'}})
                expect(searchBar().value).toBe("CARDS")
                dispatch({type: "FIND_NOTES", value: "123"})
            })
        })
    });
})
