import React from 'react';
import { connect } from 'react-redux';
import autobind from 'autobind-decorator';

import * as actions from '../../actions';

import './list.css';

const cn = require('bem-cn')('list');

@connect(state => {
    return {
        users: state.users,
    };
})
export default class List extends React.Component {
    render() {
        return (
            <div className={cn.mix(this.props.className)}>
                {this.renderList()}
                <div className={cn('add')}>
                    <button onClick={this.handleAddClick}>
                        Добавить
                    </button>
                </div>
            </div>
        );
    }

    renderList() {
        return (
            <div className={cn('user-list')}>
                <div className={cn('user-list-head')}>
                    <div className={cn('user-list-cell', { short: true })}>

                    </div>
                    <div className={cn('user-list-cell')}>
                        ФИО
                    </div>
                    <div className={cn('user-list-cell')}>
                        День рождения
                    </div>
                    <div className={cn('user-list-cell')}>
                        Адрес
                    </div>
                    <div className={cn('user-list-cell')}>
                        Город
                    </div>
                    <div className={cn('user-list-cell')}>
                        Телефон
                    </div>
                </div>
                {this.props.users.length > 0
                    ? this.props.users.map(this.renderUser)
                    : 'Нет данных'
                }
            </div>
        )
    }

    @autobind
    renderUser(user) {
        return (
            <div className={cn('user-list-row')} key={user.id} data-id={user.id} onClick={this.handleEditClick}>
                <div className={cn('user-list-cell', { short: true })}>
                    <button data-id={user.id} onClick={this.handleDeleteClick}>
                        Удалить
                    </button>
                </div>
                <div className={cn('user-list-cell')}>
                    {user.fio}
                </div>
                <div className={cn('user-list-cell')}>
                    {user.birthday}
                </div>
                <div className={cn('user-list-cell')}>
                    {user.address}
                </div>
                <div className={cn('user-list-cell')}>
                    {user.city}
                </div>
                <div className={cn('user-list-cell')}>
                    {user.phone}
                </div>
            </div>
        );
    }

    @autobind
    handleAddClick() {
        this.props.dispatch(actions.addUser());
    }

    @autobind
    handleEditClick(event) {
        const id = event.currentTarget.getAttribute('data-id');
        this.props.dispatch(actions.editUser(Number(id)));
    }

    @autobind
    handleDeleteClick(event) {
        event.stopPropagation();
        const id = event.target.getAttribute('data-id');
        this.props.dispatch(actions.deleteUser(Number(id)));
    }
}
