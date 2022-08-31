import type {NextPage} from 'next'
import {DashboardHeader} from "../../container/layout/dashboard";
import useUserInfo from "../../hooks/useUserInfo";
import {UserDto, UseUserInfoResult} from "../../utils/types";
import ProfileTab from "../../container/dashboard/profileTab";
import {useEffect} from "react";
import {NextRouter, useRouter} from "next/router";
import ArticlesList from "../../container/dashboard/articlesList";

const Dashboard: NextPage = () => {
    const {userInfo, getAccessToken}:UseUserInfoResult = useUserInfo()
    const {push} :NextRouter= useRouter()
    useEffect(() => {
        if (!getAccessToken()) {
            push('/login').catch()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <div>
            <DashboardHeader user={userInfo as UserDto} headerTabs={
                !!userInfo ? <ProfileTab user={userInfo as UserDto}/> : <></>
            }/>
            <ArticlesList/>
        </div>
    )
}

export default Dashboard
