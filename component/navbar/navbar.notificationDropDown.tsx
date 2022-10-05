import {Menu} from "@mantine/core";
import React from "react";
import NavbarNotificationTable from "./navbar.notificationTable";
import {NotificationDto} from "../../utils/types";
import {useAppSelector} from "../../hooks/redux";
import {RootState} from "../../utils/app.store";

interface NavbarNotificationDropDownProps {
    isMenu?: true | false
    children?: JSX.Element | React.ReactNode | undefined
}

const NavbarNotificationDropDownHOC = ({isMenu = false, children}: NavbarNotificationDropDownProps) => {
    if (isMenu) {
        return (
            <Menu.Dropdown dir={'rtl'}>{children}</Menu.Dropdown>
        )
    }
    return <>{children}</>
}

export const NavbarNotificationDropDown = ({isMenu = false}: NavbarNotificationDropDownProps) => {
    const notifications: NotificationDto[] = useAppSelector(
        (state: RootState) => state?.userInfo?.data?.notifications || []
    )

    return (
        <NavbarNotificationDropDownHOC isMenu={isMenu}>
            <NavbarNotificationTable data={notifications}/>
        </NavbarNotificationDropDownHOC>
    )
}
