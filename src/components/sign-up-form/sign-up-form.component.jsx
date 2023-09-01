import { useState, useContext } from 'react';

import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';

import {
    createAuthUserWithEmailAndPassword,
    createUserDocumentFromAuth
}
    from '../../routes/utils/firebase/firebase.utils';

import { UserContext } from '../../context/user.context';

import './sign-up.styles.scss';

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}

const SignUpForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { displayName, email, password, confirmPassword } = formFields;

    const { setCurrentUser } = useContext(UserContext);

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
            const { user } = await createAuthUserWithEmailAndPassword(
                email,
                password
            );

            setCurrentUser(user);
            
            await createUserDocumentFromAuth(user, { displayName });
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
        <div className='sign-up-container'>
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
        </div>
    );
}

export default SignUpForm;