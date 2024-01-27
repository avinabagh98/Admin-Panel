import { createContext, useReducer, useEffect } from "react";

export const AuthContext = createContext();

const initialstate = {
    'authToken': null,
    'message': 'Initial State'
};


export const AuthReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN":
            return {
                'authToken': action.payload,
                'message': "Logged in successfully"
            }
        case "LOGOUT":
            return {
                'authToken': null,
                'message': "Logged out successfully"
            }
        default:
            return state
    }
}

export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AuthReducer, initialstate);

    console.log("state is:", state);

    useEffect(() => {
        const authToken = localStorage.getItem('authToken');

        if (authToken) {
            dispatch({ type: "LOGIN", payload: authToken });
        }

    }, []);

    return (
        <AuthContext.Provider value={{ ...state, dispatch }}>
            {children}
        </AuthContext.Provider>
    )
}

