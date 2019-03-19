const initialState = {items: [], auth: sessionStorage.getItem('token') || false};

const users = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_USERS':
            return {...state, ...{items: action.payload}};
        default:
            return state;
    }
};

export default users;