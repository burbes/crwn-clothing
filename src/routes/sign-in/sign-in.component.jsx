import { useEffect } from "react";
import { getRedirectResult } from "firebase/auth";

import { 
    auth,
    signInWithGoogleRedirect, 
    signInWithGooglePopup, 
    createUserDocumentFromAuth 
} from "../utils/firebase/firebase.utils";

import SignUpForm from "../../components/sign-up-form/sign-up-form.component";

const SignIn = () => {

    useEffect(() => {
        const fetchRedirectResult = async () => {
            const response = await getRedirectResult(auth);
            
            if(response) {
                const userDocRef = await createUserDocumentFromAuth(response.user);
            }
        };
    
        fetchRedirectResult();
    }, []);
    

    const logGoogleUser = async () => {
        const { user } = await signInWithGooglePopup();                
        const userDocRef = await createUserDocumentFromAuth(user);
    }

    const logGoogleRedirectUser = async () => {           
        const { user } = await signInWithGoogleRedirect();
        const userDocRef = await createUserDocumentFromAuth(user);
    }
    return (
        <div className="sign-in">
            <h1>Sign In</h1>
            <button onClick={logGoogleUser}>
                Sign In with Google Popup
            </button>
            {/* <button onClick={signInWithGoogleRedirect}> */}
                {/* Sign In with Google Redirect */}
            {/* </button> */}
            <SignUpForm />
        </div>
    )
}

export default SignIn;