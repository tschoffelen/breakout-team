const { v4: uuid } = require("uuid");

export const presenceId = () => {
    if ('presenceUUID' in window && window.presenceUUID) {
        return window.presenceUUID;
    }
    if ('localStorage' in window && window.localStorage) {
        if (window.localStorage.presenceUUID) {
            return window.localStorage.presenceUUID;
        }
        window.presenceUUID = window.localStorage.presenceUUID = uuid();
    }
    window.presenceUUID = uuid();
    return window.presenceUUID;
};
