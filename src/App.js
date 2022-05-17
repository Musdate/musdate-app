import { AuthProvider } from "./contexts/AuthContext"
import ResetPassword from './components/ResetPassword';
import UpdateProfile from './components/UpdateProfile';
import PrivateRoute from './components/PrivateRoute';
import PageNotFound from "./components/PageNotFound";
import ProductView from "./components/MangaDetail/index";
import Chapter from "./components/Chapter";
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
                    <Route path='/login' component={Login} />
                    <Route path='/password/reset' component={ResetPassword} />
                    <PrivateRoute path='/profile/update' component={UpdateProfile} />
                    <PrivateRoute exact path='/' component={Main} />
                    <PrivateRoute exact path='/:category/:productId' component={ProductView} />
                    <PrivateRoute exact path='/:category/:chapId/:scanId/page=:chapIndex' component={Chapter} />
                    <Route component={PageNotFound} />
                </Switch>
            </AuthProvider>
        </Router>
    );
}

export default App;