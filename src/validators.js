import moment from 'moment';
const DATE_FORMAT = 'DD.MM.YYYY';
const PHONE_RE = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/;

export function validateUser(user) {
    const fioError = validateFio(user.fio);
    const birthdayError = validateBirthday(user.birthday);
    const phoneError = validatePhone(user.phone);

    if (fioError || birthdayError || phoneError) {
        return {
            fioError,
            birthdayError,
            phoneError,
        };
    }
}

function validateFio(fio) {
    if (!fio) {
        return 'Не указаны ФИО';
    } else if (fio.length > 100) {
        return 'ФИО должен быть не более 100 букв';
    }
}

function validateBirthday(birthday) {
    if (!birthday) {
        return 'Не указан день рождения';
    } else if (!moment(birthday, DATE_FORMAT).isValid()) {
        return 'День рождения должен быть в формате ДД.ММ.ГГГГ';
    }
}

function validatePhone(phone) {
    if (phone && !PHONE_RE.test(phone)) {
        return 'Укажите российский номер телефона';
    }
}
