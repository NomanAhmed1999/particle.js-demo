import React from "react";
import { FaEdit, FaInbox } from "react-icons/fa";
import { TbHomeExclamation } from "react-icons/tb";
import { BiSolidMessageSquareCheck, BiSolidStar } from "react-icons/bi";
import { AiFillFile } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { msgTypeChange } from "../redux/counter";
import type { RootState } from '../redux/store';

function SidebarMenu() {
  const msgType = useSelector((state: RootState) => state.user.msgType);
  const dispatch = useDispatch();



  //   return <div className="w-1/4 bg-my-color mt-4">SidebarMenu</div>;
  return (
    <div className="mt-4 pt-4 text-center bg-gradient rounded-2xl h-[80vh]">
      <div className="m-4 mt-4  ">
        <button onClick={() => dispatch(msgTypeChange('compose-open'))} className="w-full compose-btn font-bold py-3 px-6 rounded-lg inline-flex justify-center items-center">
          <FaEdit />
          <span className="ml-2 text-tertiary1">Compose</span>
        </button>
        <hr className="mt-4" />
      </div>
      <div className="mt-4 ml-4 h-[70%] ">
        <button onClick={() => dispatch(msgTypeChange('inbox'))} className={msgType == 'inbox' ? 'mt-2 w-full py-3 bg-primary font-bold px-6 rounded-lg inline-flex justify-between items-center' : 'mt-2 w-full hover:bg-primary hover:opacity-75 py-3 px-6 rounded-lg inline-flex justify-between items-center'}>
          <p className="inline-flex items-center">
            <FaInbox />
            <span className="ml-2 ">Inbox</span>
          </p>
          <span className="font-light">809</span>
        </button>
        <button onClick={() => dispatch(msgTypeChange('starred'))} className={msgType == 'starred' ? 'mt-2 w-full py-3 bg-primary font-bold px-6 rounded-lg inline-flex justify-between items-center' : 'mt-2 w-full hover:bg-primary hover:opacity-75 py-3 px-6 rounded-lg inline-flex justify-between items-center'}>
          <p className="inline-flex items-center">
            <BiSolidStar />
            <span className="ml-2 ">Starred</span>
          </p>
          <span className="font-light">123</span>
        </button>

        <button onClick={() => dispatch(msgTypeChange('draft'))} className={msgType == 'draft' ? 'mt-2 w-full py-3 bg-primary font-bold px-6 rounded-lg inline-flex justify-between items-center' : 'mt-2 w-full hover:bg-primary hover:opacity-75 py-3 px-6 rounded-lg inline-flex justify-between items-center'}>
          <p className="inline-flex items-center">
            <AiFillFile />
            <span className="ml-2 ">Draft</span>
          </p>
          <span className="font-light">200</span>
        </button>
        <button onClick={() => dispatch(msgTypeChange('sent'))} className={msgType == 'sent' ? 'mt-2 w-full py-3 bg-primary font-bold px-6 rounded-lg inline-flex justify-between items-center' : 'mt-2 w-full hover:bg-primary hover:opacity-75 py-3 px-6 rounded-lg inline-flex justify-between items-center'}>
          <p className="inline-flex items-center">
            <BiSolidMessageSquareCheck />
            <span className="ml-2 ">Sent</span>
          </p>
          <span className="font-light">533</span>
        </button>
        <button onClick={() => dispatch(msgTypeChange('bin'))} className={msgType == 'bin' ? 'mt-2 w-full py-3 bg-primary font-bold px-6 rounded-lg inline-flex justify-between items-center' : 'mt-2 w-full hover:bg-primary hover:opacity-75 py-3 px-6 rounded-lg inline-flex justify-between items-center'}>
          <p className="inline-flex items-center">
            <MdDelete />
            <span className="ml-2 ">Bin</span>
          </p>
          <span className="font-light">172</span>
        </button>
      </div>
      {/* <div className=" mt-8  ml-4 w-[80%]  text-lg inline-flex items-center justify-start">
        <TbHomeExclamation />
        <span className="ml-2 underline cursor-pointer">Help</span>
      </div> */}
    </div>
  );
}

export default SidebarMenu;
