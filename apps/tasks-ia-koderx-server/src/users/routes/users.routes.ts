const usersPath = '/users';
export const version = '/v1';

export const usersRoutes = {
    getUser: `${usersPath}/users/:term`,
    updateUser: `${usersPath}/users/:term`,
    login: `${usersPath}/login`,
}