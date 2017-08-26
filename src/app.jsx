import React from 'react';
import { connect } from 'react-redux';
import autobind from 'autobind-decorator';

import List from './pages/list';
import Edit from './pages/edit';

import './app.css';

const cn = require('bem-cn')('app');

@connect(state => {
    return {
        page: state.page,
    };
})
export default class App extends React.Component {
    render() {
        return (
            <div className={cn.mix(this.props.className)}>
                {this.props.page === 'LIST' && <List />
                    || this.props.page === 'ADD' && <Edit />
                    || this.props.page === 'EDIT' && <Edit />
                }
            </div>
        );
    }
}
