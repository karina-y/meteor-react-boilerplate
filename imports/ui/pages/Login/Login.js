import React from 'react';
import { Row,
    Col,
    FormGroup,
    ControlLabel,
    Button,
    Grid } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';
// import OAuthLoginButtons from '../../components/OAuthLoginButtons/OAuthLoginButtons';

import validate from '../../../modules/validate';
import UserEnums from '../../../api/Users/enums';
// import checkUserActive from '../../../modules/server/user';
import './Login.less'
import WhiteBoxBody from '../../components/Shared/Wrappers/WhiteBoxBody'

const userRoles = UserEnums.USER_ROLE_ENUM;

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        const component = this;

        validate(component.form, {
            rules: {
                emailAddress: {
                    required: true,
                    email: true,
                },
                password: {
                    required: true,
                },
            },
            messages: {
                emailAddress: {
                    required: 'Need an email address here.',
                    email: 'Is this email address correct?',
                },
                password: {
                    required: 'Need a password here.',
                },
            },
            submitHandler() { component.handleSubmit(); },
        });
    }

    handleSubmit() {
        const { history } = this.props;
        const formattedEmail = s(this.emailAddress.value).trim().toLowerCase().value();

        Meteor.call('users.checkActive',formattedEmail, (error, result) => {
            if( error ){
                Bert.alert(error.reason, 'danger');
            }else {
                if( !result ) {
                    Bert.alert("We're Sorry, your account has been deactivated. Please contact TODOBOILER_appName for more information.", 'danger');
                } else {
                    Meteor.loginWithPassword(formattedEmail, this.password.value, (error) => {
                        if (error) {
                            Bert.alert(error.reason, 'danger');
                        } else {
                            Bert.alert('Welcome back!', 'success');
                            //const user = Meteor.user();
                            //if(Roles.userIsInRole(user, userRoles.candidate) || Roles.userIsInRole(user, userRoles.companyAdmin)) {
                                history.push('/dashboard');
                            //}
                            // } else if (Roles.userIsInRole(user, userRoles.employee)){
                            //     history.push('/finish-employee-signup');
                            // } else {
                            //     history.push('/thankyou');
                            // }
                            // history.push('/profile');
                            //history.push('/dashboard');
                        }
                    });
                }
            }
        });
    }

    render() {
        return (
            <WhiteBoxBody compensateNav="single" additionalOuterClasses="login" size="sm">
                <Row>
                    <Col sm={10} smPush={1}>
                        <h3 className="page-header no-margin-top">Log In</h3>
                        {/*<Row>
                                <Col xs={12}>
                                  <OAuthLoginButtons
                                    services={['facebook', 'github', 'google']}
                                    emailMessage={{
                                      offset: 100,
                                      text: 'Log In with an Email Address',
                                    }}
                                  />
                                </Col>
                              </Row>*/}
                        <form ref={form => (this.form = form)} onSubmit={event => event.preventDefault()}>
                            <FormGroup>
                                <ControlLabel>Email Address</ControlLabel>
                                <input
                                    type="email"
                                    name="emailAddress"
                                    ref={emailAddress => (this.emailAddress = emailAddress)}
                                    className="form-control"
                                />
                            </FormGroup>
                            <FormGroup>
                                <ControlLabel className="clearfix">
                                    <span className="pull-left">Password</span>
                                    <Link className="pull-right" to="/recover-password">Forgot password?</Link>
                                </ControlLabel>
                                <input
                                    type="password"
                                    name="password"
                                    ref={password => (this.password = password)}
                                    className="form-control"
                                />
                            </FormGroup>
                            <Button type="submit" className="btn-bg-purple">Log In</Button>
                            {/*<AccountPageFooter>
                                <p>{'Don\'t have an account?'} <Link to="/user-signup">Sign Up</Link>.</p>
                            </AccountPageFooter>*/}
                        </form>
                    </Col>
                </Row>
            </WhiteBoxBody>
        );
    }
}

Login.propTypes = {
    history: PropTypes.object.isRequired,
};

export default Login;
