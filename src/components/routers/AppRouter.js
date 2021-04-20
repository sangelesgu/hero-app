import React, { useContext } from 'react';
import {
  BrowserRouter as Router,
  Switch,
} from 'react-router-dom';
import { LoginScreen } from '../login/LoginScreen';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoutes } from './PublicRoutes';
import {DashboardRoutes} from './DashboardRoutes';
import { AuthContext } from '../../auth/AuthContext';


export const AppRouter = () => {

   const { user } = useContext(AuthContext)
    return (
        
     <Router>
         <div> 
             <Switch>
                 <PublicRoutes exact path="/login" component={LoginScreen} isAuthenticated={user.logged} />

                 <PrivateRoute path="/" component={DashboardRoutes} isAuthenticated={user.logged} />
             </Switch>
         </div>
     </Router>
    )
}
