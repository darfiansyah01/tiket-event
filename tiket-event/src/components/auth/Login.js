import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {useAuth} from '../../firebase-context/AuthContext';

function Login() {

    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const { login, userData } = useAuth();
    const [error, setError] = useState("");
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault()
        try {
            setError("")
            if (email === '' || password === '') {
                setError("Isi Form Dulu!!!!")
            } else {                
                await login(email, password).then(async () => {
                    if(userData.roles === 1001){
                        navigate('/home')
                    } else {
                        navigate('/admin-pages/event')
                    }
                })
            }

        } catch {
            setError("Failed to Sign In")
            console.log(error)
        }
    }
   
    return (
        <div className="min-h-full flex items-center justify-center py-12 px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className='text-lg font-bold'>LOGIN TO YOUR ACCOUNT</h2>
                </div>
                <form onSubmit={handleSubmit} className='space-y-10'>
                    <div>
                        <label className='block text-black font-semibold text-sm mb-1'>Email</label>
                        <input type="text" className='border-sky-900 border rounded-sm w-full px-1 py-2 outline-none' value={email} onChange={((e) => setEmail(e.target.value))}/>
                    </div>
                    <div>
                        <label className='block text-black font-semibold text-sm mb-1'>Password</label>
                        <input type="password" className='border-sky-900 border rounded-sm w-full px-1 py-2 outline-none' value={password} onChange={((e) => setPassword(e.target.value))}/>
                    </div>
                    <div className='flex justify-between items-center'>
                        <div className='flex items-center'>
                            <input type="checkbox" className='h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-sky-900 rounded'/>
                            <label className='ml-2 block text-sm text-sky-900'>Remember</label>
                        </div>
                        <Link className='font-medium text-xs text-sky-900 hover:text-sky-600' to=''>Forgot your password?</Link>
                    </div>
                    <button type='submit' className='bg-sky-900 w-full py-2 rounded text-white'>Login</button>      
                    <div className='flex justify-between items-center'>
                        <hr className='h-px border-dashed border-gray-900 flex-1'/>
                        <p className='mx-2 text-sm'>Or countinue with google</p>
                        <hr className='h-px border-dashed border-gray-900 flex-1'/>
                    </div>
                    <button type='submit' className='border border-sky-900 w-full py-2 rounded'>Login with google</button>
                </form>
                <div className='flex justify-center'>                                  
                    <span className='text-sm'>Don't have an account ?<Link to='/register-page' className='text-sm text-sky-900 font-semibold'> Register</Link></span>
                </div>
            </div>
        </div>
    )
}

export default Login