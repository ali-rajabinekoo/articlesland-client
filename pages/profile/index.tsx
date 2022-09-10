import {NextPage} from "next";
import {DashboardHeader} from "../../container/layout/dashboard";
import ProfileContainer from "../../container/profile";
import React from "react";

const Profile: NextPage = () => {
    return (
        <div>
            <DashboardHeader/>
            <ProfileContainer/>
        </div>
    )
}

export default Profile
