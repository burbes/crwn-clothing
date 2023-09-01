import { useState } from 'react';

import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';

import {
    signInWithGooglePopup,
    createUserDocumentFromAuth,
    signInAuthUserWithEmailAndPassword
}
    from '../../routes/utils/firebase/firebase.utils';

import './sign-in-form.styles.scss';

const defaultFormFields = {
    email: '',
    password: '',
}

const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;

    // console.log(formFields);

    const resetFormFiels = () => {
        setFormFields(defaultFormFields);
    }
    const signInWithGoogle = async () => {
        const { user } = await signInWithGooglePopup();
        await createUserDocumentFromAuth(user);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await signInAuthUserWithEmailAndPassword(email, password);
            resetFormFiels(); // reset the form fields
            console.log(response);
        } catch (error) {
            switch (error.code) {
                case 'auth/invalid-email':
                    alert('Invalid email');
                    break;
                case 'auth/user-disabled':
                    alert('User disabled');
                    break;
                case 'auth/user-not-found':
                    alert('User not found');
                    break;
                case 'auth/wrong-password':
                    alert('Wrong password');
                    break;
                default:
                    alert('Something went wrong');
                    break;
            }

            // console.log(error);
        }

    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value });
    };

    return (
        <div className='sign-in-container'>
            <h2>Already have an account?</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>

                <FormInput
                    label='Email'
                    inputOptions={{
                        required: true,
                        type: "email",
                        name: "email",
                        onChange: handleChange,
                        value: email,
                    }} />

                <FormInput
                    label='Password'
                    inputOptions={{
                        required: true,
                        type: "password",
                        name: "password",
                        onChange: handleChange,
                        value: password,
                    }} />

                <div className='buttons-container'>
                    <Button type="submit">Sign In</Button>
                    <Button type="button" buttonType='google' onClick={signInWithGoogle}>Google Sign In</Button>
                </div>
            </form>
        </div>
    );
}

export default SignInForm;