import { User } from '../models/user';

/**
 * 
 * @param {Like<User>} userLike 
 */
export const saveUser = async (userLike) => {
    const user = new User(userLike);

    // TODO: Implementar un mapper

    if(user.id){
        throw 'No implementada la actualización';
        return;
    }

    const updateUser = await createUser(user);
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
