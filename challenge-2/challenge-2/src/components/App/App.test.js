import { render, getByRole, getByText } from '@testing-library/react';
import AppComponent from './App.component';

const build = () => {
    const {container, debug} = render(<AppComponent/>)

    return {
        container,
        debug,
        loginPage: () => getByRole(container, "heading", {level: 2})
    }
}
describe("Display content inside <AppComponent/>", () => {

    it('Renders login page on start', () => {
        const {loginPage} = build()
        expect(loginPage())
    });
})
