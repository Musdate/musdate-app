import { AuthProvider } from "./contexts/AuthContext"
import ResetPassword from './components/ResetPassword';
import PrivateRoute from './components/PrivateRoute';
import Layout from './components/Layout';
import Login from './components/Login';
import Main from './components/Main';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import UpdateProfile from './components/UpdateProfile';

function App() {

    return (
        <Router>
            <AuthProvider>
                <Switch>
                    <PrivateRoute path='/update-profile' component={UpdateProfile} />
                    <Route path='/login' component={Login} />
                    <Route path='/reset-password' component={ResetPassword} />
                </Switch>
                <Switch>
                    <Layout>
                        <PrivateRoute exact path='/' component={Main} />
                    </Layout>
                </Switch>
            </AuthProvider>
        </Router>
    );
}

export default App;