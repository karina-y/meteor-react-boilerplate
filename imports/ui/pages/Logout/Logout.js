import React from 'react';
import { Grid } from 'react-bootstrap';
import PropTypes from 'prop-types';

import './Logout.less';

class Logout extends React.Component {
    componentDidMount() {
        const component = this;
        const { history } = this.props;
        Meteor.logout();
        history.push('/');
    }

    render() {
        return(
            <div></div>
        )
    }   
}

Logout.propTypes = {
    history: PropTypes.object.isRequired,
};

export default Logout;
