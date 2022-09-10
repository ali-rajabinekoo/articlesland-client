import type {NextPage} from 'next'
import {DashboardHeader} from "../container/layout/dashboard";
import CategoriesTab from "../container/dashboard/categoriesTab";
import useUserInfo from "../hooks/useUserInfo";
import {UseUserInfoResult} from "../utils/types";

const Home: NextPage = () => {
    const {userInfo}:UseUserInfoResult = useUserInfo()
    return (
        <div>
            <DashboardHeader headerTabs={
                !!userInfo ? <CategoriesTab tabs={[
                    {displayValue: "هوش مصنوعی", value: 'ai'},
                    {displayValue: "هک و امنیت", value: 'security'},
                    {displayValue: "برنامه نویسی", value: 'programming'},
                    {displayValue: "پادکست", value: 'podcast'},
                ]}/> : <></>
            }/>
        </div>
    )
}

export default Home
