import {NextPage} from "next";
import React from "react";
import {DashboardHeader} from "../../container/layout/dashboard";
import StatsTable from "../../container/stats/stats.table";

const Stats: NextPage = () => {
    return (
        <div>
            <DashboardHeader/>
            <StatsTable/>
        </div>
    )
}

export default Stats;