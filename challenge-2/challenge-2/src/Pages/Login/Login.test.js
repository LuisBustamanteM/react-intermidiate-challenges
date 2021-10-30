import React, {useReducer} from 'react'
import { render, getByRole, getByText, fireEvent, waitFor, act } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks'
import Login from './Login.component';
import {StateContext, DispatchContext, initialState, reducer} from "../../components/App/App.component";

const build = () => {
    const {result} = renderHook(() => useReducer(reducer, initialState))
    const [state, dispatch ] = result.current

    const {container, debug} = render (
        <DispatchContext.Provider value={dispatch}>
            <StateContext.Provider value={state}>
                <Login/>
            </StateContext.Provider>
        </DispatchContext.Provider>
    )

    return {
        container,
        debug,
        state,
        dispatch,
        userInput: () => getByRole(container, "textbox"),
        passwordInput: () => getByRole(container, "password")
    }
}
describe("Display content inside <Login/>", () => {

    it('Updates Login Values', async () => {
        const {userInput, passwordInput} = build()
        const sampleData = {
            username: "user",
            password: "password"
        }
        await act(async () => {
            await waitFor(() => {


                fireEvent.change(userInput(), {target: {value: sampleData.username}})
                expect(userInput().value).toBe(sampleData.username)

                fireEvent.change(passwordInput(), {target: {value: sampleData.password}})
                expect(passwordInput().value).toBe(sampleData.password)

            })
        })
    });
})
