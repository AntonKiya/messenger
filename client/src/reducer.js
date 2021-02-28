export default (state, action) => {

    switch (action.type){

        case 'USER_JOINED':
            return {
                ...state,
                roomId: action.payload.roomId,
                userName: action.payload.userName,
                joined: action.payload.joined
            }

        case 'SET_USERS':
            return {
                ...state,
                users: action.payload
            }

        case 'SET_MESSAGES':
            return {
                ...state,
                messages: [...state.messages, action.payload]
            }

        case 'OLD_MESSAGES':
            return {
                ...state,
                messages: action.payload
            }

        default:
            return state


    }

};
