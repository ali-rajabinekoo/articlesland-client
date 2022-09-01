import type {NextPage} from 'next'
import {DashboardHeader} from "../container/layout/dashboard";
import CategoriesTab from "../container/dashboard/categoriesTab";
import useUserInfo from "../hooks/useUserInfo";
import {UserDto, UseUserInfoResult} from "../utils/types";
import {ArticlesLandEditor} from "../component/inputs/index";

const Home: NextPage = () => {
    const {userInfo}:UseUserInfoResult = useUserInfo()
    return (
        <div>
            <DashboardHeader user={userInfo as UserDto} headerTabs={
                !!userInfo ? <CategoriesTab tabs={[
                    {displayValue: "هوش مصنوعی", value: 'ai'},
                    {displayValue: "هک و امنیت", value: 'security'},
                    {displayValue: "برنامه نویسی", value: 'programming'},
                    {displayValue: "پادکست", value: 'podcast'},
                ]}/> : <></>
            }/>
            <ArticlesLandEditor/>
        </div>
    )
}

export default Home
