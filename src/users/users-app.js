import usersStore from './store/users-store';
import { renderTable } from './presentation/render/render-table';

/**
 * 
 * @param {HTMLDivElement} element 
 */
export const UsersApp = async (element) => {

    element.innerHTML = 'Cargando...';
    await usersStore.loadNextPage();
    element.innerHTML = '';

    renderTable(element);
}