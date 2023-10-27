import React, { useState, useEffect } from 'react';
// import Profile from "../assets/images/Profile.png";
import { RxCross2 } from "react-icons/rx";
import { PiTranslateFill } from "react-icons/pi";
import { MdVoiceChat } from "react-icons/md";
import { FaReply, FaStar } from "react-icons/fa";
import { ImBin2 } from "react-icons/im";
import { BsReplyAllFill, BsTranslate } from "react-icons/bs";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { GrAttachment } from "react-icons/gr";
import { TbPhotoFilled } from 'react-icons/tb';
import { AiFillAudio, AiOutlineMinus } from 'react-icons/ai';
import { useDispatch, useSelector } from "react-redux";
import { isGetEmails, msgOpenClose } from '../redux/counter';
import { RootState } from '../redux/store';
import { IoMdSend } from 'react-icons/io';
import { toast } from 'react-toastify';
import { BallTriangle } from 'react-loader-spinner';


function MsgContent() {

  const dispatch = useDispatch();
  const singleMsgObj = useSelector((state: RootState) => state.user.singleMsgObj);
  const [loading, setLoading] = useState(false);

  const [isReply, setIsReply] = useState(false);
  const [data, setData] = useState({
    data: {
      body: "",
      date: "string",
      from: '',
      image: "string",
      name: "string",
      starred: false,
      subject: "",
      to: singleMsgObj.from_,
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

  
  useEffect(() => {
    let obj = localStorage.getItem('user');
    if(obj){
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
    <div className="bg-white text-black1 h-[80vh] rounded-2xl w-full mr-4">
      <div className="p-4 flex items-start justify-between">
        <div className="flex items-center ">
          <img className='w-16 rounded-full' src={singleMsgObj.image ? singleMsgObj.image : 'https://cdn-icons-png.flaticon.com/512/149/149071.png'} alt="client" />
          <div className="ml-4 text-black1">
            <p className="font-bold">
              {singleMsgObj.name}
              <span className="ml-2 font-normal text-primary">
                ({singleMsgObj.from_})
              </span>
            </p>
            <p>Received at: {singleMsgObj.date}</p>
          </div>
        </div>
        <div>
          <RxCross2 onClick={() => dispatch(msgOpenClose({}))} className="text-2xl font-bold cursor-pointer" />
        </div>
      </div>
      {/* <hr className="mx-4 bg-secondary h-1 text-secondary" /> */}
      <div className="w-[96%] ms-[10px] h-[2px] my-4 bg-secondary"></div>
      <div className="h-[69%] overflow-y-scroll mt-4 pl-4 relative m-2" id="style-4">
        <h2 className="font-semibold text-lg">{singleMsgObj.subject}</h2>
        <div className="mt-4 w-[85%] min-h-[150px]">
          <div dangerouslySetInnerHTML={{__html: singleMsgObj.body}}></div>
        </div>


        {isReply ?
          <div className="w-full min-h-[200px] bg-secondary flex flex-col justify-between rounded-lg mt-4 p-1 relative">
            <div className='w-80 h-10 absolute top-2 right-5 flex justify-between items-center'>
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
              <RxCross2 className='cursor-pointer' onClick={() => { setIsReply(false) }} />
            </div>
            <ReactQuill placeholder= "Type your email here..." theme="snow" value={data.data.body} onChange={quillText} />


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

        <div className="h-[220px] w-[40px] rounded-2xl py-8 bg-secondary-dark  fixed top-[280px] right-[50px]">
          <div className="flex flex-col text-xl w-full h-full text-primary items-center justify-around">
            <PiTranslateFill className="cursor-pointer" />
            <MdVoiceChat className="cursor-pointer" />
            <FaStar className="cursor-pointer" />
            <ImBin2 className="cursor-pointer" />
          </div>
        </div>
      </div>
      {!isReply ?
        <div className="px-4 flex items-center gap-4">
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

export default MsgContent;
