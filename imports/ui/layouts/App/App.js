import React from 'react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Roles } from 'meteor/alanning:roles';
import { Bert } from 'meteor/themeteorchef:bert';

import '../../stylesheets/app.less';

//import BulletProof from "../../components/Shared/RouteComponents/BulletProof";

import Index from '../../pages/Index/Index';
import Login from '../../pages/Login/Login';
import Logout from '../../pages/Logout/Logout';
import RecoverPassword from '../../pages/RecoverPassword/RecoverPassword';
import ResetPassword from '../../pages/ResetPassword/ResetPassword';
import NotFound from '../../pages/NotFound/NotFound';
import UserEnums from '../../../api/Users/enums';
import Navigation from '../../components/Navigation'
import getUserName from '../../../modules/get-user-name'
// import GDPRConsentModal from '../../Components/GDPRConsentModal/GDPRConsentModal'

const userRoles = UserEnums.USER_ROLE_ENUM;


const App = props => (
		<Router>
		  {!props.loading
				  ?
				  <div className="App">

					{props.authenticated && (
							<VerifyEmailAlert
									userId={props.userId}
									emailVerified={props.emailVerified}
									emailAddress={props.emailAddress}
							/>
					)}

					{/*{props.authenticated && <GDPRConsentModal userId={props.userId} />}*/}

					<Navigation {...props} />

					<Switch>
					  <Route exact
							 name="index"
							 path="/"
							 render={() => (
									 <Index />
							 )}/>

					  {/* redirect client to their dashboard when navigating to index */}
					  {/*<Route exact
                            name="index"
                            path="/"
                            render={() => (
                                props.authenticated ? (
                                    <Redirect to="/dashboard"/>
                                ) : (
                                    <Index />
                                )
                            )}/>*/}


					  {/*   bulletproof example   */}
					  {/*
					  <BulletProof exact
								   path="/job-postings"
								   component={JobPostings}
								   rolesAllowed={[userRoles.companyAdmin, userRoles.employee, userRoles.admin]}
								   checkAuthorization={true}
								   checkTargetUserVerification={false}
								   isEditingProfile={false}
								   {...props} />
					*/}

					  <Route path="/login" component={Login} {...props} />
					  <Route path="/logout" component={Logout} {...props} />
					  <Route name="recover-password" path="/recover-password" component={RecoverPassword} />
					  <Route name="reset-password" path="/reset-password/:token" component={ResetPassword} />
					  {/*<Route name="verify-email" path="/verify-email/:token" component={VerifyEmail} {...props} />*/}

					  <Route component={NotFound} />
					</Switch>
				  </div>
				  :
				  ''
		  }
		</Router>
);


App.defaultProps = {
  userId: '',
  emailAddress: '',
};

App.propTypes = {
  loading: PropTypes.bool.isRequired,
  userId: PropTypes.string,
  emailAddress: PropTypes.string,
  emailVerified: PropTypes.bool.isRequired,
  authenticated: PropTypes.bool.isRequired,
};

export default withTracker(() => {
  const loggingIn = Meteor.loggingIn();
  const user = Meteor.user();
  const userId = Meteor.userId();
  const loading = !Roles.subscription.ready();
  const name = user && user.profile && user.profile.name && getUserName(user.profile.name);
  const emailAddress = user && user.emails && user.emails[0].address;

  return {
	loading,
	loggingIn,
	authenticated: !loggingIn && !!userId,
	name: name || emailAddress,
	roles: !loading && Roles.getRolesForUser(userId),
	userId,
	emailAddress,
	emailVerified: user && user.emails ? user && user.emails && user.emails[0].verified : true,
  };
})(App);