import React from 'react';
import PropTypes from 'prop-types';
import "./FullWidthBody.less";


class FullWidthBody extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            additionalOuterClasses: props.additionalOuterClasses
        }
    }

    render() {
        const additionalOuterClasses = this.props.additionalOuterClasses != null ? this.props.additionalOuterClasses : "";

        return (
            <div className={additionalOuterClasses}>
                {this.props.children}
            </div>
        )
    }
}

FullWidthBody.propTypes = {
    additionalOuterClasses: PropTypes.string
};

export default FullWidthBody;




