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
    useMantineTheme,
    Grid,
    Stack,
    Affix,
    Box
} from '@mantine/core';
import {IconTrash, IconDots, IconForbid, IconAlertCircle, IconSearch, IconCheck} from '@tabler/icons';
import React, {useEffect, useMemo, useState} from "react";
import {DangerBtn, FilterBtn, PrimaryBtn, PrimaryOutlineBtn, SecondaryOutlineBtn} from "../../component/buttons";
import useRequest from "../../hooks/useRequest";
import {changeUrlToServerRequest, errorHandler} from "../../utils/helpers";
import {APIS, UserDto} from "../../utils/types";
import {AxiosResponse} from "axios";
import {showNotification} from "@mantine/notifications";
import {appMessages} from "../../utils/messages";
import {SelectInput, TextInput} from "../../component/inputs";
import {EmptyContent} from "../errors/empty";

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
    const [filterIsOpen, setFilterIsOpened] = useState<boolean>(false);
    const [statusFilter, setStatusFilter] = useState<'blocked' | 'notBlocked' | null>();

    const fetchUsers = async (newPage?: number, refresh?: boolean): Promise<void> => {
        const apis: APIS = getApis()
        try {
            const response: AxiosResponse | undefined =
                await apis.admin.getAllUsers(newPage || page, search, statusFilter);
            if (!response) return showNotification({
                message: appMessages.somethingWentWrong,
                title: '??????',
                autoClose: 3000,
                color: 'red',
                icon: <IconAlertCircle size={20}/>
            })
            const _totalPages: number = response.data?.totalPages
            const _users: UserDto[] = response.data?.users as UserDto[]
            setUsers(!!newPage && !refresh ? [...users, ..._users] : [..._users])
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

    const onChangeStatusFilter = (newType: 'blocked' | 'notBlocked') => {
        setStatusFilter(newType)
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
                message: '?????????? ???????? ?????? ?????? ????',
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
        return users.map((item: UserDto, index: number) => (
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
                            <Text size="xs" weight={500} color={'grey.4'}>
                                <Text mr={4} component={'span'} size="xs" weight={500} color={'grey.4'}>
                                    ?????? ????????????:
                                </Text>
                                {item?.displayName}
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
                                    ????????
                                </Text>
                            </Badge>
                        ) : (
                            <Badge color="gray" sx={{width: 150, padding: '12px 0px'}}>
                                <Text color={'grey.4'} size={'xs'}>
                                    ?????? ????????
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
                                    {!item.isBlocked ? '?????????? ???????? ??????????' : '?????? ???????????? ??????????'}
                                </Menu.Item>
                                <Menu.Item
                                    icon={<IconTrash size={16} stroke={1.5}/>} color="red"
                                    onClick={openRemoveModal.bind({}, item.id as number)}
                                >
                                    ?????? ??????????
                                </Menu.Item>
                            </Menu.Dropdown>
                        </Menu>
                    </Group>
                </td>
            </tr>
        ));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [users])

    useEffect(() => {
        fetchUsers().catch()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <Box mt={90}>
            <ScrollArea>
                <Table sx={{minWidth: 800}} verticalSpacing="md">
                    <thead>
                    <tr>
                        <th>
                            <Text size={'sm'} color={'grey,4'}>??????????????</Text>
                        </th>
                        <th>
                            <Text size={'sm'} color={'grey,4'}>?????????? ???????????? ?? ??????????</Text>
                        </th>
                        <th>
                            <Group spacing={0} position="center">
                                <Text size={'sm'} color={'grey,4'}>??????????</Text>
                            </Group>
                        </th>
                        <th>
                            <Group spacing={0} position="right">
                                <Text size={'sm'} color={'grey,4'}>?????????? ????</Text>
                            </Group>
                        </th>
                    </tr>
                    </thead>
                    <tbody>{rows}</tbody>
                </Table>
                <Center>
                    {rows.length === 0 && <EmptyContent disableBtn={true} picWidth={'300px'} title={
                        '?????? ???????????? ???????? ??????????'
                    }/>}
                </Center>
                <Center my={'lg'}>
                    <PrimaryOutlineBtn
                        onClick={loadMore} text={'??????????'}
                        sx={{display: disableBtn ? 'none' : 'block'}}
                    />
                </Center>
            </ScrollArea>
            <Modal
                opened={userDeletionOpened}
                onClose={() => setUserDeletionOpened(false)}
                title="?????? ??????????"
            >
                <Text sx={{lineHeight: '1.8rem'}} color={'grey.4'} size={'sm'}>
                    ?????? ?????????? ?????????? ???? ???? ???????????? ?????????? ???????? ?????? ???? ?????? ??????????
                </Text>
                <Group mt={'sm'} spacing={'xs'} position={'apart'}>
                    <DangerBtn size={'sm'} onClick={removeUser} capsule={'true'} text={'??????'}/>
                    <SecondaryOutlineBtn
                        capsule={'true'} text={'????????????'} size={'sm'}
                        onClick={() => setUserDeletionOpened(false)}
                    />
                </Group>
            </Modal>
            <Modal
                opened={userBlockingOpened}
                onClose={() => setUserBlockingOpened(false)}
                title={blockingMode === 'block' ? "?????????? ???????? ??????????" : "?????? ???????????? ??????????"}
            >
                <Text sx={{lineHeight: '1.8rem'}} color={'grey.4'} size={'sm'}>
                    {
                        blockingMode === 'block' ?
                            '?????? ?????????? ?????????? ???? ???? ???????????? ?????????? ???????? ?????? ???? ?????????? ??????????' :
                            '?????? ?????????? ?????????? ???? ???? ???????????? ?????????? ???????? ?????? ???? ???? ???????????? ???????? ??????????'
                    }
                </Text>
                <Group mt={'sm'} spacing={'xs'} position={'apart'}>
                    <PrimaryBtn
                        onClick={blockOrUnblockUser as any}
                        capsule={'true'} size={'sm'}
                        text={blockingMode === 'block' ? '?????????? ????????' : '?????? ????????????'}
                    />
                    <SecondaryOutlineBtn
                        capsule={'true'} text={'????????????'} size={'sm'}
                        onClick={() => setUserBlockingOpened(false)}
                    />
                </Group>
            </Modal>
            <Modal
                opened={filterIsOpen}
                onClose={() => setFilterIsOpened(false)}
                title="??????????" size={'lg'}
            >
                <Stack spacing={'md'}>
                    <TextInput
                        placeholder="??????????"
                        icon={<IconSearch size={14} stroke={1.5}/>}
                        darker={true}
                        value={search}
                        onChange={handleSearchChange}
                    />
                    <SelectInput
                        placeholder={'?????????? ?????????? ???? ???????????? ????????'}
                        data={[{value: 'notBlocked', label: '????????'}, {value: 'blocked', label: '?????? ????????'}]}
                        onChange={onChangeStatusFilter}
                        value={statusFilter}
                    />
                    <Grid gutter={'md'} justify={'space-between'} p={'sm'}>
                        <Grid.Col xs={5}>
                            <PrimaryOutlineBtn
                                onClick={() => {
                                    setPage(1)
                                    fetchUsers(1, true).catch()
                                }}
                                capsule={'true'}
                                text={'??????????'}
                                size={'sm'}
                            />
                        </Grid.Col>
                        <Grid.Col xs={5}>
                            <SecondaryOutlineBtn
                                onClick={() => {
                                    setSearch('');
                                    setStatusFilter(null);
                                }}
                                capsule={'true'}
                                text={'?????? ????????'}
                                size={'sm'}
                            />
                        </Grid.Col>
                    </Grid>
                </Stack>
            </Modal>
            <Affix position={{top: 110, left: -5}} zIndex={0}>
                <FilterBtn
                    text={'??????????'}
                    onClick={() => setFilterIsOpened(true)}
                />
            </Affix>
        </Box>
    );
}