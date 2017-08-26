import React from 'react';
import { connect } from 'react-redux';
import autobind from 'autobind-decorator';

import Input from '../../components/input';
import DatePicker from '../../components/date-picker';

import * as actions from '../../actions';

import './edit.css';

const cn = require('bem-cn')('edit');

@connect(state => {
    return {
        user: state.user,
    };
})
export default class Edit extends React.Component {
    render() {
        const { user } = this.props;

        return (
            <div className={cn.mix(this.props.className)}>
                <div className={cn('fio')}>
                    <label htmlFor="fio">ФИО</label>
                    <Input
                        id="fio"
                        value={user.fio}
                        error={user.fioError}
                        maxLength={100}
                        onChange={this.handleFioChange}
                    />
                </div>

                <div className={cn('birthday')}>
                    <label htmlFor="fio">Дата рождения</label>
                    <DatePicker
                        id="birthday"
                        value={user.birthday}
                        error={user.birthdayError}
                        onChange={this.handleBirthdayChange}
                    />
                </div>

                <div className={cn('address')}>
                    <label htmlFor="address">Адрес</label>
                    <Input
                        id="fio"
                        value={user.address}
                        error={user.addressError}
                        onChange={this.handleAddressChange}
                    />
                </div>

                <div className={cn('city')}>
                    <label htmlFor="city">Город</label>
                    <Input
                        id="fio"
                        value={user.city}
                        error={user.cityError}
                        onChange={this.handleCityChange}
                    />
                </div>

                <div className={cn('phone')}>
                    <label htmlFor="phone">Телефон</label>
                    <Input
                        id="fio"
                        value={user.phone}
                        error={user.phoneError}
                        onChange={this.handlePhoneChange}
                    />
                </div>

                <div className={cn('actions')}>
                    <button className={cn('cancel')} onClick={this.handleCancelClick}>
                        Отменить
                    </button>
                    <button className={cn('add')} onClick={this.handleSaveClick}>
                        Сохранить
                    </button>
                </div>
            </div>
        );
    }

    @autobind
    handleFioChange(fio) {
        this.props.dispatch(actions.changeUser({
            ...this.props.user,
            fio,
        }));
    }

    @autobind
    handleBirthdayChange(birthday) {
        this.props.dispatch(actions.changeUser({
            ...this.props.user,
            birthday,
        }));
    }

    @autobind
    handleAddressChange(address) {
        this.props.dispatch(actions.changeUser({
            ...this.props.user,
            address,
        }));
    }

    @autobind
    handleCityChange(city) {
        this.props.dispatch(actions.changeUser({
            ...this.props.user,
            city,
        }));
    }

    @autobind
    handlePhoneChange(phone) {
        this.props.dispatch(actions.changeUser({
            ...this.props.user,
            phone,
        }));
    }

    @autobind
    handleCancelClick() {
        this.props.dispatch(actions.cancel());
    }

    @autobind
    handleSaveClick() {
        this.props.dispatch(actions.saveUser(this.props.user));
    }
}
