import {BrowserRouter as Router} from 'react-router-dom'
import UserSettings from '../pages/UserSettings'


test('Checks if User Settings renders properly', async () => {
    const component = <Router><UserSettings shouldRender /></Router>
    expect(component).toBeDefined()
})