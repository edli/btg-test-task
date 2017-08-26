import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import autobind from 'autobind-decorator';

import Alert from '../alert';

import './input.css';

const cn = require('bem-cn')('input');

export default class Input extends React.Component {
    static propTypes = {
        type: PropTypes.oneOf(['text', 'password', 'number', 'tel', 'email', 'date']),
        value: PropTypes.string,
        placeholder: PropTypes.string,
        error: PropTypes.node,
        onChange: PropTypes.func,
    };

    static defaultProps = {
        type: 'text',
        value: '',
        error: '',
        onChange: value => {},
    };

    render() {
        const { error, ...props } = this.props;

        return (
            <div className={cn({ error: !!error }).mix(this.props.className)}>
                <input
                    {...props}
                    className={cn('control')}
                    onChange={this.handleChange}
                />
                {error &&
                    <Alert className={cn('error')}>
                        {error}
                    </Alert>
                }
            </div>
        );
    }

    @autobind
    handleChange(event) {
        this.props.onChange(event.target.value);
    }
}
