import React, {useEffect, useContext, useState} from 'react'
import {StateContext, DispatchContext} from "../../App";

const NavBarComponent = () => {
    const [text, setText] = useState("")
    const dispatch = useContext(DispatchContext)

    useEffect(() => {
        dispatch({type: "FIND_NOTES", value: text})
    }, [text])

    return(
        <div>
            <input type={"text"} aria-label={"Search by text"} placeholder={"Search by text"}  value={text} onChange={({target}) => setText(target.value)} />
        </div>
    )
}

export default NavBarComponent