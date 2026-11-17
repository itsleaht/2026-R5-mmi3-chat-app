import type { User } from "../../types/events.js";

const userList = new Map<string, User>();
const typingUserList = new Array();

const createUser = (id: string, user?: Partial<Omit<User, 'id'>>) => {
    return {
        ...user,
        username: user?.username || 'Username',
        avatar: user?.avatar || '',
        color: user?.color || '',
        id,
    };
}

export const getUser = (id: string) => {
    return userList.get(id);
}

export const addUser = (id: string, user?: Partial<User>) => {
    if (userList.has(id)) {
        return;
    }

    const createdUser = createUser(id, user);
    userList.set(id, createdUser);
    return createdUser;
}

export const removeUser = (id: string) => {
    if (!userList.has(id)) {
        return;
    }
    const user = getUser(id);
    userList.delete(id);
    return user;
}

export const editUser = (id: string, userUpdates: Partial<User>) => {
    const user = getUser(id);
    if (!user) {
        return;
    }
    
    const updatedUser = {
        ...user,
        ...userUpdates,
        id,
    }

    userList.set(id, updatedUser);

    return updatedUser;
}

export const addTypingUser = (id: string) => {
    if (typingUserList.includes(id)) {
        return;
    }
    typingUserList.push(id);
}

export const removeTypingUser = (id: string) => {
    const foundIndex = typingUserList.findIndex((userId) => id === userId);
    if (foundIndex < 0) {
        return;
    }

    typingUserList.splice(foundIndex, 1);
}

export const getTypingUserList = () => {
    return { list: typingUserList }
}

export const getUserList = () => {
    return { list: [...userList.values()] }
}