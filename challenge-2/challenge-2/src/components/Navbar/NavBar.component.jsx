import React, {useEffect, useContext, useState} from 'react'
import {DispatchContext} from "../App/App.component";
import {SearchBar, SearchBarContainer} from "./style";

const NavBarComponent = () => {
    const [text, setText] = useState("")
    const dispatch = useContext(DispatchContext)

    useEffect(() => {
        dispatch({type: "FIND_NOTES", value: text})
    }, [text])

    return(
        <SearchBarContainer>
            <SearchBar type={"text"} aria-label={"Search by text..."} placeholder={"Search by text"}  value={text} onChange={({target}) => setText(target.value)} />
        </SearchBarContainer>
    )
}

export default NavBarComponent