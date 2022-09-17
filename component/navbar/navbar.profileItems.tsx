import {Box, Group, UnstyledButton, Text, createStyles} from "@mantine/core";
import React from "react";
import {
    IconBookmarks,
    IconChartLine,
    IconHeart,
    IconList,
    IconLogout,
    IconPencil,
    IconSettings,
    IconUser
} from "@tabler/icons";
import Link from "next/link";
import {LinkedItemDto} from "../../utils/types";
import userStorage from "../../utils/userStorage";

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

// this component is same with headerProfileDropdown but this component does not have menu component
const NavbarProfileItems = () => {
    const {classes, theme} = useStyles()
    return (
        <Box>
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
            <UnstyledButton className={classes.btn} onClick={() => userStorage.logout()}>
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
