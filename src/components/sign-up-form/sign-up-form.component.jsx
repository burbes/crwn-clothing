import { useState } from 'react';
import { useDispatch } from 'react-redux';

import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';

import {
    createAuthUserWithEmailAndPassword,
    createUserDocumentFromAuth
}
    from '../../utils/firebase/firebase.utils';

import {SignUpContainer} from './sign-up.styles.jsx';
import { signUpStart } from '../../store/user/user.action';

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}

const SignUpForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { displayName, email, password, confirmPassword } = formFields;
    const dispatch = useDispatch();

    const resetFormFiels = () => {
        setFormFields(defaultFormFields);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }

        try {
            dispatch(signUpStart(email, password, displayName));
            resetFormFiels(); // reset the form fields
        }
        catch (error) {
            if (error.code = 'auth/email-already-in-use') {
                alert('Email already in use');
            } else {
                console.log('user creation encountered an error', error);
            }
        }
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value });
    }

    return (
        <SignUpContainer>
            <h2>Don't have an account?</h2>
            <span>Sign Up with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput
                    label='Display Name'
                    inputOptions={{
                        type: 'text',
                        required: true,
                        onChange: handleChange,
                        name: 'displayName',
                        value: displayName
                    }} />

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

                <FormInput
                    label='Confirm Password'
                    inputOptions={{
                        required: true,
                        type: "password",
                        name: "confirmPassword",
                        onChange: handleChange,
                        value: confirmPassword
                    }} />
                    
                <Button type="submit">Sign Up</Button>
            </form>
        </SignUpContainer>
    );
}

export default SignUpForm;