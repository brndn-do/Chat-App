// Auth.js

import { auth, provider } from '../firebase-config.js'
import { signInWithPopup } from 'firebase/auth';
import "../styles/Auth.css";

import Cookies from 'universal-cookie'
const cookies = new Cookies();

export const Auth = (props) => {

    // destructure setIsAuth function from props
    const { setIsAuth } = props;

    // function to handle Google sign-in
    const signInWithGoogle = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            cookies.set("auth-token", result.user.refreshToken);
            setIsAuth(true);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="auth">
        <p>Sign in with Google to continue:</p>
        <button className = "sign-in" onClick = {signInWithGoogle}>Sign in with Google</button>
        </div>
    );
}