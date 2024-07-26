"use client"
import axios from 'axios';
import React, {useState} from 'react'
import {object, string, number, date, InferType} from 'yup'
import { useFormik } from 'formik';

interface FormValues {
    username: string;
    email: string;
    password: string;
}

function RegisterPage () {
    const [message, setMessage] = useState('');

    const formik = useFormik<FormValues>({
        initialValues: {
            username: '',
            email: '',
            password: ''
        },
        validationSchema: object({
            username: string().min(3, "Must be at least 3 characters").required('Required'),
            email: string().email('Invalid email address').required("Required"),
            password: string().min(6, 'Must be at least 6 characters').required('Required'),
        }),
        onSubmit: async(values) => {
            try {
                const response = await axios.post('/api/register', values);
                setMessage('Registration successful!');
            }
            catch (err) {
                setMessage('Registration Failed');
            }
        }
    });

    return (
        <div className='flex justify-center items-center h-screen'>
        <form className='' onSubmit={formik.handleSubmit}>
            <div>
                <label htmlFor="">Username: </label>
                <br />
                <input className='text-black' type="text" {...formik.getFieldProps('username')} />
                {formik.touched.username && formik.errors.username ? (
                    <div>{formik.errors.username}</div>
                ) : null}
            </div>
            <div>
                <label htmlFor="">Email: </label>
                <br />
                <input className='text-black' type="email" {...formik.getFieldProps('email')} />
                {formik.touched.email && formik.errors.email ? (
                    <div>{formik.errors.email}</div>
                ) : null}
            </div>
            <div>
                <label htmlFor="">Password: </label>
                <br />
                <input className='text-black' type="password" {...formik.getFieldProps('password')} />
                {formik.touched.password && formik.errors.password ? (
                    <div>{formik.errors.password}</div>
                ) : null}
            </div>
            <button className='bg-white text-black mt-8' type='submit'>Register</button>
            {message && <p>{message}</p>}
        </form>
        </div>
    )
}

export default RegisterPage