import React, {useReducer} from 'react'
import { render, getByRole, fireEvent } from '@testing-library/react';
import { renderHook, act } from '@testing-library/react-hooks'
import SideMenu from './SideMenu.component';
import {StateContext, DispatchContext, initialState, reducer} from "../App/App.component";
import { BrowserRouter} from "react-router-dom";

const build = () => {
    const {result} = renderHook(() => useReducer(reducer, initialState))
    const [state, dispatch ] = result.current

    const {container, debug} = render (
        <DispatchContext.Provider value={dispatch}>
            <StateContext.Provider value={state}>
                <BrowserRouter>
                    <SideMenu/>
                </BrowserRouter>
            </StateContext.Provider>
        </DispatchContext.Provider>
    )

    return {
        container,
        debug,
        state,
        dispatch,
        burgerButton: () => getByRole(container, "showmenu"),
        sideNav: () => getByRole(container, "navigation"),
    }
}
describe("Displays behavior of  <SideMenu/>", () => {

    it('shows <SideNav/> on burgerbutton click', () => {
        const {burgerButton, sideNav } = build()
        expect(burgerButton())

        act(() => {
            fireEvent.click(burgerButton())
        })
        expect(sideNav())

    });
})
