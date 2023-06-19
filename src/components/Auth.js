import '../styles/Auth.css'
import {auth, provider} from '../firebase-config'
import {signInWithPopup} from 'firebase/auth'
import Cookies from "universal-cookie/es6";
const cookies = new Cookies()
export const Auth = ({setIsAuth}) => {

    const signInWithGoogle = async () =>{
        try {
            const res = await signInWithPopup(auth, provider)
            cookies.set("auth-token", res.user.refreshToken)
            setIsAuth(true)
        }catch (err){
            console.log(err)
        }
    }


    return <div className="auth">
        <p>Sign in with google to continue</p>
        <button onClick={signInWithGoogle}>Sign in with Google</button>
    </div>
}