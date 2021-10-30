import styled from 'styled-components'

export const SideMenuContainer = styled.div`
    color: white; 
    position: fixed;
    z-index: 3;
    margin: 0;
`
export const SideNav = styled.nav`
  height: 100vh;
  width: 200px;
  background: rgba(0,0,0,0.8);
  border-radius: 10px;
`

export const List = styled.ul`
  list-style: none;
  margin: 26px 5px;
  padding: 10px;
  box-sizing: border-box;
`

export const ListItem = styled.li`
  color: white;
  text-decoration: none;
  margin-bottom: 5px;
  font-weight: bold;
  height: 25px;
  transition: 0.2s;
  :hover{
    background: rgba(255, 255, 255, 0.5);
  }
  a{
      color: white;
      text-decoration: none;  
  }
`

export const BurgerContainer = styled.div`
  display: inline;
  position: relative;
  top: 15px;
  left: 15px;
  transition: 0.2s;
  :hover{
    cursor: pointer;   
    opacity: 0.8; 
  }
`

export const BurgerTile = styled.span`
    display: block;
    width: 33px;
    height: 4px;
    margin-bottom: 5px;
    position: relative;
    background: #cdcdcd;
    border-radius: 3px;
    z-index: 1;
    transform-origin: 4px 0px;
`