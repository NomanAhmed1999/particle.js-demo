import logo from "../assets/images/logo.png";
import profile from "../assets/images/Profile.png";
import { AiOutlineSearch } from "react-icons/ai";
import { BsFillQuestionCircleFill, BsSliders } from "react-icons/bs";

const Header = () => {
  return (
    <>
      <div className="rounded-lg flex justify-between p-4 header-container bg-gradient w-full  ">
        <div className="flex w-1/3 items-center">
          <img src={logo} alt="logo" />
          <h2 className="ml-4 text-2xl font-bold">Gmail 2.0</h2>
        </div>
        <div className="flex items-center justify-between">
          {/* <div className="flex items-center w-128 bg-white p-4 h-10 rounded-lg bg-opacity-25">
            <AiOutlineSearch className="cursor-pointer" size={'1.5rem'} />
            <input
              className="pl-3 active:border-0 outline-none pr-5 w-full bg-transparant"
              type="text"
              placeholder="Search mail ..."
              name="search"
            />
            <BsSliders className="mx-2 cursor-pointer" size={'1.5rem'} />
          </div> */}
          <div className="flex items-center gap-2 mr-4">
            <a className="underline cursor-pointer">Support</a>
            <BsFillQuestionCircleFill className=" cursor-pointer" />
            <img src={profile} alt="" className="w-[60px] ms-2 cursor-pointer" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
