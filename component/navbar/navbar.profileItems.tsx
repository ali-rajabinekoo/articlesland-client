import {Box, Group, UnstyledButton, Text, createStyles} from "@mantine/core";
import React from "react";
import {IconBookmarks, IconChartLine, IconHeart, IconLogout, IconPencil, IconSettings, IconUser} from "@tabler/icons";
import Link from "next/link";
import {UseUserInfoResult} from "../../utils/types";
import useUserInfo from "../../hooks/useUserInfo";

const useStyles = createStyles(() => ({
    btn: {
        '&:hover': {
            backgroundColor: '#f8f9fa',
            width: "100%"
        }
    }
}))

class ItemProps {
    label!: string;
    icon!: JSX.Element;
    href!: string;
}

const Item = ({label, icon, href}: ItemProps) => {
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

// this component is same with headerProfileDropdown but this component does not have menu component
const NavbarProfileItems = () => {
    const {logout}: UseUserInfoResult = useUserInfo()
    const {classes, theme} = useStyles()
    return (
        <Box>
            <Text color={'grey.4'} size={'xs'} px={'xs'} py={'4px'}>مدیریت پست ها</Text>
            <Item
                label={'نوشتن پست جدید'} href={'/edit'}
                icon={<IconPencil color={theme.colors.grey[4]} size={20} stroke={1.5}/>}
            />
            <Item
                label={'پست های مورد علاقه'} href={'/dashboard'}
                icon={<IconHeart color={theme.colors.grey[4]} size={20} stroke={1.5}/>}
            />
            <Item
                label={'پست های ذخیره شده'} href={'/dashboard'}
                icon={<IconBookmarks color={theme.colors.grey[4]} size={20} stroke={1.5}/>}
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
