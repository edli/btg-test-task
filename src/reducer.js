const CURRENCIES = ['GBP', 'EUR', 'USD'];

export const INITIAL_STATE = {
    users: [],
    page: 'LIST',
    user: {},
};

export default function reduce(state = INITIAL_STATE, action) {
    switch (action.type) {
        case 'ADD_USER': return onAddUser(state, action);
        case 'EDIT_USER': return onEditUser(state, action);
        case 'DELETE_USER': return onDeleteUser(state, action);

        case 'CHANGE_USER': return onChangeUser(state, action);

        case 'INVALIDATE_USER': return onInvalidateUser(state, action);
        case 'CANCEL': return onCancel(state, action);
        case 'SAVE_USER': return onSaveUser(state, action);

        default:
            return state;
    }
}

function onAddUser(state) {
    return {
        ...state,
        page: 'ADD',
        user: {
            id: new Date().getTime(),
        },
    };
}

function onEditUser(state, { id }) {
    return {
        ...state,
        page: 'EDIT',
        user: {
            ...state.users.find(user => user.id === id),
        },
    };
}

function onDeleteUser(state, { id }) {
    const idx = state.users.findIndex(user => user.id === id);

    return {
        ...state,
        users: state.users.slice(0, idx).concat(state.users.slice(idx + 1)),
    };
}

function onChangeUser(state, { user }) {
    return {
        ...state,
        user: {
            ...state.user,
            ...user,
            fioError: user.fio !== state.user.fio ? null : state.user.fioError,
            Error: user.fio !== state.user.fio ? null : state.user.fioError,
            fioError: user.fio !== state.user.fio ? null : state.user.fioError,
        },
    };
}

function onInvalidateUser(state, { errors }) {
    return {
        ...state,
        user: {
            ...state.user,
            ...errors,
        },
    };
}

function onCancel(state) {
    return {
        ...state,
        user: {},
        page: 'LIST',
    };
}

function onSaveUser(state) {
    let users;
    if (state.page === 'ADD') {
        users = state.users.concat(state.user);
    } else {
        const idx = state.users.findIndex(user => state.user.id === user.id);
        users = state.users.slice(0, idx)
            .concat(state.user)
            .concat(state.users.slice(idx + 1));
    }

    return {
        ...state,
        users,
        user: {},
        page: 'LIST',
    };
}
