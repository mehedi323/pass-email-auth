import { createUserWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import auth from '../../Firebase/Firebase.config';
import { FaEye, FaEyeSlash } from 'react-icons/fa';


const HeroRegister = () => {

    const [heroError, setHeroError] = useState('');
    const [success, setSuccess] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleHeroRegister = e => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        const accepted = e.target.terms.checked;
        console.log(email, password, accepted)

        if (password.length < 6) {
            setHeroError('Password should be at least 6 characters or longer')
            return;
        }
        else if (!/[A-Z]/.test(password)) {
            setHeroError('password should be at least one Uppercase')
            return;
        }
        else if(!accepted){
            setHeroError('Please Accept our terms and conditions')
            return;
        }


        // validation Reset
        setHeroError('');
        setSuccess('');

        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                console.log(result.user);
                setSuccess('User Create Successfully')
            })
            .catch(error => {
                console.error(error)
                setHeroError(error.message)
            })
    }
    return (
        <div>
            <form onSubmit={handleHeroRegister}>
                <input className='border mb-3 p-2 w-1/2  ' type="email" name="email" placeholder='Your Email' required id="" />
                <br />
                <div className=' mb-3 relative'>
                    <input
                        className='border  p-2 w-1/2'
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder='Your Password'
                        required id="" />
                    <span className='absolute top-3 right- 1' onClick={() => setShowPassword(!showPassword)}>
                        {
                            showPassword ? <FaEye></FaEye> : <FaEyeSlash></FaEyeSlash>
                        }
                    </span>
                </div>
                <br />
                <div className='mb-2'>
                    <input className='mr-2' type="checkbox" name="terms" id="terms" />
                    <label htmlFor="terms">Terms and Condition</label>
                </div>
                <br />
                <input className='w-1/2 mb-2 p-2 btn btn-accent' type="submit" value="HeroRegister" />
            </form>
            {
                heroError && <p className='text-red-700'>{heroError}</p>
            }
            {
                success && <p className='text-green-700'>{success}</p>
            }
        </div>
    );
};

export default HeroRegister;