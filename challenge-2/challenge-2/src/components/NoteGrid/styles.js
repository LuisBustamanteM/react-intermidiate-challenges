import styled from 'styled-components'

export const NotesGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  margin: 10px 20px;
  
  @media screen and (max-width: 1500px) {
      grid-template-columns: 1fr 1fr 1fr ;
  }
  @media screen and (max-width: 1200px) {
    grid-template-columns: 1fr 1fr ;
  }
  
  @media screen and (max-width: 800px) {
      grid-template-columns: 1fr;
  }
`

export const ErrorMessage = styled.h2`
  text-align: center;
`