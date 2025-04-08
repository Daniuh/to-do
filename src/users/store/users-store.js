import { User } from '../models/user';
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

/**
 * @param {User} updateUser 
 */
const onUserChanged = (updateUser) => {
    let wasFound = false;

    state.users = state.users.map(user => {
        if(user.id === updateUser.id) {
            wasFound = true;
            return updateUser;
        }
        return user;
    });

    if(state.users.length < 10 && !wasFound){
        state.users.push(updateUser);
    }
}

const reloadPage = async () => {
    const users = await loadUsersByPage(state.currentPage);
    if(users.length === 0){
        await loadPreviusPage();
        return;  
    } 
    state.users = users;
}

export default {
    loadNextPage,
    loadPreviusPage,
    onUserChanged,
    reloadPage,

    /**
     * @returns {User[]}
     */
    getUser: () => [...state.users],

    /**
     * @returns {number}
     */
    getCurrentPage: () => state.currentPage,
}