import {UseUserInfoResult} from "../../utils/types";
import useUserInfo from "../../hooks/useUserInfo";
import {NextRouter, useRouter} from "next/router";
import {useEffect} from "react";
import {DashboardHeader} from "../../container/layout/dashboard";
import AdminSectionGuard from "../../guards/adminSection";
import {UsersListAdminPage} from "../../container/admin/usersList";
import {Container} from "@mantine/core";

const AdminUsersListPage = () => {
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
                <UsersListAdminPage/>
            </Container>
        </AdminSectionGuard>
    )
}

export default AdminUsersListPage