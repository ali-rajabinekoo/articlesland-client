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

export const HeaderDropdown = () => {
    return (
        <Menu.Dropdown dir={'rtl'}>
            <Menu.Label>مدیریت پست ها</Menu.Label>
            <Menu.Item icon={<IconPencil size={20} stroke={1.5}/>}>
                نوشتن پست جدید
            </Menu.Item>
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
            <Menu.Item icon={<IconUser size={20} stroke={1.5}/>}>
                مشاهده پروفایل
            </Menu.Item>
            <Menu.Item icon={<IconSettings size={20} stroke={1.5}/>}>تنظیمات حساب کاربری</Menu.Item>
            
            <Menu.Divider/>
            
            <Menu.Item icon={<IconLogout size={20} stroke={1.5}/>}>خروج</Menu.Item>
        </Menu.Dropdown>
    )
}