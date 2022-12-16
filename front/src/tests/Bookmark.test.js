import { getByTestId, render, screen } from '@testing-library/react'
import {BrowserRouter as Router} from 'react-router-dom'
import BookmarkDialog from '../components/BookmarkDialog'

test("Checks if BookmarkDialog button has correct label", async () => {
    render(
        <Router>
            <BookmarkDialog />
        </Router>
    )

   
    expect(screen.getByTestId('addButton')).toHaveTextContent('Add')
    expect(screen.getByTestId('addButton')).toHaveClass('MuiButton-outlined')
})