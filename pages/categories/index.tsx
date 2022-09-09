import React from "react";
import {UserDto, UseUserInfoResult} from "../../utils/types";
import {DashboardHeader} from "../../container/layout/dashboard";
import useUserInfo from "../../hooks/useUserInfo";
import CategoriesList from "../../container/categories/list";

const Categories = (): JSX.Element => {
    const {userInfo}: UseUserInfoResult = useUserInfo()

    return (
        <>
            <DashboardHeader user={userInfo as UserDto}/>
            <CategoriesList/>
        </>
    )
}

export default Categories
