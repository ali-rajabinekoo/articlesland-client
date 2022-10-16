import React, {useEffect, useState} from "react";
import {LoadingOverlay} from "../component/wrappers/loadingOverlay";
import useUserInfo from "../hooks/useUserInfo";
import {UseUserInfoResult} from "../utils/types";
import {useRouter} from "next/router";
import {useTimeout} from "@mantine/hooks";

class AdminSectionProps {
    children?: JSX.Element | React.ReactNode;
}

const AdminSectionGuard = ({children}:AdminSectionProps) => {
    const {push} = useRouter()
    const [visible, setVisible] = useState<boolean>(true);
    const { start, clear } = useTimeout(() => push('/login').catch(), 5000);
    const {userInfo}:UseUserInfoResult = useUserInfo()
    
    useEffect(() => {
        if (!!userInfo) {
            clear()
            if (userInfo.role !== 'admin') {
                push('/404').catch() 
            } else {
                setVisible(false)
            }
        } else {
            start()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userInfo])
    
    return <div style={{ position: 'relative' }}>
        <LoadingOverlay visible={visible} overlayBlur={60} />
        {children}
    </div>
}

export default AdminSectionGuard;