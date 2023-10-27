import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import { BallTriangle } from "react-loader-spinner";

const SignUp = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);


    const [data, setData] = useState({
        data: {
            name: '',
            email: '',
            password: ''
        },
        apiData: {
            apiType: 'POST',
            endPoint: 'user/register'
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
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data.data)
            };
            fetch(`http://localhost:8000/${data.apiData.endPoint}`, requestOptions).then(res => res.json())
                .then(res => {
                    console.log(res);
                    setLoading(false);
                    if (res) {
                        console.log('res', res);
                        if (res && res.detail) {
                            toast(res.detail)
                        } else if (res && res.message) {
                            toast(res.message)
                            navigate('/', { replace: true });
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
            <p>Sign Up</p>

            <div className="mt-4 ms-2">
                <label>User Name</label>
                <input className="border-solid text-tertiary1 border-2 border-b-green p-1 rounded-md m-2" name="name" placeholder="User Name" type="text" onChange={Setting} />
            </div>

            <div className="mt-4 ms-2">
                <label>Email</label>
                <input className="border-solid text-tertiary1 border-2 border-b-green p-1 rounded-md m-2" name="email" placeholder="User Email" type="email" onChange={Setting} />
            </div>

            <div className="mt-2 ms-2">
                <label>Password</label>
                <input className="border-solid text-tertiary1 border-2 border-b-green p-1 rounded-md m-2" name="password" placeholder="Password" type="password" onChange={Setting} />
            </div>

            <button onClick={formSubmit} className="border-solid border-2 border-b-green p-1 rounded-md m-2">Sign Up</button>

            <Link className="ms-2 font-bold text-my-color" to={'/'}>Already have an account?</Link>

            <ToastContainer />
            <BallTriangle height={100} width={100} radius={5} color="#4fa94d" ariaLabel="ball-triangle-loading" visible={loading} />
        </>
    )
}

export default SignUp;