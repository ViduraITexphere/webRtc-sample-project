export const SAVE_USER = "SAVE_USER";

export const saveUser = (username) => {
    return {
        type: SAVE_USER,
        payload: {
            username: username
        }
    }
}
  