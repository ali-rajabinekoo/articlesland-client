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
    Accordion, Grid
} from "@mantine/core";
import {changeUrlToServerRequest, defaultProfileCategoryItem} from "../../utils/helpers";
import {IconBell, IconList, IconUserCircle} from "@tabler/icons";
import React, {useEffect, useState} from "react";
import useUserInfo from "../../hooks/useUserInfo";
import {CategoryDto, LinkedItemDto, UseUserInfoResult} from "../../utils/types";
import {SearchInput} from "../inputs";
import NavbarProfileItems from "./navbar.profileItems";
import {NavbarNotificationDropDown} from "./navbar.notificationDropDown";
import {NavbarProfileDropdown} from "./navbar.profileDropdown";
import {PrimaryBtn, PrimaryOutlineBtn} from "../buttons";
import Link from "next/link";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {AppDispatch, RootState} from "../../utils/app.store";
import {NextRouter, useRouter} from "next/router";
import NavbarListItems from "./navbar.list";
import {setSearchInput} from "../../reducers/searchInput";

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
    const userCategories: CategoryDto[] = useAppSelector((state: RootState) => state.userCategories.list)
    const searchInputValue: string = useAppSelector((state: RootState) => state.searchInput.value)
    const {userInfo: user}: UseUserInfoResult = useUserInfo()
    const {classes, cx, theme} = useStyles()
    const [userCategoryItem, setUserCategoryItems] = useState<LinkedItemDto[]>([]);
    const [profileItem, setProfileItems] = useState<LinkedItemDto[]>([]);
    const [mobileMenuOpened, setMobileMenuOpened] = useState<boolean>(false);
    const [userMenuOpened, setUserMenuOpened] = useState<boolean>(false);
    const [notificationOpened, setNotificationOpened] = useState<boolean>(false);
    const {pathname}: NextRouter = useRouter()
    const dispatch: AppDispatch = useAppDispatch()
    
    const onChangeInput = (value: string) => {
        dispatch(setSearchInput(value))
    }

    useEffect(() => {
        if (!!pathname) {
            switch (pathname) {
                case '/':
                    setUserCategoryItems(userCategories.map((category: CategoryDto) => {
                        return {
                            label: category.displayTitle,
                            href: `/?list=${category.title}`,
                        } as LinkedItemDto
                    }))
                    break;
                case '/dashboard':
                    setProfileItems(defaultProfileCategoryItem)
                    break;
                default:
                    setUserCategoryItems([])
                    setProfileItems([])
                    break;
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pathname])

    return (
        <Group position="apart" noWrap={true}>
            <Link href={'/'}>
                <Group align={'center'} spacing={'xs'} noWrap={true} sx={{cursor: "pointer"}}>
                    <Avatar src={'/assets/images/icon.png'} size={40} radius={50}/>
                    <Text className={classes.headerTitle}>
                        ArticlesLand
                    </Text>
                </Group>
            </Link>


            <Box className={classes.desktopSize} sx={{width: '500px'}} dir={'rtl'}>
                <SearchInput sx={{color: theme.colors.grey[4]}} onClickBtn={onChangeInput} defaultValue={searchInputValue} />
            </Box>

            <Box className={classes.desktopSize} sx={!!user ? {display: "none !important"} : {}}>
                <Group align={'center'} spacing={'xs'} noWrap={true}>
                    <Link href={'/login'}>
                        <PrimaryBtn text={'ورود'}/>
                    </Link>
                    <Link href={'/registration'}>
                        <PrimaryOutlineBtn text={'ثبت نام'}/>
                    </Link>
                </Group>
            </Box>

            <Box className={classes.desktopSize} sx={!user ? {display: "none !important"} : {}}>
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

                        <NavbarProfileDropdown isAdmin={user?.role === 'admin'}/>
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
                        <Link href={'/'}>
                            <Group
                                align={'center'} p={'md'} spacing={'xs'}
                                sx={{flexWrap: 'nowrap', cursor: "pointer"}}
                            >
                                <Avatar src={'/assets/images/icon.png'} size={40} radius={50}/>
                                <Text className={classes.drawerHeaderTitle}>
                                    ArticlesLand
                                </Text>
                            </Group>
                        </Link>
                    }
                    padding={0}
                    size="xl"
                >
                    <Box>
                        <Box dir={'rtl'} px={'md'}>
                            <SearchInput onClickBtn={onChangeInput} value={searchInputValue} defaultValue={searchInputValue}/>
                        </Box>
                        <Divider mt={'sm'}/>
                        <Box p={'md'} sx={!!user ? {display: "none !important"} : {}}>
                            <Grid align={'center'} gutter={'sm'}>
                                <Grid.Col xs={6}>
                                    <Link href={'/login'}>
                                        <PrimaryBtn text={'ورود'}/>
                                    </Link>
                                </Grid.Col>
                                <Grid.Col xs={6}>
                                    <Link href={'/registration'}>
                                        <PrimaryOutlineBtn text={'ثبت نام'}/>
                                    </Link>
                                </Grid.Col>
                            </Grid>
                        </Box>
                        <Box sx={!user ? {display: "none !important"} : {}}>
                            <Box dir={'rtl'}>
                                <Accordion>
                                    <Accordion.Item value="profileItems">
                                        <Accordion.Control>
                                            <Group spacing={'xs'}>
                                                <IconUserCircle size={18} color={theme.colors.grey[4]}/>
                                                <Text size={'sm'} color={'grey.4'} weight={600}>
                                                    حساب کاربری
                                                </Text>
                                            </Group>
                                        </Accordion.Control>
                                        <Accordion.Panel>
                                            <Box mb={'xs'} mt={'sm'}>
                                                <NavbarProfileItems isAdmin={user?.role === 'admin'}/>
                                            </Box>
                                        </Accordion.Panel>
                                    </Accordion.Item>

                                    <Accordion.Item value="notifications">
                                        <Accordion.Control>
                                            <Group spacing={'xs'}>
                                                <IconBell color={theme.colors.grey[4]} size={18}/>
                                                <Text size={'sm'} color={'grey.4'} weight={600}>
                                                    نوتیفیکیشن ها
                                                </Text>
                                            </Group>
                                        </Accordion.Control>
                                        <Accordion.Panel px={0}>
                                            <Box mb={'xs'} mt={'sm'} px={0}>
                                                <NavbarNotificationDropDown/>
                                            </Box>
                                        </Accordion.Panel>
                                    </Accordion.Item>

                                    {
                                        userCategoryItem.length !== 0 &&
                                        <Accordion.Item value="categories">
                                            <Accordion.Control>
                                                <Group spacing={'xs'}>
                                                    <IconList color={theme.colors.grey[4]} size={18}/>
                                                    <Text size={'sm'} color={'grey.4'} weight={600}>
                                                        لیست ها
                                                    </Text>
                                                </Group>
                                            </Accordion.Control>
                                            <Accordion.Panel px={0}>
                                                <Box mb={'xs'} mt={'sm'} px={0}>
                                                    <NavbarListItems
                                                        items={userCategoryItem}
                                                        onClickClose={() => setMobileMenuOpened(false)}
                                                    />
                                                </Box>
                                            </Accordion.Panel>
                                        </Accordion.Item>
                                    }

                                    {
                                        profileItem.length !== 0 &&
                                        <Accordion.Item value="categories">
                                            <Accordion.Control>
                                                <Group spacing={'xs'}>
                                                    <IconList color={theme.colors.grey[4]} size={18}/>
                                                    <Text size={'sm'} color={'grey.4'} weight={600}>
                                                        گزینه ها
                                                    </Text>
                                                </Group>
                                            </Accordion.Control>
                                            <Accordion.Panel px={0}>
                                                <Box mb={'xs'} mt={'sm'} px={0}>
                                                    <NavbarListItems
                                                        items={profileItem}
                                                        onClickClose={() => setMobileMenuOpened(false)}
                                                    />
                                                </Box>
                                            </Accordion.Panel>
                                        </Accordion.Item>
                                    }
                                </Accordion>
                            </Box>
                        </Box>
                    </Box>
                </Drawer>
            </Box>
        </Group>
    )
}

export default Navbar
