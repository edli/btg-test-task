const USERS_KEY = 'btg-state-users';

function filterData(key, value) {
    if (key === 'user' || key === 'page') {
        return undefined;
    }

    return value;
}

export function saveState(data) {
    localStorage.setItem(USERS_KEY, JSON.stringify(data, filterData));
}

export function loadState() {
    const state = localStorage.getItem(USERS_KEY);
    if (!state) {
        return null;
    }

    try {
        return JSON.parse(state, filterData);
    } catch (e) {
        console.log('Error retrieving state from localStorage', e);
        return null;
    }
}
