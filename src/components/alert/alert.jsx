import React from 'react';
import PropTypes from 'prop-types';
import autobind from 'autobind-decorator';

import './alert.css';

const cn = require('bem-cn')('alert');

export default class Alert extends React.Component {
    render() {
        return (
            <div className={cn.mix(this.props.className)}>
                {this.props.children}
            </div>
        );
    }
}
