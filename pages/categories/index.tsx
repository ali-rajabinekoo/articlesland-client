import React from "react";
import {DashboardHeader} from "../../container/layout/dashboard";
import CategoriesList from "../../container/categories/list";
import {NextPage} from "next";

const Categories: NextPage = (): JSX.Element => {
    return (
        <>
            <DashboardHeader/>
            <CategoriesList/>
        </>
    )
}

export default Categories
