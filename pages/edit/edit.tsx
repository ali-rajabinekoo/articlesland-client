import {UserDto, UseUserInfoResult} from "../../utils/types";
import {DashboardHeader} from "../../container/layout/dashboard";
import useUserInfo from "../../hooks/useUserInfo";
import EditContainer from "../../container/edit";

const EditPage = (): JSX.Element => {
    const {userInfo}:UseUserInfoResult = useUserInfo()
    return (
        <div>
            <DashboardHeader user={userInfo as UserDto}/>
            <EditContainer/>
        </div>
    )
}

export default EditPage
