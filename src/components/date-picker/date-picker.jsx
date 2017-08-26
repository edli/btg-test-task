import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import moment from 'moment';
import autobind from 'autobind-decorator';

import Alert from '../alert';

import './date-picker.css';

const cn = require('bem-cn')('date-picker');

const FORMAT = 'DD.MM.YYYY';
const DEFAULT_VALUE = moment().format(FORMAT);

export default class DatePicker extends React.Component {
    static propTypes = {
        value: PropTypes.string,
        error: PropTypes.string,
        onChange: PropTypes.func,
    }

    static defaultProps = {
        value: DEFAULT_VALUE,
        onChange: formatted => {},
    }

    render() {
        const { error } = this.props;
        const value = moment(this.props.value || DEFAULT_VALUE, FORMAT);

        let day;
        let month;
        let year;
        if (value.isValid()) {
            day = value.date();
            month = value.month();
            year = value.year();
        } else {
            [day, month, year] = (this.props.value || '').split('.');
        }

        return (
            <div className={cn({ error: !!error }).mix(this.props.className)}>
                <div className={cn('controls')}>
                    {this.renderDays(day)}
                    {this.renderMonths(month)}
                    {this.renderYears(year)}
                </div>
                {error &&
                    <Alert className={cn('error')}>
                        {error}
                    </Alert>
                }
            </div>
        );
    }

    renderDays(day) {
        const value = moment(this.props.value, FORMAT);

        const daysCount = value.isValid()
            ? value.daysInMonth()
            : 31;

        return (
            <select className={cn('days')} value={day} onChange={this.handleDayChange}>
                {Array.from({ length: daysCount }).map((_, i) => {
                    const dayValue = i + 1;

                    return (
                        <option
                            key={dayValue}
                            className={cn('day')}
                            value={dayValue}
                        >
                            {dayValue}
                        </option>
                    )
                })}
            </select>
        );
    }

    renderMonths(month) {
        return (
            <select className={cn('months')} value={month} onChange={this.handleMonthChange}>
                {moment.months().map((name, i) => {
                    return (
                        <option
                            key={i}
                            className={cn('month')}
                            value={i}
                        >
                            {name}
                        </option>
                    )
                })}
            </select>
        );
    }

    renderYears(year) {
        const todayYear = moment().year();

        return (
            <select className={cn('years')} value={year} onChange={this.handleYearChange}>
                {Array.from({ length: todayYear - 1900 }).map((_, i) => {
                    const yearValue = todayYear - i;

                    return (
                        <option
                            key={yearValue}
                            className={cn('year')}
                            value={yearValue}
                        >
                            {yearValue}
                        </option>
                    )
                })}
            </select>
        );
    }

    @autobind
    handleDayChange(event) {
        const day = event.target.value;

        const value = moment(this.props.value || DEFAULT_VALUE, FORMAT);
        value.date(day);

        this.props.onChange(value.isValid()
            ? value.format(FORMAT)
            : `${day}`
        );
    }

    @autobind
    handleMonthChange(event) {
        const month = event.target.value;

        let value = moment(this.props.value || DEFAULT_VALUE, FORMAT);
        value.month(month);
        if (!value.isValid()) {
            value = moment(1, month + 1, value.year()).subtract(1, 'day');
        }

        this.props.onChange(value.format(FORMAT));
    }

    @autobind
    handleYearChange(event) {
        const year = event.target.value;

        const value = moment(this.props.value || DEFAULT_VALUE, FORMAT);
        value.year(year);

        this.props.onChange(value.format(FORMAT));
    }
}
