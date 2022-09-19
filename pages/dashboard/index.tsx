import type {NextPage} from 'next'
import {DashboardHeader} from "../../container/layout/dashboard";
import useUserInfo from "../../hooks/useUserInfo";
import {UserDto, UseUserInfoResult} from "../../utils/types";
import ProfileTab from "../../container/dashboard/profileTab";
import {useEffect} from "react";
import {NextRouter, useRouter} from "next/router";
import ArticlesList from "../../container/dashboard/articlesList";
import {defaultProfileCategoryValues} from "../../utils/helpers";

export async function getServerSideProps(ctx: any) {
    if (!!ctx?.query?.tab) {
        if (!defaultProfileCategoryValues.includes(ctx.query.tab)) {
            return {props: {valid: false}}
        }
    }
    return {props: {valid: true}}
}

class DashboardProps {
    valid?: boolean
}

const Dashboard: NextPage = ({valid}: DashboardProps) => {
    const {userInfo, getAccessToken}: UseUserInfoResult = useUserInfo()
    const {push}: NextRouter = useRouter()
    useEffect(() => {
        if (!valid) {
            push('/404').catch()
        }
        if (!getAccessToken()) {
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
