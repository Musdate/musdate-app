import { AuthProvider } from "./contexts/AuthContext"
import ResetPassword from './components/ResetPassword';
import UpdateProfile from './components/UpdateProfile';
import PrivateRoute from './components/PrivateRoute';
import Login from './components/Login';
import Main from './components/Main';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";

function App() {
    return (
        <Router>
            <AuthProvider>
                <Switch>
                    <PrivateRoute path='/update-profile' component={UpdateProfile} />
                    <Route path='/login' component={Login} />
                    <Route path='/reset-password' component={ResetPassword} />
                    <PrivateRoute exact path='/' component={Main} />
                </Switch>
            </AuthProvider>
        </Router>
    );
}

export default App;