import {Menu} from "@mantine/core";
import {
    IconHeart,
    IconLogout,
    IconSettings,
    IconUser,
    IconPencil,
    IconChartLine,
    IconBookmarks
} from "@tabler/icons";
import React from "react";
import Link from "next/link";
import useUserInfo from "../../hooks/useUserInfo";
import {UseUserInfoResult} from "../../utils/types";

export const HeaderDropdown = () => {
    const {logout} :UseUserInfoResult= useUserInfo()
    return (
        <Menu.Dropdown dir={'rtl'}>
            <Menu.Label>مدیریت پست ها</Menu.Label>
            <Link href={'/edit'}>
                <Menu.Item icon={<IconPencil size={20} stroke={1.5}/>}>
                    نوشتن پست جدید
                </Menu.Item>
            </Link>
            <Menu.Item icon={<IconHeart size={20} stroke={1.5}/>}>
                پست های مورد علاقه
            </Menu.Item>
            <Menu.Item icon={<IconBookmarks size={20} stroke={1.5}/>}>
                پست های ذخیره شده
            </Menu.Item>
            <Menu.Item icon={<IconChartLine size={20} stroke={1.5}/>}>
                مشاهده آمار
            </Menu.Item>

            <Menu.Label>حساب کاربری</Menu.Label>
            <Link href={'/dashboard'}>
                <Menu.Item icon={<IconUser size={20} stroke={1.5}/>}>
                    مشاهده پروفایل
                </Menu.Item>
            </Link>
            <Link href={'/profile'}>
                <Menu.Item icon={<IconSettings size={20} stroke={1.5}/>}>تنظیمات حساب کاربری</Menu.Item>
            </Link>

            <Menu.Divider/>

            <Menu.Item onClick={() => logout()} icon={<IconLogout size={20} stroke={1.5}/>}>خروج</Menu.Item>
        </Menu.Dropdown>
    )
}
