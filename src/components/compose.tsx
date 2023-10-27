import { useState, useEffect } from 'react';
import { RxCross2 } from "react-icons/rx";
import { FaReply } from "react-icons/fa";
import { BsReplyAllFill, BsTranslate } from "react-icons/bs";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { GrAttachment } from "react-icons/gr";
import { TbPhotoFilled } from 'react-icons/tb';
import { AiFillAudio, AiOutlineMinus } from 'react-icons/ai';
import { useDispatch, useSelector } from "react-redux";
import { isGetEmails, msgOpenClose } from '../redux/counter';
import { IoMdSend } from 'react-icons/io';
import { ToastContainer, toast } from 'react-toastify';
import { BallTriangle } from 'react-loader-spinner';


function Compose() {

    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    const [isReply, setIsReply] = useState(true);
    const [data, setData] = useState({
        data: {
            body: "",
            date: "string",
            from: '',
            image: "string",
            name: "string",
            starred: false,
            subject: "",
            to: "string",
            type: "string",
            bin: false,
            isRead: false,
            language: "english"
        },
        apiData: {
            apiType: 'POST',
            endPoint: 'save'
        }
    });


    useEffect(() => {
        let obj = localStorage.getItem('user');
        if (obj) {
            let emailFrom = JSON.parse(obj).email;
            setData((prevData) => {
                return {
                    ...prevData,
                    data: {
                        ...prevData.data,
                        from: emailFrom
                    },
                };
            });
        }
    }, []);


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

    const quillText = (e: any) => {
        console.log(e);

        setData((prevData) => {
            return {
                ...prevData,  // Copy the existing data object
                data: {
                    ...prevData.data,  // Copy the existing inner data
                    body: e  // Update the 'name' property
                },
            };
        });
    }

    const sendMail = () => {
        try {
            setLoading(true);
            const requestOptions = {
                method: data.apiData.apiType,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data.data)
            };
            const res = fetch(`http://localhost:8000/${data.apiData.endPoint}`, requestOptions).then(res => res.json())
                .then(res => {
                    setLoading(false);
                    if (res) {
                        dispatch(isGetEmails(true));
                        console.log('res', res);
                        if (res && res.detail) {
                            toast(res.detail)
                        } else if (res && res.message) {
                            toast(res.message);
                            dispatch(msgOpenClose({}));
                        }
                    }
                })
                .catch(err => {
                    console.log(err);
                    setLoading(false);
                });
        } catch (error) {
            console.error('Error:', error); // Log any errors
            throw error;
        }
    }


    return (
        <div className="bg-white text-black1 h-[80vh] rounded-2xl w-full">
            <div className="p-4 flex items-start justify-between">
                <div className="flex items-center ">
                    <p>To:</p>
                    <input type='text' className='ms-2 bg-secondary rounded-lg p-2 outline-none' placeholder='Enter email' name="to" onChange={Setting} />
                </div>
                <div>
                    <RxCross2 onClick={() => dispatch(msgOpenClose({}))} className="text-2xl font-bold cursor-pointer" />
                </div>
            </div>
            <div className="w-[96%] ms-[10px] h-[1px] mt-1 bg-secondary-dark"></div>
            <div className="h-[80%] overflow-y-scroll mt-2 px-2 relative m-2" id="style-4">



                {isReply ?
                    <div className="w-full min-h-[430px] bg-secondary flex flex-col rounded-lg mt-2 p-1 relative">
                        <input type='text' className='mt-2 bg-white-1 rounded-lg p-2 outline-none' placeholder='Subject' name="subject" onChange={Setting} />

                        <div className='min-h-[340px] flex flex-col justify-between'>
                            <div className='w-80 h-10 absolute top-14 right-5 flex justify-between items-center'>
                                <BsTranslate />
                                <select className='bg-white rounded-lg px-6'>
                                    <option>English</option>
                                    <option>Urdu</option>
                                </select>
                                <AiOutlineMinus className='cursor-pointer' />
                                <select className='bg-white rounded-lg px-6'>
                                    <option>English</option>
                                    <option>Urdu</option>
                                </select>
                                {/* <RxCross2 className='cursor-pointer' onClick={() => { setIsReply(false) }} /> */}
                            </div>


                            <ReactQuill placeholder="Type your email here..." theme="snow" value={data.data.body} onChange={quillText} />
                        </div>

                        <div>
                            <div className='w-full h-[1px] bg-white'></div>
                            <div className='w-full flex justify-between p-2 items-center'>
                                <div className='w-20 flex justify-between'>
                                    <GrAttachment className='cursor-pointer' />
                                    <TbPhotoFilled className='cursor-pointer' />
                                    <AiFillAudio className='cursor-pointer' />
                                </div>
                                <div className='flex'>
                                    <button className='rounded-xl bg-primary hover:bg-secondary-dark transition-all text-white py-1 px-4'>Translate</button>
                                    <button onClick={sendMail} className='ms-2 cursor-pointer flex justify-center items-center w-8 rounded-full bg-primary hover:bg-secondary-dark text-white transition-all'>
                                        <IoMdSend />
                                    </button>
                                </div>
                            </div>

                        </div>
                    </div>
                    : null}

            </div>
            {!isReply ?
                <div className="px-4 mt-4 flex items-center gap-4">
                    <button onClick={() => { setIsReply(true) }} className="compose-btn font-bold py-3 px-6 rounded-lg inline-flex justify-center items-center">
                        <FaReply />
                        <span className="ml-2 text-tertiary1">Reply</span>
                    </button>
                    <span className="flex items-center gap-2 cursor-pointer">
                        <BsReplyAllFill />
                        <small className="underline">Reply with New Mail</small>
                    </span>
                </div>
                : null}

            <ToastContainer />

            {
                loading ?
                    <div className="absolute top-0 right-0 bottom-0 left-0 bg-white-1 bg-opacity-20 flex justify-center items-center">
                        <BallTriangle height={100} width={100} radius={5} color="#4fa94d" ariaLabel="ball-triangle-loading" visible={loading} />
                    </div> :
                    null
            }
        </div>
    );
}

export default Compose;
