const initialState = {
    currentSession: {
        timestamp: null,
        data: []
    },
    sessions: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        case 'add_to_current_data':
            return {
                ...state,
                currentSession: {
                    ...state.currentSession,
                    data: [...state.currentSession.data, action.payload]
                }
            }
        case 'add_current_data_to_sessions':
            return {
                ...state,
                currentSession: initialState.currentSession,
                sessions: [...state.sessions, state.currentSession]
            }
        case 'reset_current_data':
            return {
                ...state,
                currentSession: initialState.currentSession
            }
        case 'delete_session_at_index':
            return {
                ...state,
                sessions: state.sessions.filter((_, index) => index !== action.payload)
            }
        default:
            return state
    }
}
