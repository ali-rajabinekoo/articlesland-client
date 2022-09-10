import {Menu} from "@mantine/core";
import moment from "moment-jalaali";
import React from "react";
import NavbarNotificationTable from "./navbar.notificationTable";
import {NotificationDto} from "../../utils/types";

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
    return (
        <NavbarNotificationDropDownHOC isMenu={isMenu}>
            <NavbarNotificationTable data={[
                {
                    user: {
                        avatar: '/statics/assets/avatars/e15e10bb17b9bab39faa9fc941e01180',
                        displayName: 'علی'
                    },
                    created_at: moment((new Date()).toISOString()).fromNow(),
                    type: "liked"
                }, {
                    user: {
                        avatar: '/statics/assets/avatars/e15e10bb17b9bab39faa9fc941e01180',
                        displayName: 'علی'
                    },
                    created_at: moment((new Date()).toISOString()).fromNow(),
                    type: 'comment',
                    message: "ممنون از پست خوبتون"
                }, {
                    user: {
                        avatar: '/statics/assets/avatars/e15e10bb17b9bab39faa9fc941e01180',
                        displayName: 'علی'
                    },
                    created_at: moment((new Date()).toISOString()).fromNow(),
                    type: 'followed',
                },
            ] as NotificationDto[]}/>
        </NavbarNotificationDropDownHOC>
    )
}
