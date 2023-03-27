export const SAVE_USER = "SAVE_USER";
export const ACTIVE_USERS = "ACTIVE_USERS";

export const saveUser = (username) => {
    return {
        type: SAVE_USER,
        payload: {
            username: username
        }
    }
};

export const setActiveUsers = (activeUsers) => {
    return {
        type: ACTIVE_USERS,
        payload: {
            activeUsers: activeUsers
        }
    }
}
  