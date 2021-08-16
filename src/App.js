import { AuthProvider } from "./contexts/AuthContext"
import ResetPassword from './components/ResetPassword';
import UpdateProfile from './components/UpdateProfile';
import PrivateRoute from './components/PrivateRoute';
import ProductView from "./components/ProductView";
import Login from './components/Login';
import Main from './components/Main';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import PageNotFound from "./components/PageNotFound";

function App() {
    return (
        <Router>
            <AuthProvider>
                <Switch>
                    <PrivateRoute path='/update-profile' component={UpdateProfile} />
                    <Route path='/login' component={Login} />
                    <Route path='/reset-password' component={ResetPassword} />
                    <PrivateRoute exact path='/' component={Main} />
                    <PrivateRoute path='/:category/:productId' component={ProductView} />
                    <Route component={PageNotFound} />
                </Switch>
            </AuthProvider>
        </Router>
    );
}

export default App;