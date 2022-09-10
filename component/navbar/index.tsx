import {
    Avatar,
    createStyles,
    Group,
    Menu,
    Text,
    UnstyledButton,
    Box,
    Drawer,
    Burger,
    Divider,
    Accordion
} from "@mantine/core";
import {changeUrlToServerRequest} from "../../utils/helpers";
import {IconBell, IconUserCircle} from "@tabler/icons";
import React, {useState} from "react";
import useUserInfo from "../../hooks/useUserInfo";
import {UseUserInfoResult} from "../../utils/types";
import {SearchInput} from "../inputs";
import NavbarProfileItems from "./navbar.profileItems";
import {NavbarNotificationDropDown} from "./navbar.notificationDropDown";
import {NavbarProfileDropdown} from "./navbar.profileDropdown";

const useStyles = createStyles((theme) => ({
    header: {
        paddingTop: theme.spacing.sm,
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.grey[0],
        marginBottom: theme.spacing.xl,
    },

    headerBorder: {
        borderBottom: `1px solid ${theme.colors.grey[1]}`
    },

    mainSection: {
        paddingBottom: theme.spacing.sm,
    },

    user: {
        color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
        padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
        borderRadius: theme.radius.sm,
        transition: 'background-color 100ms ease',

        '&:hover': {
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
        },
    },

    desktopSize: {
        [theme.fn.smallerThan('xs')]: {
            display: 'none',
        },
    },

    mobileSize: {
        [theme.fn.largerThan('xs')]: {
            display: 'none',
        },
    },

    headerTitle: {
        fontFamily: 'Poppins',
        color: theme.colors.secondary[3],
        fontWeight: 600,
        fontSize: theme.fontSizes.lg,
        [theme.fn.smallerThan('md')]: {
            fontSize: theme.fontSizes.md,
        },
        [theme.fn.smallerThan('xs')]: {
            fontSize: theme.fontSizes.sm,
        },
    },

    drawerHeaderTitle: {
        fontFamily: 'Poppins',
        color: theme.colors.secondary[3],
        fontWeight: 600,
        fontSize: theme.fontSizes.lg,
        [theme.fn.smallerThan('md')]: {
            fontSize: theme.fontSizes.md,
        },
    },

    headerTitleIcon: {
        [theme.fn.smallerThan('xs')]: {
            display: 'none'
        },
    },

    userActive: {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
    },
}));

const Navbar = () => {
    const {userInfo: user}: UseUserInfoResult = useUserInfo()
    const {classes, cx, theme} = useStyles()
    const [mobileMenuOpened, setMobileMenuOpened] = useState<boolean>(false);
    const [userMenuOpened, setUserMenuOpened] = useState<boolean>(false);
    const [notificationOpened, setNotificationOpened] = useState<boolean>(false);

    return (
        <Group position="apart" noWrap={true}>
            <Group align={'center'} spacing={'xs'} noWrap={true}>
                <Avatar src={'/assets/images/icon.png'} size={40} radius={50}/>
                <Text className={classes.headerTitle}>
                    ArticlesLand
                </Text>
            </Group>

            <Box className={classes.desktopSize} sx={{width: '500px'}} dir={'rtl'}>
                <SearchInput sx={{color: theme.colors.grey[4]}}/>
            </Box>

            <Box className={classes.desktopSize}>
                <Group position={'left'} spacing={'xs'} align={'center'} noWrap={true}>

                    <Menu
                        width={600}
                        position="bottom-start"
                        transition="pop-top-right"
                        onClose={() => setNotificationOpened(false)}
                        onOpen={() => setNotificationOpened(true)}
                    >

                        <Menu.Target>
                            <UnstyledButton
                                className={cx(classes.user, {[classes.userActive]: notificationOpened})}
                            >
                                <Group align={'center'}>
                                    <IconBell color={theme.colors.grey[4]} size={22}/>
                                </Group>
                            </UnstyledButton>
                        </Menu.Target>

                        <NavbarNotificationDropDown isMenu={true}/>
                    </Menu>
                    <Menu
                        width={260}
                        position="bottom-start"
                        transition="pop-top-right"
                        onClose={() => setUserMenuOpened(false)}
                        onOpen={() => setUserMenuOpened(true)}
                    >

                        <Menu.Target>
                            <UnstyledButton
                                className={cx(classes.user, {[classes.userActive]: userMenuOpened})}
                            >
                                <Group spacing={7} dir={'rtl'} align={'center'}>
                                    {
                                        !!user?.avatar ? <Avatar
                                            src={changeUrlToServerRequest(user?.avatar as string)}
                                            alt={user?.username || ''} radius="xl" size={40}
                                        /> : <IconUserCircle color={theme.colors.grey[4]} size={22}/>
                                    }
                                </Group>
                            </UnstyledButton>
                        </Menu.Target>

                        <NavbarProfileDropdown/>
                    </Menu>
                </Group>
            </Box>

            <Box className={classes.mobileSize}>
                <Burger
                    opened={mobileMenuOpened}
                    onClick={() => setMobileMenuOpened((o) => !o)}
                    title={'منو'}
                    color={theme.colors.grey[4]}
                />
                <Drawer
                    overlayColor={theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2]}
                    overlayOpacity={0.55}
                    overlayBlur={3}
                    opened={mobileMenuOpened}
                    onClose={() => setMobileMenuOpened(false)}
                    dir={'ltr'}
                    styles={{title: {marginRight: 0}, closeButton: {marginLeft: 18}, drawer: {overflowY: 'auto'}}}
                    title={
                        <Group align={'center'} p={'md'} spacing={'xs'} sx={{flexWrap: 'nowrap'}}>
                            <Avatar src={'/assets/images/icon.png'} size={40} radius={50}/>
                            <Text className={classes.drawerHeaderTitle}>
                                ArticlesLand
                            </Text>
                        </Group>
                    }
                    padding={0}
                    size="xl"
                >
                    <Box>
                        <Box dir={'rtl'} px={'md'}>
                            <SearchInput/>
                        </Box>
                        <Divider mt={'sm'}/>
                        <Box dir={'rtl'}>
                            <Accordion>
                                <Accordion.Item value="profileItems">
                                    <Accordion.Control>
                                        <Group spacing={'xs'}>
                                            <IconUserCircle size={18} color={theme.colors.grey[4]}/>
                                            <Text size={'sm'} color={'grey.4'} weight={600}>اطلاعات حساب کاربری</Text>
                                        </Group>
                                    </Accordion.Control>
                                    <Accordion.Panel>
                                        <Box mb={'xs'} mt={'sm'}>
                                            <NavbarProfileItems/>
                                        </Box>
                                    </Accordion.Panel>
                                </Accordion.Item>

                                <Accordion.Item value="notifications">
                                    <Accordion.Control>
                                        <Group spacing={'xs'}>
                                            <IconBell color={theme.colors.grey[4]} size={18}/>
                                            <Text size={'sm'} color={'grey.4'} weight={600}>نوتیفیکیشن ها</Text>
                                        </Group>
                                    </Accordion.Control>
                                    <Accordion.Panel px={0}>
                                        <Box mb={'xs'} mt={'sm'} px={0}>
                                            <NavbarNotificationDropDown/>
                                        </Box>
                                    </Accordion.Panel>
                                </Accordion.Item>
                            </Accordion>
                        </Box>
                    </Box>
                </Drawer>
            </Box>
        </Group>
    )
}

export default Navbar
