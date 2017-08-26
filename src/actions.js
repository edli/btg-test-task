import * as validators from './validators';

export function addUser() {
    return {
        type: 'ADD_USER',
    };
}

export function editUser(id) {
    return {
        type: 'EDIT_USER',
        id,
    };
}

export function deleteUser(id) {
    return {
        type: 'DELETE_USER',
        id,
    };
}

export function changeUser(user) {
    return {
        type: 'CHANGE_USER',
        user,
    };
}

export function cancel() {
    return {
        type: 'CANCEL',
    };
}

export function saveUser(user) {
    const errors = validators.validateUser(user);

    if (errors) {
        return {
            type: 'INVALIDATE_USER',
            errors,
        };
    }

    return {
        type: 'SAVE_USER',
    };
}
