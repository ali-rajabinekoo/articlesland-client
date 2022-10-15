import {Menu, Text, useMantineTheme} from "@mantine/core";
import {
    IconHeart,
    IconLogout,
    IconSettings,
    IconUser,
    IconPencil,
    IconChartLine,
    IconBookmarks, IconList, IconUsers
} from "@tabler/icons";
import React from "react";
import Link from "next/link";
import useUserInfo from "../../hooks/useUserInfo";
import {UseUserInfoResult} from "../../utils/types";

const AdminNavbarProfileDropdown = () => {
    const theme = useMantineTheme();
    return (
        <>
            <Menu.Label>
                <Text color={'grey.4'} size={'xs'}>مدیریت سامانه</Text>
            </Menu.Label>
            <Link href={'/admin/users'}>
                <Menu.Item icon={<IconUsers color={theme.colors.grey[4]} size={20} stroke={1.5}/>}>
                    <Text color={'grey.4'}>مدیریت کاربران</Text>
                </Menu.Item>
            </Link>
        </>
    )
}

class NavbarProfileDropdownProps {
    isAdmin?: boolean;
}

export const NavbarProfileDropdown = ({isAdmin}: NavbarProfileDropdownProps) => {
    const {logout}: UseUserInfoResult = useUserInfo()
    const theme = useMantineTheme();
    return (
        <Menu.Dropdown dir={'rtl'}>
            
            {isAdmin && <AdminNavbarProfileDropdown/>}
            
            <Menu.Label>
                <Text color={'grey.4'} size={'xs'}>مدیریت پست ها</Text>
            </Menu.Label>
            <Link href={'/edit'}>
                <Menu.Item icon={<IconPencil color={theme.colors.grey[4]} size={20} stroke={1.5}/>}>
                    <Text color={'grey.4'}>نوشتن پست جدید</Text>
                </Menu.Item>
            </Link>
            <Link href={'/dashboard?tab=likes'}>
                <Menu.Item icon={<IconHeart color={theme.colors.grey[4]} size={20} stroke={1.5}/>}>
                    <Text color={'grey.4'}>پست های مورد علاقه</Text>
                </Menu.Item>
            </Link>
            <Link href={'/dashboard?tab=bookmarks'}>
                <Menu.Item icon={<IconBookmarks color={theme.colors.grey[4]} size={20} stroke={1.5}/>}>
                    <Text color={'grey.4'}>پست های ذخیره شده</Text>
                </Menu.Item>
            </Link>
            <Link href={'/categories'}>
                <Menu.Item icon={<IconList color={theme.colors.grey[4]} size={20} stroke={1.5}/>}>
                    <Text color={'grey.4'}>لیست ها</Text>
                </Menu.Item>
            </Link>
            <Link href={'/stats'}>
                <Menu.Item icon={<IconChartLine color={theme.colors.grey[4]} size={20} stroke={1.5}/>}>
                    <Text color={'grey.4'}>مشاهده آمار</Text>
                </Menu.Item>
            </Link>

            <Menu.Label>
                <Text color={'grey.4'} size={'xs'}> حساب کاربری</Text>
            </Menu.Label>
            <Link href={'/dashboard'}>
                <Menu.Item icon={<IconUser color={theme.colors.grey[4]} size={20} stroke={1.5}/>}>
                    <Text color={'grey.4'}>مشاهده پروفایل</Text>
                </Menu.Item>
            </Link>
            <Link href={'/profile'}>
                <Menu.Item icon={<IconSettings color={theme.colors.grey[4]} size={20} stroke={1.5}/>}>
                    <Text color={'grey.4'}>تنظیمات حساب کاربری</Text>
                </Menu.Item>
            </Link>

            <Menu.Divider/>

            <Menu.Item onClick={() => logout()}
                       icon={<IconLogout color={theme.colors.grey[4]} size={20} stroke={1.5}/>}>
                <Text color={'grey.4'}>خروج</Text>
            </Menu.Item>
        </Menu.Dropdown>
    )
}
