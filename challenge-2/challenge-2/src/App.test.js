import { render, screen, getByLabelText, getAllByLabelText, getByPlaceholderText,fireEvent, getByText } from '@testing-library/react';
import App from './App';

const build = () => {
  const {container, debug} = render(<App/>)

  return {
    container,
    debug,
    navSearchBar: () => getByLabelText(container, "Search by text"),
    notesContainer: () => getAllByLabelText(container, "Notes grid"),
    noNotesMessage: () => getByText(container, "There are no notes, please create a new one using the creation note input")
  }
}
describe("Display content inside <App/> data", () => {

  it('Renders Navbar and updates text value', () => {
    const {navSearchBar} = build()

    expect(navSearchBar()).toHaveDisplayValue("")
    fireEvent.change( navSearchBar(), {target: {value: "Groceries"}})
    expect(navSearchBar()).toHaveDisplayValue("Groceries")

  });

  it('Renders notes and an error message if no notes exist yet', () => {
    const {noNotesMessage} = build()
    expect(noNotesMessage()).toBeInTheDocument()

  });


})
