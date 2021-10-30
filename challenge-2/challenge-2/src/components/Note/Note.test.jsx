import React, {useReducer} from 'react'
import { render, getByRole, getByPlaceholderText, fireEvent, waitFor, act } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks'
import Note from './Note.component';
import {StateContext, DispatchContext, initialState, reducer} from "../App/App.component";

const build = () => {
    const {result} = renderHook(() => useReducer(reducer, initialState))
    const [state, dispatch ] = result.current

    const {container, debug} = render (
        <DispatchContext.Provider value={dispatch}>
            <StateContext.Provider value={state}>
                <Note color={"#2d2d2d"} content={""} title={""}/>
            </StateContext.Provider>
        </DispatchContext.Provider>
    )

    return {
        container,
        debug,
        state,
        dispatch,
        title: () => getByPlaceholderText(container, "Title"),
        content: () => getByPlaceholderText(container, "Start Typing..."),
        colorPicker: () => getByRole(container, "colorpicker"),
    }
}
describe("Display content inside <Note/>", () => {

    it('Updates <Note/> Value', async () => {
        const {title, content, colorPicker } = build()
        const sampleData = {
            title: "Test Title",
            content: "Content ...",
            color: "#2d2d2d"
        }
        await act(async () => {
            await waitFor(() => {
                fireEvent.change(title(), {target: {value: sampleData.title}})
                fireEvent.change(content(), {target: {value: sampleData.content}})
                fireEvent.change(colorPicker(), {target: {value: sampleData.color}})

                expect(title().value).toBe(sampleData.title)
                expect(content().value).toBe(sampleData.content)
                expect(colorPicker().value).toBe(sampleData.color)
            })
        })
    });
})
