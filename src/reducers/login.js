const initialState = {validationError: '', auth: sessionStorage.getItem('token') || false};

const login = (state = initialState, action) => {
    switch (action.type) {
        case 'AUTH':
        case 'VALIDATION_ERROR':
            return {...state, ...action.payload};
        default:
            return state;
    }
};

export default login;
