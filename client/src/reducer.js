export default (state, action) => {

    switch (action.type){

        case 'JOINED':
            return {
                ...state,
                roomId: action.payload.roomId,
                userName: action.payload.userName,
                joined: action.payload.joined
            }
        default:
            return state


    }

};
