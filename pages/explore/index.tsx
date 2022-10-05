import React from "react";
import {NextPage} from "next";
import {RootState} from "../../utils/app.store";
import {useAppSelector} from "../../hooks/redux";
import {DashboardHeader} from "../../container/layout/dashboard";
import HomeArticlesList from "../../container/home/homeArticlesList";

const Explore:NextPage = () => {
    const searchInputValue: string = useAppSelector((state: RootState) => state.searchInput.value)

    return (
        <>
            <DashboardHeader/>
            <HomeArticlesList isExplorePage={true} searchValue={searchInputValue}/>
        </>
    )
}

export default Explore