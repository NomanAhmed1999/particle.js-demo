import MsgBox from "../components/msgBox";
import MsgContent from "../components/msgContent";
import SidebarMenu from "../components/sidebarMenu";
import Compose from "../components/compose";
import { useSelector } from "react-redux";
import type { RootState } from '../redux/store';

const Inbox = () => {
  const singleMsgObj = useSelector((state: RootState) => state.user.singleMsgObj);
  const openCompose = useSelector((state: RootState) => state.user.openCompose);

  return (
    <>
      <div className=" grid grid-cols-6 gap-6">
        <div>
          <SidebarMenu />
        </div>
        <div className={singleMsgObj.id || openCompose ? 'col-span-2 mt-4' : 'col-span-5 mt-4'}>
          <MsgBox />
        </div>
        {
          singleMsgObj.id || openCompose ?
            <div className="col-span-3 mt-4">
              {openCompose ?
                <Compose />
                :
                singleMsgObj.id ?
                  <MsgContent />
                  : null}
            </div>
            :
            null
        }

      </div>
    </>
  );
};

export default Inbox;
