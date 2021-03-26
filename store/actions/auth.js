export const SIGNUP = 'SIGNUP';
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

export const signup = (email, password) => {
    return async dispatch => {
           const responce = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCyPx21flZ2pQ7OCs29KmNHvQeZ3k3uJH8', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                    returnSecureToken: true
                })
            });

            if(!responce.ok) {
                const errorResData = await responce.json();
                const errorId = errorResData.error.message;

                let message = 'Something went wrong!!';
                if(errorId === 'EMAIL_EXISTS') {
                    message = 'This email exist already!!';
                }

                throw new Error(message);
            }

            const resData = await responce.json();
            console.log(resData);
            dispatch({ type: SIGNUP, token: resData.idToken, userId: resData.localId });
    };
};

export const logout = () => {
    return { type: LOGOUT };
};

export const login = (email, password) => {
    return async dispatch => {
           const responce = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCyPx21flZ2pQ7OCs29KmNHvQeZ3k3uJH8', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                    returnSecureToken: true
                })
            });
            if(!responce.ok) {
                const errorResData = await responce.json();
                const errorId = errorResData.error.message;

                let message = 'Something went wrong!!';
                if(errorId === 'EMAIL_NOT_FOUND') {
                    message = 'This email could not be found!!';
                }else if (errorId === 'INVALID_PASSWORD') {
                    message = 'This password is not valid!!';
                }

                throw new Error(message);
            }

            const resData = await responce.json();
            console.log(resData);
            dispatch({ type: LOGIN, token: resData.idToken, userId: resData.localId });
    };
};