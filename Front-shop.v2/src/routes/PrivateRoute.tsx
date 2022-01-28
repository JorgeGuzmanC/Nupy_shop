
import { Route, Redirect } from 'react-router-dom';
import { authenticationService } from '@service/services/Authentication.service';
import {  ROUTE_HOME,  ROUTE_LOGIN } from '@toolbox/constants/route-map';

export const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => {
        const currentUser = authenticationService.currentUserValue;
        const authCookie  = authenticationService.authCookie();
        console.log(authCookie)
        if (!currentUser || !authCookie) {
            return <Redirect to={{ pathname: ROUTE_LOGIN, state: { from: props.location } }} />
        }
        return <Component {...props} />
    }} />
)
export const AuthRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => {
        const currentUser = authenticationService.currentUserValue;
        const authCookie  = authenticationService.authCookie();
      console.log(authCookie)
        if (currentUser && authCookie) {
            return <Redirect to={{ pathname: ROUTE_HOME, state: { from: props.location } }} />
        }
        return <Component {...props} />
    }} />
)
