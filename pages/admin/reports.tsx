import {useEffect} from "react";
import {NextRouter, useRouter} from "next/router";
import {Container} from "@mantine/core";
import {UseUserInfoResult} from "../../utils/types";
import useUserInfo from "../../hooks/useUserInfo";
import {DashboardHeader} from "../../container/layout/dashboard";
import AdminSectionGuard from "../../guards/adminSection";
import {ReportsListAdminPage} from "../../container/admin/reportsList";

const AdminReportsListPage = () => {
    const {userInfo, getAccessToken}: UseUserInfoResult = useUserInfo()
    const {push}: NextRouter = useRouter()
    useEffect(() => {
        if (!getAccessToken() || (!!userInfo && userInfo.role !== 'admin')) {
            push('/login').catch()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <AdminSectionGuard>
            <DashboardHeader/>
            <Container size={'xl'}>
                <ReportsListAdminPage/>
            </Container>
        </AdminSectionGuard>
    )
}

export default AdminReportsListPage