
const state = {
    currentPage: 0,
    users: [],
}

const loadNextPage = async () => {
    throw new Error('No implementado');
}

const loadPreviusPage = async () => {
    throw new Error('No implementado');
}

const onUserChanged = () => {
    throw new Error('No implementado');
}

const reloadPage = () => {
    throw new Error('No implementado');
}

export default {
    loadNextPage,
    loadPreviusPage,
    onUserChanged,
    reloadPage,

    getUser: () => [...state.users],
    getCurrentPage: () => state.currentPage,
}