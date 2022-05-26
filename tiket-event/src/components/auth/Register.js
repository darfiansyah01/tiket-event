import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {useAuth} from '../../firebase-context/AuthContext';


function Register() {

    const [email, setEmail] = useState()
    const [nama, setNama] = useState()
    const [telp, setTelp] = useState()
    const [password, setPassword] = useState()
    const [passwordKonfirmasi, setPasswordKOnfirmasi] = useState()
    const { signup } = useAuth();
    const [error, setError] = useState("");
    const navigate = useNavigate();


    async function handleSubmit(e) {
        e.preventDefault()
        
        if (password !== passwordKonfirmasi) {
            setError("Password do not match");
        } else {
            try {
                if (email === '' || password === '' || nama === '' || telp === '') {
                    setError("Isi Form Dong!!!!")
                } else {
                    setError("")
                    await signup(email, password, nama, telp)
                    navigate("/")
                }
            } catch {
                setError("Failed to create an account")
                console.log(error)
            }
        }
    }  

    return (        
        <div className="min-h-full flex items-center justify-center py-12 px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className='text-lg font-bold'>REGISTER YOUR ACCOUNT</h2>
                </div>
                <form onSubmit={handleSubmit} className='space-y-10'>
                    <div>
                        <label className='block text-black font-semibold text-sm mb-1'>Email</label>
                        <input type="text" className='border-sky-900 border rounded-sm w-full px-1 py-2 outline-none' value={email} onChange={((e) => setEmail(e.target.value))}/>
                    </div>
                    <div>
                        <label className='block text-black font-semibold text-sm mb-1'>Nama</label>
                        <input type="text" className='border-sky-900 border rounded-sm w-full px-1 py-2 outline-none' value={nama} onChange={((e) => setNama(e.target.value))}/>
                    </div>
                    <div>
                        <label className='block text-black font-semibold text-sm mb-1'>No.Telp</label>
                        <input type="number" className='border-sky-900 border rounded-sm w-full px-1 py-2 outline-none' value={telp} onChange={((e) => setTelp(e.target.value))}/>
                    </div>
                    <div>
                        <label className='block text-black font-semibold text-sm mb-1'>Password</label>
                        <input type="password" className='border-sky-900 border rounded-sm w-full px-1 py-2 outline-none' value={password} onChange={((e) => setPassword(e.target.value))}/>
                    </div>
                    <div>
                        <label className='block text-black font-semibold text-sm mb-1'>Konfirmasi Password</label>
                        <input type="password" className='border-sky-900 border rounded-sm w-full px-1 py-2 outline-none' value={passwordKonfirmasi} onChange={((e) => setPasswordKOnfirmasi(e.target.value))}/>
                    </div>
                    <button type='submit' className='bg-sky-900 w-full py-2 rounded text-white'>Register</button>                           
                    <div className='flex justify-center'>                                  
                        <span className='text-sm'>Already have an account ?<Link to='/login-page' className='text-sm text-sky-900 font-semibold'> Login</Link></span>
                    </div>   
                    <div className='flex justify-between items-center'>
                        <hr className='h-px border-dashed border-gray-900 flex-1'/>
                        <p className='mx-2 text-sm'>Or countinue with google</p>
                        <hr className='h-px border-dashed border-gray-900 flex-1'/>
                    </div>
                    <button type='submit' className='border border-sky-900 w-full py-2 rounded'>Register with google</button>
                </form>
            </div>
        </div>
    )
}

export default Register