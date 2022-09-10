import React from "react";
import {DashboardHeader} from "../../container/layout/dashboard";
import CategoriesList from "../../container/categories/list";

const Categories = (): JSX.Element => {
    return (
        <>
            <DashboardHeader/>
            <CategoriesList/>
        </>
    )
}

export default Categories
