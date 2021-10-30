import styled from 'styled-components'

export const NoteContainer = styled.div`
  margin: 18px auto;
  display: grid;
  border: none;
  flex-grow: 1;
  background: ${(props) => props.color};
  padding: 8px;
  box-sizing: border-box;
  box-shadow: 4px 4px 2px rgba(0,0,0, 0.8);
`

export const NoteTitle = styled.input`
  background: transparent;
  color: blue; 
  border: none;
  margin: 10px 0;
  font-size: 24px;
  ::placeholder {
    color: blue;
  }
  &:focus-visible{
    outline: none;
    border: none
  }
  &:focus{
    outline: none;
    border: none
  }
`

export const NoteText = styled.textarea`
  background: transparent;
  color: blue; 
  border: none;
  resize: none;
  ::placeholder {
    color: blue;
  }
  &:focus-visible{
    outline: none;
    border: none
  }
  &:focus{
    outline: none;
    border: none
  }
`
export const ButtonContainer = styled.div`
  position: relative;
  align-items: center;
  flex-wrap: wrap; 
  min-height: 24px;
`

export const ColorPicker = styled.input` 
    width: 25px;
    height: 25px;
    left: 2px;
    bottom: 0;
    border: none;
    box-shadow: 2px 2px 2px rgba(0,0,0, 0.8);
    border-radius: 2px;
    flex-grow: 1;
    margin: 0 10px;
`

export const CreateButton = styled.button`
  width: 100px;
  color: black;
  font-weight: bold;
  flex-grow: 1;
  right: 2px;
  border: none;
  border-radius: 12px;
  background: white;
  box-shadow: 2px 2px 2px rgba(0,0,0, 0.8);
  margin: 0 10px;
  :disabled{
    color: rgba(127,127,127,0.79);
  }
`

export const Title = styled.h2`
  text-align: center;
`