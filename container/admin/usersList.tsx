import {
    Avatar,
    Table,
    Group,
    Text,
    ActionIcon,
    Menu,
    ScrollArea,
    Badge,
    Modal,
    Center,
    useMantineTheme, Grid
} from '@mantine/core';
import {IconTrash, IconDots, IconForbid, IconAlertCircle, IconSearch, IconCheck} from '@tabler/icons';
import React, {useEffect, useMemo, useState} from "react";
import {DangerBtn, PrimaryBtn, PrimaryOutlineBtn, SecondaryOutlineBtn} from "../../component/buttons";
import useRequest from "../../hooks/useRequest";
import {changeUrlToServerRequest, errorHandler} from "../../utils/helpers";
import {APIS, UserDto} from "../../utils/types";
import {AxiosResponse} from "axios";
import {showNotification} from "@mantine/notifications";
import {appMessages} from "../../utils/messages";
import {TextInput} from "../../component/inputs";

export function UsersListAdminPage() {
    const {getApis} = useRequest()
    const theme = useMantineTheme()
    const [page, setPage] = useState<number>(1);
    const [search, setSearch] = useState<string>('');
    const [totalPages, setTotalsPage] = useState<number>();
    const [selectedUser, setSelectedUser] = useState<number>();
    const [users, setUsers] = useState<UserDto[]>([]);
    const [disableBtn, setDisableBtn] = useState<boolean>(false);
    const [blockingMode, setBlockingMode] = useState<'block' | 'unblock'>('block');
    const [userDeletionOpened, setUserDeletionOpened] = useState<boolean>(false);
    const [userBlockingOpened, setUserBlockingOpened] = useState<boolean>(false);

    const fetchUsers = async (newPage?: number): Promise<void> => {
        const apis: APIS = getApis()
        try {
            const response: AxiosResponse | undefined = await apis.admin.getAllUsers(newPage || page);
            if (!response) return showNotification({
                message: appMessages.somethingWentWrong,
                title: 'خطا',
                autoClose: 3000,
                color: 'red',
                icon: <IconAlertCircle size={20}/>
            })
            const _totalPages: number = response.data?.totalPages
            const _users: UserDto[] = response.data?.users as UserDto[]
            setUsers(!!newPage ? [...users, ..._users] : [..._users])
            setTotalsPage(_totalPages)
            if (!!_totalPages && (newPage || page) >= _totalPages) {
                setDisableBtn(true)
            }
        } catch (e) {
            errorHandler(e)
        }
    }

    const loadMore = () => {
        if (!!totalPages && page < totalPages) {
            setPage(page + 1)
            fetchUsers(page + 1).catch()
        } else if (!!totalPages && page >= totalPages) {
            setDisableBtn(true)
        }
    }

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {value} = event.currentTarget;
        setSearch(value);
    };

    const openRemoveModal = (userId: number) => {
        setSelectedUser(userId)
        setUserDeletionOpened(true)
    }

    const openBlockingModal = (userId: number, mode: 'block' | 'unblock') => {
        setBlockingMode(mode)
        setSelectedUser(userId)
        setUserBlockingOpened(true)
    }

    const removeUser = async () => {
        if (!selectedUser) return null
        const apis: APIS = getApis()
        try {
            await apis.admin.removeUserByAdmin(selectedUser as number);
            setUsers(users.filter((el) => el.id !== selectedUser))
            setSelectedUser(undefined)
            setUserDeletionOpened(false)
            showNotification({
                message: 'کاربر مورد نظر حذف شد',
                autoClose: 3000,
                color: 'green',
                icon: <IconCheck size={20}/>
            })
        } catch (e) {
            errorHandler(e)
        }
    }

    const blockOrUnblockUser = async () => {
        if (!selectedUser) return null
        const apis: APIS = getApis()
        try {
            switch (blockingMode) {
                case "block":
                    await apis.admin.blockUserByAdmin(selectedUser);
                    break;
                case "unblock":
                    await apis.admin.unblockUserByAdmin(selectedUser);
                    break;
            }
            setUsers(users.map((el) => {
                const newEl = {...el};
                if (newEl.id === selectedUser) newEl.isBlocked = blockingMode === "block";
                return newEl;
            }))
            setUserBlockingOpened(false)
            showNotification({
                message: blockingMode === 'block' ? appMessages.blocked : appMessages.unblocked,
                autoClose: 3000,
                color: 'green',
                icon: <IconCheck size={20}/>
            })
            setSelectedUser(undefined)
        } catch (e) {
            errorHandler(e)
        }
    }

    const rows = useMemo(() => {
        return users.filter((el) => {
            if (!!search) {
                return el.email?.includes(search) ||
                    el.username?.includes(search) ||
                    el.phoneNumber?.includes(search)
            }
            return true
        }).map((item: UserDto, index: number) => (
            <tr key={index}>
                <td>
                    <Group spacing="sm">
                        <Avatar
                            size={40}
                            radius={40}
                            src={!!item?.avatar ? changeUrlToServerRequest(item?.avatar) : undefined}
                        />
                        <div>
                            <Text color={'grey.4'} size="sm" weight={500}>
                                {item?.username}
                            </Text>
                        </div>
                    </Group>
                </td>
                <td>
                    <Text size="sm" color={'grey.4'} sx={{fontFamily: 'Poppins'}}>{item?.phoneNumber}</Text>
                    <Text size="xs" weight={500} color={'grey.4'} sx={{fontFamily: 'Poppins'}}>{item?.email}</Text>
                </td>
                <td>
                    <Group spacing={0} position="center">
                        {!item?.isBlocked ? (
                            <Badge sx={{width: 150, padding: '12px 0px'}}>
                                <Text color={'grey.4'} size={'xs'}>
                                    فعال
                                </Text>
                            </Badge>
                        ) : (
                            <Badge color="gray" sx={{width: 150, padding: '12px 0px'}}>
                                <Text color={'grey.4'} size={'xs'}>
                                    غیر فعال
                                </Text>
                            </Badge>
                        )}
                    </Group>
                </td>
                <td>
                    <Group spacing={0} position="right">
                        <Menu transition="pop" withArrow position="bottom-end">
                            <Menu.Target>
                                <ActionIcon>
                                    <IconDots color={theme.colors.grey[4]} size={16} stroke={1.5}/>
                                </ActionIcon>
                            </Menu.Target>
                            <Menu.Dropdown>
                                <Menu.Item
                                    icon={<IconForbid size={16} stroke={1.5}/>} color="grey.4"
                                    onClick={openBlockingModal.bind(
                                        {}, item.id as number,
                                        item.isBlocked ? 'unblock' : 'block'
                                    )}
                                >
                                    {!item.isBlocked ? 'مسدود کردن کاربر' : 'رفع مسدودی کاربر'}
                                </Menu.Item>
                                <Menu.Item
                                    icon={<IconTrash size={16} stroke={1.5}/>} color="red"
                                    onClick={openRemoveModal.bind({}, item.id as number)}
                                >
                                    حذف کاربر
                                </Menu.Item>
                            </Menu.Dropdown>
                        </Menu>
                    </Group>
                </td>
            </tr>
        ));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [users, search])

    useEffect(() => {
        fetchUsers().catch()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <Grid sx={{height: '85vh', overflowY: 'hidden'}} justify={'center'} align={'flex-start'}>
            <Grid.Col lg={6} md={7} sm={8} xs={12}>
                <TextInput
                    placeholder="جستجو"
                    mb="md"
                    icon={<IconSearch size={14} stroke={1.5}/>}
                    darker={true}
                    value={search}
                    onChange={handleSearchChange}
                />
            </Grid.Col>
            <Grid.Col xs={12} sx={{overflowY: 'hidden', height: '100%'}}>
                <ScrollArea>
                    <Table sx={{minWidth: 800}} verticalSpacing="md">
                        <thead>
                        <tr>
                            <th>
                                <Text size={'sm'} color={'grey,4'}>کاربرها</Text>
                            </th>
                            <th>
                                <Text size={'sm'} color={'grey,4'}>شماره موبایل و ایمیل</Text>
                            </th>
                            <th>
                                <Group spacing={0} position="center">
                                    <Text size={'sm'} color={'grey,4'}>وضعیت</Text>
                                </Group>
                            </th>
                            <th>
                                <Group spacing={0} position="right">
                                    <Text size={'sm'} color={'grey,4'}>گزینه ها</Text>
                                </Group>
                            </th>
                        </tr>
                        </thead>
                        <tbody>{rows}</tbody>
                    </Table>
                    <Center my={'lg'}>
                        <PrimaryOutlineBtn onClick={loadMore} text={'بیشتر'} disabled={disableBtn}/>
                    </Center>
                </ScrollArea>
                <Modal
                    opened={userDeletionOpened}
                    onClose={() => setUserDeletionOpened(false)}
                    title="حذف کاربر"
                >
                    <Text sx={{lineHeight: '1.8rem'}} color={'grey.4'} size={'sm'}>
                        آیا مطمئن هستید که می خواهید کاربر مورد نظر را حذف کنید؟
                    </Text>
                    <Group mt={'sm'} spacing={'xs'} position={'apart'}>
                        <DangerBtn onClick={removeUser} capsule={'true'} text={'حذف'}/>
                        <SecondaryOutlineBtn
                            capsule={'true'} text={'انصراف'}
                            onClick={() => setUserDeletionOpened(false)}
                        />
                    </Group>
                </Modal>
                <Modal
                    opened={userBlockingOpened}
                    onClose={() => setUserBlockingOpened(false)}
                    title={blockingMode === 'block' ? "مسدود کردن کاربر" : "رفع مسدودی کاربر"}
                >
                    <Text sx={{lineHeight: '1.8rem'}} color={'grey.4'} size={'sm'}>
                        {
                            blockingMode === 'block' ?
                                'آیا مطمئن هستید که می خواهید کاربر مورد نظر را مسدود کنید؟' :
                                'آیا مطمئن هستید که می خواهید کاربر مورد نظر را از مسدودی خارج کنید؟'
                        }
                    </Text>
                    <Group mt={'sm'} spacing={'xs'} position={'apart'}>
                        <PrimaryBtn
                            onClick={blockOrUnblockUser as any}
                            capsule={'true'}
                            text={blockingMode === 'block' ? 'مسدود کردن' : 'رفع مسدودی'}
                        />
                        <SecondaryOutlineBtn
                            capsule={'true'} text={'انصراف'}
                            onClick={() => setUserBlockingOpened(false)}
                        />
                    </Group>
                </Modal>
            </Grid.Col>
        </Grid>
    );
}