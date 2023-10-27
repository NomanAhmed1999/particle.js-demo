import React, { useState, useEffect } from "react";
import { BiEnvelopeOpen, BiSolidEnvelope, BiSolidEnvelopeOpen, BiSolidStar, BiStar } from "react-icons/bi";
import { ImBin2 } from "react-icons/im";
import { BsThreeDotsVertical, BsTrashFill } from "react-icons/bs";
import { BiSolidArchiveIn } from "react-icons/bi";
import { AiFillMail } from "react-icons/ai";
import { IoMdArrowDropleft, IoMdArrowDropright } from "react-icons/io";
import type { MenuProps } from 'antd';
import { Button, Dropdown } from 'antd';
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from '../redux/store';
import { isGetEmails, msgOpenClose } from "../redux/counter";
import { BallTriangle } from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


function MsgBox() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [selectedMail, setSelectedMail]: any = useState({});
  const [token, setToken] = useState('');
  const getEmails = useSelector((state: RootState) => state.user.getEmails);
  const mailType = useSelector((state: RootState) => state.user.msgType);


  useEffect(() => {
    let obj = localStorage.getItem('user');
    if(obj){
      let newToken = JSON.parse(obj).token;
      setToken(newToken);
      getMail(newToken);
    }else{
      toast("Please Login...");
      navigate('/', { replace: true });
    }
  }, [mailType, getEmails]);



  const getMail = (token: string) => {
    let data = {
      apiData: {
        apiType: 'GET',
        token: token,
        endPoint: `emails/${mailType}`
      }
    }
    try {
      setLoading(true);
      setMails([]);
      const requestOptions = {
        method: data.apiData.apiType,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${data.apiData.token}`
        },
      };
      fetch(`http://localhost:8000/${data.apiData.endPoint}`, requestOptions).then(res => res.json())
        .then(res => {
          console.log('res', JSON.parse(res));
          let response = JSON.parse(res);
          setLoading(false);
          dispatch(isGetEmails(false));

          if (response && response.length > 0) {
            let newData = response[0].matching_emails;
            if (newData && newData.length > 0) {
              setMails(newData);
            }
          } else if (response && response.detail) {
            toast(response.detail)
          } else if (response && response.message) {
            toast(response.message)
          }
        })
        .catch(err => {
            console.log(err);
            setLoading(false);
        });
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }

  }

  const deleteEmail = () => {


    let data = {
      apiData: {
        apiType: 'DELETE',
        token: token,
        endPoint: `delete`
      }
    }
    try {
      let arr: any = [
        {
          id: selectedMail.id
        }
      ]

      setLoading(true);
      const requestOptions = {
        method: data.apiData.apiType,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${data.apiData.token}`
        },
        body: JSON.stringify(arr)
      };
      fetch(`http://localhost:8000/${data.apiData.endPoint}`, requestOptions).then(res => res.json())
        .then(res => {
          console.log('res', res);
          if (res && res.message) {
            toast(res.message)
            const list3 = mails.filter((item1: any) => arr.some((item2: any) => item2.id !== item1.id));
            setMails(list3);
            setLoading(false);
            
          }else if (res && res.detail) {
            toast(res.detail)
            setLoading(false);
          }
        })
        .catch(err => {
            console.log(err);
            setLoading(false);
        });
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
    
  }

  const readMail = (mail: any) => {


    let data = {
      apiData: {
        apiType: 'PATCH',
        token: token,
        endPoint: `read`
      }
    }
    try {
      let arr: any = [
        {
          id: mail ? mail.id : selectedMail.id
        }
      ]

      setLoading(true);
      const requestOptions = {
        method: data.apiData.apiType,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${data.apiData.token}`
        },
        body: JSON.stringify(arr[0])
      };
      fetch(`http://localhost:8000/${data.apiData.endPoint}`, requestOptions).then(res => res.json())
        .then(res => {
          if (res && res.message) {
            // toast(res.message)
            var list3: any = [];
            mails.forEach((item1: any) => {
              if(arr[0].id === item1.id){
                item1.isRead = true;
              }
              list3.push(item1);
            });
            console.log(list3);
            
            setMails(list3);
            setLoading(false);
            
          }else if (res && res.detail) {
            toast(res.detail)
            setLoading(false);
          }
        })
        .catch(err => {
            console.log(err);
            setLoading(false);
        });
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
    
  }


  
  const starEmail = (mail: any) => {
    setSelectedMail(mail);
    let data = {
      apiData: {
        apiType: 'PATCH',
        token: token,
        endPoint: `starred`
      }
    }
    try {
      let arr: any = [
        {
          id: selectedMail.id
        }
      ]
      setLoading(true);
      const requestOptions = {
        method: data.apiData.apiType,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${data.apiData.token}`
        },
        body: JSON.stringify(arr)
      };
      fetch(`http://localhost:8000/${data.apiData.endPoint}`, requestOptions).then(res => res.json())
        .then(res => {
          console.log('res', res);
          if (res && res.message) {
            toast(res.message)
            const list3 = mails.filter((item1: any) => {
              if(arr.some((item2: any) => item2.id === item1.id)){
                item1.starred = true;
              }
            });
            setMails(list3);
            setLoading(false);
            
          }else if (res && res.detail) {
            toast(res.detail)
            setLoading(false);
          }
        })
        .catch(err => {
            console.log(err);
            setLoading(false);
        });
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
    
  }


  const openEmail = (mail: any) => {
    console.log(mail);
    
    setSelectedMail(mail);
    readMail(mail);
    dispatch(msgOpenClose(mail));
  }


  const [mails, setMails] = useState([])

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <div onClick={deleteEmail} className="flex justify-between w-[100px] cursor-pointer items-center">
          <p>Delete</p>
          <BsTrashFill />
        </div>
      ),
    },
    {
      key: '2',
      label: (
        <div className="flex justify-between w-[100px] cursor-pointer items-center">
          <p>Archive</p>
          <BiSolidArchiveIn />
        </div>
      ),
    },
    {
      key: '3',
      label: (
        <div onClick={() => { readMail('') }} className="flex justify-between w-[100px] cursor-pointer items-center">
          <p>Mark as read</p>
          <AiFillMail />
        </div>
      ),
    }
  ];



  return (
    <div className="w-full bg-white opacity-80 h-[80vh] rounded-xl">
      <div className="topbox pt-6  px-4 flex items-center justify-between">
        <div className="switch-btn  py-2 min-w-[150px] w-[15%] rounded-4xl items-center justify-around bg-secondary text-black1 flex">
          <input
            type="checkbox"
            name="check"
            className="cursor-pointer checked:text-primary "
          />
          <BiSolidEnvelope className="cursor-pointer" />
          <BiSolidStar className="cursor-pointer" />
          <ImBin2 className="cursor-pointer" />
        </div>
        <div className="pagination ">
          <div className="flex items-center text-black1">
            <span className="mr-3">1 - 50 of 809</span>
            <IoMdArrowDropleft className="text-2xl cursor-pointer" />
            <IoMdArrowDropright className="text-2xl cursor-pointer" />
          </div>
        </div>
      </div>
      <div className="w-[96%] ms-[8px] h-[2px] my-2 bg-white-1"></div>
      {/* msg container */}

      <div
        className=" overflow-y-scroll m-1 mb-4 h-[85%] px-4 text-font-color" id="style-4"
      >
        {/* Single MSG  */}

        {mails.length > 0 ?
          <>
            {mails.map((x: any, i) => {

              return (
                <div key={i} className="msg my-2 flex items-center cursor-pointer justify-between p-2 rounded-2xl bg-secondary">
                  <div className="flex items-center gap-2">
                    <input type="checkbox" className="cursor-pointer" />
                    {x.starred ?
                      <BiSolidStar onClick={() => starEmail(x)} className="cursor-pointer text-lg" />
                      :
                      <BiStar onClick={() => starEmail(x)} className="cursor-pointer text-lg" />
                    }

                    <span onClick={() => openEmail(x)} className="overflow-hidden text-ellipsis whitespace-nowrap">
                      {x.name}
                    </span>
                  </div>
                  <div onClick={() => openEmail(x)} className="w-[80%] overflow-hidden h-6 pl-4 pr-4 text-ellipsis whitespace-nowrap flex">
                    <span className="font-bold">{x.subject}</span> - &nbsp;
                    <div dangerouslySetInnerHTML={{ __html: x.body }}></div> {/* Use x.body here */}
                  </div>
                  <div className="flex items-center gap-2">
                    {
                      x.isRead ?
                      <BiEnvelopeOpen className="cursor-pointer" />
                      :
                    <BiSolidEnvelope className="cursor-pointer" />
                    }
                    <div onMouseOver={() => {setSelectedMail(x)}}>
                    <Dropdown className="cursor-pointer" menu={{ items }} placement="top" arrow={{ pointAtCenter: true }}>
                      <BsThreeDotsVertical />
                    </Dropdown>
                    </div>
                    <span>{x.date}</span>
                  </div>
                </div>
              );
            })}
          </>
          :
          <div className="w-full h-full bg-secondary rounded-md p-2 flex justify-center items-center">
          <p className="text-xl">No Email Found</p>
          </div>
        }

      </div>
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

export default MsgBox;
