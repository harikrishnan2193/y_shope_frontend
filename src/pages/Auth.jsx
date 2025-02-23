import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { loginAPI, registerAPI } from '../services/allApi';
import Swal from 'sweetalert2';

function Auth() {
  const navigate = useNavigate()
  const location = useLocation();
  const isLoginPath = location.pathname === '/login';
  const isRegisterPath = location.pathname === '/register';
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: ''
  })

  //function to register
  const handleRegister = async (e) => {
    e.preventDefault();
    const { name, email, password } = userData
    if (!name || !email || !password) {
      Swal.fire("Please fill all the form completily")
    }
    else {
      const result = await registerAPI(userData)
      console.log(result);

      if (result.status === 200) {
        Swal.fire(`${result.data.name} is successfully registered`)
        setUserData({ name: "", email: "", password: "" })
        navigate('/login')
      }
      else {
        Swal.fire(`${result.response.data}`)
        if (result.status === 406) {
          navigate('/register')
        }
      }

    }
  }

  //login function
  const handleLogin = async(e)=>{
    e.preventDefault();
    const {email,password} = userData
    if(!email || !password){
      Swal.fire("Please fill the form completily")
    }
    else{
      const result = await loginAPI(userData)
      console.log(result);

      if(result.status === 200){
        sessionStorage.setItem('userDetils',JSON.stringify(result.data.existUser))
        sessionStorage.setItem('token',result.data.token)

        Swal.fire("Login successfull")

        if (result.data.existUser.role && result.data.existUser.role == "admin") {
          navigate('/admin');
        } else {
          navigate('/');
        }
      }
      else{
        alert(`${result.response.data}`)
      }
    }
  }


  return (
    <div className='mx-auto lg:px-lg-padding xl:px-xl-padding'>
      <div className="flex  py-12 px-8">
        <div className="hidden md:flex w-1/2 bg-cover bg-center" style={{ backgroundImage: 'url(https://img.freepik.com/free-photo/red-light-round-podium-black-background-mock-up_43614-950.jpg?t=st=1740138091~exp=1740141691~hmac=76e2ea62bca3c5b6e8b42ef8916693a6e8ffaf2986856c81f843eb4ae1b7d104&w=900)' }}>
          <div className="flex flex-col justify-center items-center w-full h-full text-white bg-black bg-opacity-50 p-10">
            <h1 className="text-3xl font-bold mb-4">Welcome to Y-Shopes</h1>
            <p className="text-center">Your one-stop solution for all your shoping choise.</p>
          </div>
        </div>

        <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-6">
          <h2 className="text-2xl font-semibold mb-6">{isLoginPath ? 'Login' : 'Sign Up'}</h2>
          <form className="w-full max-w-sm">
            {isRegisterPath && (
              <div className="mb-4">
                <label className="block text-gray-700">Name</label>
                <input type="text" className="w-full px-2 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500"
                  onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                  value={userData.name}
                />
              </div>
            )}
            <div className="mb-4">
              <label className="block text-gray-700">Email</label>
              <input type="email" className="w-full px-2 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500"
                onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                value={userData.email}
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700">Password</label>
              <input type="password" className="w-full px-2 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500"
                onChange={(e) => setUserData({ ...userData, password: e.target.value })}
                value={userData.password}
              />
            </div>

            {isLoginPath ?
              <button onClick={handleLogin} type="submit" className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition">Login</button>
              :
              <button onClick={handleRegister} type="submit" className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition">Register</button>
            }
          </form>

          <p className="mt-4 text-gray-600">
            {isLoginPath ? "Don't have an account? " : "Already have an account? "}
            <Link to={isLoginPath ? '/register' : '/login'} className="text-red-600 hover:underline">
              {isLoginPath ? 'Sign Up' : 'Login'}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Auth;
