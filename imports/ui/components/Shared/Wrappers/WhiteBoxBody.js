import React from 'react';
import PropTypes from 'prop-types';
import { Grid} from 'react-bootstrap';
import "./WhiteBoxyBody.less";


class WhiteBoxBody extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            size: props.size,   //accepts "sm", "md", or "lg"
            compensateNav: props.shadowLevel,     //accepts "single" or "dual"
            additionalOuterClasses: props.additionalOuterClasses,
            additionalInnerClasses: props.additionalInnerClasses
        }
    }

    render() {
        const additionalOuterClasses = this.props.additionalOuterClasses != null ? this.props.additionalOuterClasses : "";
        const additionalInnerClasses = this.props.additionalInnerClasses != null ? this.props.additionalInnerClasses : "";
        const size = this.props.size != null ? "white-box-body-" + this.props.size : "";

        const outerClassName = "white-box-body compensate-" + this.props.compensateNav + "-nav " + additionalOuterClasses;
        const innerClassName = size + " " + additionalInnerClasses;

        return (
            <div className={outerClassName}>
                <Grid className={innerClassName}>
                    {this.props.children}
                </Grid>
            </div>
        )
    }
}

WhiteBoxBody.propTypes = {
    compensateNav: PropTypes.string.isRequired,
    size: PropTypes.string.isRequired,
    additionalOuterClasses: PropTypes.string,
    additionalInnerClasses: PropTypes.string
};

export default WhiteBoxBody;