import type {NextPage} from 'next'
import {DashboardHeader} from "../../container/layout/dashboard";
import useUserInfo from "../../hooks/useUserInfo";
import {UserDto, UseUserInfoResult} from "../../utils/types";
import ProfileTab from "../../container/dashboard/profileTab";
import {useEffect} from "react";
import {NextRouter, useRouter} from "next/router";
import ArticlesList from "../../container/dashboard/articlesList";
import userStorage from "../../utils/userStorage";

const Dashboard: NextPage = () => {
    const {userInfo}:UseUserInfoResult = useUserInfo()
    const {push} :NextRouter= useRouter()
    useEffect(() => {
        if (!userStorage.getAccessToken()) {
            push('/login').catch()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <div>
            <DashboardHeader headerTabs={
                !!userInfo ? <ProfileTab user={userInfo as UserDto}/> : undefined
            }/>
            <ArticlesList/>
        </div>
    )
}

export default Dashboard
