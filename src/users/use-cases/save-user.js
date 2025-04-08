import { User } from '../models/user';
import { userLocalhost } from '../mappers/user-localhost.mapper';
import { localHostUserToModel } from '../mappers/localhost-user.mapper';

/**
 * @param {Like<User>} userLike 
 */
export const saveUser = async (userLike) => {
    const user = new User(userLike);

    if(!user.firstName || !user.lastName) 
        throw 'First & Last name are required';

    const userToSave = userLocalhost(user);
    let userUpdate;

    if(user.id){
        userUpdate = await updateUser(userToSave);
    }else{
        userUpdate = await createUser(userToSave);
    }

    return localHostUserToModel(userUpdate);
}

/**
 * @param {Like<User>} user
 */
const createUser =  async (user) => {
    const url = `${import.meta.env.VITE_BASE_URL}/users`;
    const res = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
            'Content-Type' : 'application/json'
        }
    });

    const newUser = await res.json();
    console.log({newUser});
    return newUser;
}

/**
 * @param {Like<User>} user
 */
const updateUser =  async (user) => {

    const url = `${import.meta.env.VITE_BASE_URL}/users/${user.id}`;
    const res = await fetch(url, {
        method: 'PATCH',
        body: JSON.stringify(user),
        headers: {
            'Content-Type' : 'application/json'
        }
    });

    const updateUser = await res.json();
    console.log({updateUser});
    return updateUser;
}
