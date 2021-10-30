import React, {useState} from 'react'
import {Link} from "react-router-dom";

import {BurgerContainer, BurgerTile, List, ListItem, SideMenuContainer, SideNav} from "./styles";

const SideMenuComponent = (props) => {
    const [display, setDisplay] = useState(false);

    return (
        <SideMenuContainer>
            <BurgerContainer onClick={() => setDisplay(!display)} role={"showmenu"}>
                <BurgerTile></BurgerTile>
                <BurgerTile></BurgerTile>
                <BurgerTile></BurgerTile>
            </BurgerContainer>
            { display &&
            <SideNav>
                <List>
                    <ListItem>
                        <Link to={"/"}>Notes</Link>
                    </ListItem>
                    <ListItem>
                        <Link to={"/archived"}>Archived</Link>
                    </ListItem>
                    <ListItem>
                        <Link to={"/logout"}>Logout</Link>
                    </ListItem>
                </List>
            </SideNav>
            }
        </SideMenuContainer>
        )
}

export default SideMenuComponent