const userReducer = (user=null, action) => {
    switch(action.type){
        case 'SIGNUP':
        case 'SIGNIN':
        case 'SIGNWITHGOOGLE':
        case 'REFRESHUSER':
                localStorage.setItem('user', JSON.stringify(action.payload))
                return {...action.payload};
        case 'LOGOUT':
                localStorage.removeItem('user');
                return null;
        default:
            return user;
    }
}

export default userReducer;