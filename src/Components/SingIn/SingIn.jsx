import { sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useRef, useState } from 'react';
import auth from '../../Firebase/Firebase.config';

const SingIn = () => {

    const [singInError, setSingInError] = useState('');
    const [success, setSuccess] = useState('');
    const emailRef = useRef(null);

    const handleSingIn = e => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        console.log(email, password);

        if (password.length < 6) {
            setSingInError(' Password should be at least 6 characters or longer')
            return;
        }
        else if (!/[A-Z]/.test(password)) {
            setSingInError('password should be at least one Uppercase')
            return;
        }


        setSingInError(' ');
        setSuccess(' ')

        signInWithEmailAndPassword(auth, email, password)
            .then(result => {
                console.log(result.user);
                setSuccess('User Login Successfully')
            })
            .catch(error => {
                console.log(error);
                setSingInError(error.message)
            })

    }

    const handleResetPassword = () =>{
        const email = emailRef.current.value;
        if(!email){
            console.log('please provid your email', emailRef.current.value)
            return;
        }
        else if(!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)){
            console.log('Please check your email')
            return;
        }

        sendPasswordResetEmail(auth, email)
        .then(()=>{
            alert('please check your email');
        })
        .catch(error=>{
            console.log(error);
        })
    }

    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Sing-In now!</h1>
                    <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                </div>
                <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <form onSubmit={handleSingIn} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input
                                type="email"
                                name='email'
                                ref={emailRef}
                                placeholder="email"
                                className="input input-bordered"
                                required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" name='password' placeholder="password" className="input input-bordered" required />
                            <label className="label">
                                <a onClick={handleResetPassword} href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary">Sing-In</button>
                        </div>
                    </form>
                    {
                        singInError && <p className='text-red-700'>{singInError}</p>
                    }
                    {
                        success && <p className='text-green-700'>{success}</p>
                    }
                </div>
            </div>
        </div>
    );
};

export default SingIn;