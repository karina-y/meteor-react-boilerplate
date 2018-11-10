import React from 'react';
import { Row,
         Col,
         Alert,
         FormGroup,
         ControlLabel,
         Button,
         Grid }
      from 'react-bootstrap';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Accounts } from 'meteor/accounts-base';
import { Bert } from 'meteor/themeteorchef:bert';
import validate from '../../../modules/validate';
import WhiteBoxBody from "../../components/Shared/Wrappers/WhiteBoxBody";

class RecoverPassword extends React.Component {
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
      },
      messages: {
        emailAddress: {
          required: 'Need an email address here.',
          email: 'Is this email address correct?',
        },
      },
      submitHandler() { component.handleSubmit(); },
    });
  }

  handleSubmit() {
    const { history } = this.props;
    const email = this.emailAddress.value;

    Accounts.forgotPassword({ email }, (error) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        Bert.alert(`Check ${email} for a reset link!`, 'success');
        history.push('/login');
      }
    });
  }

  render() {
    return (
      <WhiteBoxBody compensateNav="single" size="md">
          <div className="RecoverPassword">
              <Row>
                  <Col sm={10} smPush={1}>
                      <h4 className="page-header">Recover Password</h4>
                      <Alert bsStyle="info">
                          Enter your email address below to receive a link to reset your password.
                      </Alert>
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
                          <Button type="submit" className="btn-bg-orange">Recover Password</Button>
                          {/*<AccountPageFooter>
                              <p>Remember your password? <Link to="/login">Log In</Link>.</p>
                          </AccountPageFooter>*/}
                      </form>
                  </Col>
              </Row>
          </div>
      </WhiteBoxBody>
    );
  }
}

RecoverPassword.propTypes = {
  history: PropTypes.object.isRequired,
};

export default RecoverPassword;
