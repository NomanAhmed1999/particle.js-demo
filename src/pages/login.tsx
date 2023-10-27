import {useState} from "react";
import { BallTriangle } from "react-loader-spinner";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({
        data: {
            username: '',
            password: ''
        },
        apiData: {
            apiType: 'POST',
            endPoint: 'user/login'
        }
    });

    const Setting = (event: any) => {
        const { name, value } = event.target
        setData((prevData) => {
            return {
                ...prevData,  // Copy the existing data object
                data: {
                    ...prevData.data,  // Copy the existing inner data
                    [name]: value  // Update the 'name' property
                },
            };
        });
    }

    const formSubmit = () => {
        try {
            setLoading(true);
            const requestOptions = {
                method: data.apiData.apiType,
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: new URLSearchParams(data.data)
            };
            fetch(`http://localhost:8000/${data.apiData.endPoint}`, requestOptions).then(res => res.json())
                .then(res => {
                    console.log(res);
                    setLoading(false);
                    if (res) {
                        console.log('loading', loading);
                        if (res && res.access_token) {
                            let obj = {
                                token: res.access_token,
                                email: res.email
                            };
                            localStorage.setItem('user', JSON.stringify(obj));
                            navigate('/inbox', { replace: true });
                        } else if (res && res.detail) {
                            toast(res.detail)
                        } else if (res && res.message) {
                            toast(res.message)
                        }
                    }
                })
                .catch(err => {
                    console.log(err);
                    setLoading(false);
                });
        } catch (error) {
            console.error('Error:', error); // Log any errors
            setLoading(false);
            throw error;
        }
    }


    return (
        <>
            <p>Login</p>

            <div className="mt-4 ms-2">
                <label>Email</label>
                <input className="border-solid text-tertiary1 border-2 border-indigo-600 p-1 rounded-md m-2" name="username" placeholder="User Name" type="text" onChange={Setting} />
            </div>

            <div className="mt-2 ms-2">
                <label>Password</label>
                <input className="border-solid text-tertiary1 border-2 border-indigo-600 p-1 rounded-md m-2" name="password" placeholder="Password" type="password" onChange={Setting} />
            </div>

            <button onClick={formSubmit} className="border-solid bg-my-color border-2 border-indigo-600 p-1 rounded-md m-2">Login</button>

                <Link className="ms-2 font-bold text-blue-600" to={'sign-up'}>Create New Account</Link>

                
            <ToastContainer />
            {
                loading ?
                    <div className="absolute top-0 right-0 bottom-0 left-0 bg-white-1 bg-opacity-20 flex justify-center items-center">
                        <BallTriangle height={100} width={100} radius={5} color="#4fa94d" ariaLabel="ball-triangle-loading" visible={loading} />
                    </div> :
                    null

            }
        </>
    )
}

export default Login;