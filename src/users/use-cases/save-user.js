import { User } from '../models/user';
import { userLocalhost } from '../mappers/user-localhost.mapper';

/**
 * 
 * @param {Like<User>} userLike 
 */
export const saveUser = async (userLike) => {
    const user = new User(userLike);

    if(!user.firstName || !user.lastName) 
        throw 'First & Last name are required';

    const userToSave = userLocalhost(user);

    if(user.id){
        throw 'No implementada la actualización';
        return;
    }

    const updateUser = await createUser(userToSave);
    return updateUser;
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
