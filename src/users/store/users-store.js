import { loadUsersByPage } from '../use-cases/load-users-by-page';

const state = {
    currentPage: 0,
    users: [],
}

const loadNextPage = async () => {
    const users = await loadUsersByPage(state.currentPage + 1);
    if(users.length === 0) return;

    state.currentPage += 1;
    state.users = users;
}

const loadPreviusPage = async () => {
    const users = await loadUsersByPage(state.currentPage - 1);
    if(state.currentPage === 1) return;
    
    state.currentPage -= 1;
    state.users = users;
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

    /**
     * 
     * @returns {User[]}
     */
    getUser: () => [...state.users],

    /**
     * 
     * @returns {number}
     */
    getCurrentPage: () => state.currentPage,
}