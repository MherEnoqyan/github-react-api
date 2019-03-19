const initialState = {items: [], auth: sessionStorage.getItem('token') || false};

const repositories = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_REPOSITORIES':
            return {...state, ...{items: action.payload}};
        default:
            return state;
    }
};

export default repositories;