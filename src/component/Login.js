import React, { useState } from 'react'
import { useNavigate } from  'react-router-dom';

function SignUp() {

    const [credentials, setCredentials] = useState({ email: "", password: "" })
    const navigate = useNavigate();
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const body = {
            "email": credentials.email,
            "password": credentials.password
        }

        const url = "http://localhost:5000/api/auth/login";

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        });

        const login = await response.json();
        if(login.success){
            localStorage.setItem("token", login.auth_token)
            navigate("/");
        }
        else{
            alert("Invalid Credential")
        }
    }

    return (
        <section className="h-full">
            <div className="px-6 h-full text-gray-800">
                <div
                    className="flex xl:justify-center lg:justify-between justify-center items-center flex-wrap h-full g-6"
                >
                    <div
                        className="grow-0 shrink-1 md:shrink-0 basis-auto xl:w-6/12 lg:w-6/12 md:w-9/12 mb-12 md:mb-0"
                    >
                        <img
                            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                            className="w-full"
                            alt="Sample Image"
                        />
                    </div>
                    <div className="xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0">
                        <form onSubmit={handleSubmit} >
                            <div className="text-center my-4">
                                <p className="text-2xl font-semibold mx-4 mb-0">Welcome Back</p>
                            </div>

                            {/* <!-- Email input --> */}
                            <div className="mb-6">
                                <input
                                    type="text"
                                    className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                    name="email"
                                    placeholder="Email address"
                                    onChange={onChange}
                                    autoComplete='usersname'
                                    required
                                />
                            </div>

                            {/* <!-- Password input --> */}
                            <div className="mb-6">
                                <input
                                    type="password"
                                    className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                    name="password"
                                    placeholder="Password"
                                    onChange={onChange}
                                    autoComplete='current-password'
                                    required
                                />
                            </div>

                            <div className="text-center lg:text-left">
                                <button
                                    type="submit"
                                    className="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                                >
                                    Log In
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default SignUp
