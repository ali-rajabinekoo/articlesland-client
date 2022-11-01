import {Box, Group, UnstyledButton, Text, createStyles, useMantineTheme} from "@mantine/core";
import React from "react";
import {
    IconBookmarks,
    IconChartLine,
    IconHeart,
    IconList,
    IconLogout, IconMessageReport,
    IconPencil,
    IconSettings,
    IconUser, IconUsers
} from "@tabler/icons";
import Link from "next/link";
import {LinkedItemDto, UseUserInfoResult} from "../../utils/types";
import useUserInfo from "../../hooks/useUserInfo";

const useStyles = createStyles(() => ({
    btn: {
        '&:hover': {
            backgroundColor: '#f8f9fa',
            width: "100%"
        }
    }
}))

const Item = ({label, icon, href}: LinkedItemDto) => {
    const {classes} = useStyles()
    return (
        <Box>
            <Link href={href}>
                <UnstyledButton className={classes.btn}>
                    <Group spacing={'xs'} p={'xs'}>
                        {icon}
                        <Text color={'grey.4'}>
                            {label}
                        </Text>
                    </Group>
                </UnstyledButton>
            </Link>
        </Box>
    )
}

const AdminNavbarProfileItems = () => {
    const theme = useMantineTheme()
    return <>
        <Text color={'grey.4'} size={'xs'} px={'xs'} py={'4px'}>مدیریت سامانه</Text>
        <Item
            label={'مدیریت کاربران'} href={'/admin/users'}
            icon={<IconUsers color={theme.colors.grey[4]} size={20} stroke={1.5}/>}
        />
        <Item
            label={'لیست گزارشات'} href={'/admin/reports'}
            icon={<IconMessageReport color={theme.colors.grey[4]} size={20} stroke={1.5}/>}
        />
    </>
}

class NavbarProfileItemsProps {
    isAdmin? :boolean;
}

// this component is same with headerProfileDropdown but this component does not have menu component
const NavbarProfileItems = ({isAdmin}: NavbarProfileItemsProps) => {
    const {logout}: UseUserInfoResult = useUserInfo()
    const {classes, theme} = useStyles()
    return (
        <Box>
            {isAdmin && <AdminNavbarProfileItems/>}
            <Text color={'grey.4'} size={'xs'} px={'xs'} py={'4px'}>مدیریت پست ها</Text>
            <Item
                label={'نوشتن پست جدید'} href={'/edit'}
                icon={<IconPencil color={theme.colors.grey[4]} size={20} stroke={1.5}/>}
            />
            <Item
                label={'پست های مورد علاقه'} href={'/dashboard?tab=likes'}
                icon={<IconHeart color={theme.colors.grey[4]} size={20} stroke={1.5}/>}
            />
            <Item
                label={'پست های ذخیره شده'} href={'/dashboard?tab=bookmarks'}
                icon={<IconBookmarks color={theme.colors.grey[4]} size={20} stroke={1.5}/>}
            />
            <Item
                label={'لیست ها'} href={'/categories'}
                icon={<IconList color={theme.colors.grey[4]} size={20} stroke={1.5}/>}
            />
            <Item
                label={'مشاهده آمار'} href={'/stats'}
                icon={<IconChartLine color={theme.colors.grey[4]} size={20} stroke={1.5}/>}
            />
            <Text color={'grey.4'} size={'xs'} px={'xs'} py={'4px'}>حساب کاربری</Text>
            <Item
                label={'مشاهده پروفایل'} href={'/dashboard'}
                icon={<IconUser color={theme.colors.grey[4]} size={20} stroke={1.5}/>}
            />
            <Item
                label={'تنظیمات حساب کاربری'} href={'/settings'}
                icon={<IconSettings color={theme.colors.grey[4]} size={20} stroke={1.5}/>}
            />
            <UnstyledButton className={classes.btn} onClick={() => logout()}>
                <Group spacing={'xs'} p={'xs'}>
                    <IconLogout color={theme.colors.grey[4]} size={20} stroke={1.5}/>
                    <Text color={'grey.4'}>
                        خروج
                    </Text>
                </Group>
            </UnstyledButton>
        </Box>
    )
}

export default NavbarProfileItems
