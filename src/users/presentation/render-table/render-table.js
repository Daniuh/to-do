import usersStore from '../../store/users-store';
import { deleteUserById } from '../../use-cases/delete-user-by-id';
import { showModal } from '../render-modal/render-modal';
import './render-table.css';

let table;

const createTable = () => {
    const table        = document.createElement('table');
    const tableHeaders = document.createElement('thead');
    tableHeaders.innerHTML = `
        <tr>
            <th>Nª</th>
            <th>Sueldo</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>¿Activo?</th>
            <th>Acciones</th>
        </tr>
    `;

    const tableBody = document.createElement('tbody');
    table.append(tableHeaders, tableBody);
    return table;
}

/**
 * @param {MouseEvent} event 
 */
const tableSelectListener = (event) => {
    const element = event.target.closest('.Select-user');
    if (!element) return;

    const id = element.getAttribute('data-id');
    showModal(id);
}

/**
 * @param {MouseEvent} event 
 */
const tableDeleteListener = async (event) => {
    const element = event.target.closest('.Delete-user');
    if (!element) return;

    const id = element.getAttribute('data-id');
    try {
        await deleteUserById(id);
        await usersStore.reloadPage();
        document.querySelector('#current-page').innerText = usersStore.getCurrentPage();
        renderTable();
        
    } catch (error) {
        console.log(error);
        alert('No se pudo eliminar');
    }
}

/**
 * @param {HTMLDivElement} element 
 */
export const renderTable = (element) => {

    const users = usersStore.getUser();
    if(!table){
        table = createTable();
        element.append(table); //Para no destruir nada de lo antes creado

        table.addEventListener('click', tableSelectListener);
        table.addEventListener('click', tableDeleteListener);
    }

    let tableHTML = '';
    users.forEach(user => {
        tableHTML += `
            <tr>
                <td>${user.id}</td>
                <td>${user.balance}</td>
                <td>${user.firstName}</td>
                <td>${user.lastName}</td>
                <td>${user.isActive}</td>
                <td>
                    <a href="#/" class="Select-user" data-id=${user.id}>Select</a>
                    |
                    <a href="#/" class="Delete-user" data-id=${user.id}>Delete</a>
                </td>
            </tr>
        `;

    });

    table.querySelector('tbody').innerHTML = tableHTML;
}