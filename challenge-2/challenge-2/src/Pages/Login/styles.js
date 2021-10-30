import styled from 'styled-components'

export const LoginContainer = styled.div`
  margin: 100px auto;
  width: 375px;
  box-shadow: 4px 2px 8px black;
  color: black;
  background: rgba(255, 255, 255, 1);
  border-radius: 4px;
  min-height: 350px;
  padding: 10px;
  box-sizing: border-box;
  position: relative;
`
export const Title = styled.h2`
  text-align: center;
`;

export const Form = styled.form`
  display: grid;
  font-weight: bold;
`;

export const Input = styled.input`
  border-radius: 8px;
  margin: 4px 0 10px 0;
`

export const Button = styled.input`
  border-radius: 10px;
  margin: 14px 0 10px 0;
  padding: 4px;
  box-sizing: border-box;
  background: #d43f66;
  color: white;
  font-weight: bold;
  border: none;
  box-shadow: 4px 2px 8px black;
  position: absolute;
  bottom: 14px;
  width: 94%;
  font-size: 18px;
`

export const Line = styled.hr`
    color: #d43f66;
    margin: 17px 0;
`
export const Error = styled.h3`
    color: #d43f66;
    transition: 0.2s;
`