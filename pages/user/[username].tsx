import {ArticleDto, PublicAPIS, UserDto} from "../../utils/types";
import {publicApis} from "../../hooks/useRequest";
import {AxiosResponse} from "axios";
import {useEffect, useState} from "react";
import {NextRouter, useRouter} from "next/router";
import useUserInfo from "../../hooks/useUserInfo";
import {DashboardHeader} from "../../container/layout/dashboard";
import UserPageTabs from "../../container/user/userPageTabs";
import UserPageArticlesList from "../../container/user/userPageArticlesList";

export async function getStaticProps({params}: any) {
    try {
        const apis: PublicAPIS = publicApis();
        const username: string = params.username;
        const response: AxiosResponse | undefined =
            await apis.user.getUserInfo(username as string)
        if (!!response?.data) {
            return {
                props: {user: response?.data as UserDto},
            };
        }
        return {
            props: {user: null},
        }
    } catch (error) {
        return {
            props: {user: null},
        }
    }
}

export async function getStaticPaths() {
    return {
        paths: ['/user/[username]'],
        fallback: true,
    };
}

class UserPageProps {
    user!: UserDto | null
}

const UserPage = ({user: defaultUser}: UserPageProps) => {
    const {push}: NextRouter = useRouter()
    const {userInfo} = useUserInfo()
    const [user, setUser] = useState<UserDto>()
    useEffect(() => {
        if (!!defaultUser) {
            if (!!userInfo && defaultUser.id === userInfo.id) {
                push(`/dashboard`).catch()
                return undefined
            }
            setUser(defaultUser)
        } else if (defaultUser === null) {
            push('/404').catch()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [defaultUser, userInfo])
    return (
        <div>
            <DashboardHeader headerTabs={
                !!user ? <UserPageTabs user={user as UserDto}/> : undefined
            }/>
            <UserPageArticlesList list={user?.articles as ArticleDto[] | undefined} owner={user}/>
        </div>
    )
}

export default UserPage
