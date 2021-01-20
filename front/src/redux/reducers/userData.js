const userDataReducer = (state = {}, action) => {
    switch (action.type) {
        case 'SETUSERDATA':
            return action.payload;
    
        default:
            return state;
    }
}

export default userDataReducer;
