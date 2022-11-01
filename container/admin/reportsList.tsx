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
    Affix, 
    Stack,
    Box
} from '@mantine/core';
import {IconTrash, IconDots, IconAlertCircle, IconSearch, IconCheck, IconExternalLink} from '@tabler/icons';
import React, {useEffect, useMemo, useState} from "react";
import {DangerBtn, FilterBtn, PrimaryOutlineBtn, SecondaryOutlineBtn} from "../../component/buttons";
import useRequest from "../../hooks/useRequest";
import {changeUrlToServerRequest, errorHandler, reportObject} from "../../utils/helpers";
import {APIS, ReportDto, ReportTypes, ReportTypesArray} from "../../utils/types";
import {AxiosResponse} from "axios";
import {showNotification} from "@mantine/notifications";
import {appMessages} from "../../utils/messages";
import {SelectInput, TextInput} from "../../component/inputs";
import {EmptyContent} from "../errors/empty";

export function ReportsListAdminPage() {
    const {getApis} = useRequest()
    const theme = useMantineTheme()
    const [page, setPage] = useState<number>(1);
    const [search, setSearch] = useState<string>('');
    const [filterType, setFilterType] = useState<ReportTypes | null>();
    const [filterContentType, setFilterContentType] = useState<'comment' | 'post' | null>();
    const [totalPages, setTotalsPage] = useState<number>();
    const [selectedReport, setSelectedReport] = useState<number>();
    const [reports, setReports] = useState<ReportDto[]>([]);
    const [disableBtn, setDisableBtn] = useState<boolean>(false);
    const [filterIsOpen, setFilterIsOpened] = useState<boolean>(false);
    const [reportDeletionOpened, setReportDeletionOpened] = useState<boolean>(false);

    const fetchReports = async (newPage?: number, refresh?: boolean): Promise<void> => {
        const apis: APIS = getApis()
        try {
            const response: AxiosResponse | undefined = 
                await apis.admin.getAllReports(newPage || page, search, filterType, filterContentType);
            if (!response) return showNotification({
                message: appMessages.somethingWentWrong,
                title: 'خطا',
                autoClose: 3000,
                color: 'red',
                icon: <IconAlertCircle size={20}/>
            })
            const _totalPages: number = response.data?.totalPages
            const _reports: ReportDto[] = response.data?.reports as ReportDto[]
            setReports(!!newPage && !refresh ? [...reports, ..._reports] : [..._reports])
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
            fetchReports(page + 1).catch()
        } else if (!!totalPages && page >= totalPages) {
            setDisableBtn(true)
        }
    }

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {value} = event.currentTarget;
        setSearch(value);
    };

    const onChangeFilterContentType = (newType: 'comment' | 'post') => {
        setFilterContentType(newType)
    }

    const onChangeFilterType = (newType: ReportTypes) => {
        setFilterType(newType)
    }

    const openRemoveModal = (userId: number) => {
        setSelectedReport(userId)
        setReportDeletionOpened(true)
    }

    const removeReport = async () => {
        if (!selectedReport) return null
        const apis: APIS = getApis()
        try {
            await apis.admin.removeReportById(selectedReport as number);
            setReports(reports.filter((el) => el.id !== selectedReport))
            setSelectedReport(undefined)
            setReportDeletionOpened(false)
            showNotification({
                message: 'گزارش مورد نظر حذف شد',
                autoClose: 3000,
                color: 'green',
                icon: <IconCheck size={20}/>
            })
        } catch (e) {
            errorHandler(e)
        }
    }

    const rows = useMemo(() => {
        return reports.map((item: ReportDto, index: number) => (
            <tr key={index}>
                <td>
                    <Group spacing="sm" noWrap={true}>
                        <Avatar
                            size={40}
                            radius={40}
                            src={!!item?.owner?.avatar ? changeUrlToServerRequest(item?.owner?.avatar) : undefined}
                        />
                        <div>
                            <Text color={'grey.4'} size="sm" weight={500}>
                                {item?.owner?.username}
                            </Text>
                            <Text size="xs" weight={500} color={'grey.4'}>
                                <Text mr={4} component={'span'} size="xs" weight={500} color={'grey.4'}>
                                    نام نمایشی:
                                </Text>
                                {item?.owner?.displayName}
                            </Text>
                        </div>
                    </Group>
                </td>
                <td>
                    <Text size="sm" color={'grey.4'}>
                        {!!item?.type ? reportObject[item?.type] : ''}
                    </Text>
                    <Text
                        sx={{display: item?.type === 'other' ? 'block' : 'none'}}
                        size="xs" weight={500} color={'grey.4'}
                    >
                        {item?.content}
                    </Text>
                    <Text
                        sx={{
                            display: !!item?.comment ? 'block' : 'none',
                            maxWidth: '500px',
                            overflow: 'hidden',
                            textOverflow: "ellipsis",
                            textAlign: 'left',
                            whiteSpace: 'nowrap',
                        }}
                        size="xs" weight={500} color={'grey.4'}
                    >
                        <Text mr={4} component={'span'} size="xs" weight={500} color={'grey.4'}>
                            متن نظر:
                        </Text>
                        {item?.comment?.body}
                    </Text>
                </td>
                <td>
                    <Group spacing={0} position="center">
                        {!!item?.article ? (
                            <Badge sx={{width: 150, padding: '12px 0px'}}>
                                <Text color={'grey.4'} size={'xs'}>
                                    پست
                                </Text>
                            </Badge>
                        ) : (
                            <Badge color="gray" sx={{width: 150, padding: '12px 0px'}}>
                                <Text color={'grey.4'} size={'xs'}>
                                    نظر
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
                                    icon={<IconExternalLink size={16} stroke={1.5}/>}
                                    color={theme.colors.grey[4]}
                                    onClick={() => {
                                        if (!item?.article && !item?.comment) return null
                                        window?.open(
                                            !!item?.article ?
                                                `/post/${item?.article?.owner?.username}/${item.article?.id}` :
                                                `/post/${item?.owner?.username}/${item?.comment?.article?.id}`,
                                            '_blank'
                                        )?.focus()
                                    }}
                                >
                                    لینک {!!item?.article ? 'پست' : 'نظر'}
                                </Menu.Item>
                                <Menu.Item
                                    icon={<IconTrash size={16} stroke={1.5}/>} color="red"
                                    onClick={openRemoveModal.bind({}, item.id as number)}
                                >
                                    حذف گزارش
                                </Menu.Item>
                            </Menu.Dropdown>
                        </Menu>
                    </Group>
                </td>
            </tr>
        ));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [reports])

    useEffect(() => {
        fetchReports().catch()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <Box mt={90}>
            <ScrollArea>
                <Table sx={{minWidth: 800}} verticalSpacing="md">
                    <thead>
                    <tr>
                        <th>
                            <Text size={'sm'} color={'grey,4'}>کاربرها</Text>
                        </th>
                        <th>
                            <Text size={'sm'} color={'grey,4'}>نوع گزارش تخلف</Text>
                        </th>
                        <th>
                            <Group spacing={0} position="center">
                                <Text size={'sm'} color={'grey,4'}>نوع محتوا</Text>
                            </Group>
                        </th>
                        <th>
                            <Group spacing={0} position="right">
                                <Text size={'sm'} color={'grey,4'}>گزینه‌ها</Text>
                            </Group>
                        </th>
                    </tr>
                    </thead>
                    <tbody>{rows}</tbody>
                </Table>
                <Center>
                    {rows.length === 0 && <EmptyContent disableBtn={true} picWidth={'300px'} title={
                        'هیچ گزارشی وجود ندارد'
                    }/>}
                </Center>
                <Center my={'lg'}>
                    <PrimaryOutlineBtn
                        onClick={loadMore} text={'بیشتر'}
                        sx={{display: disableBtn || rows.length === 0 ? 'none' : 'block'}}
                    />
                </Center>
            </ScrollArea>
            
            <Modal
                opened={reportDeletionOpened}
                onClose={() => setReportDeletionOpened(false)}
                title="حذف گزارش"
            >
                <Text sx={{lineHeight: '1.8rem'}} color={'grey.4'} size={'sm'}>
                    آیا مطمئن هستید که می خواهید گزارش مورد نظر را حذف کنید؟
                </Text>
                <Grid gutter={'md'} justify={'space-between'} p={'sm'}>
                    <Grid.Col xs={5}>
                        <DangerBtn onClick={removeReport} capsule={'true'} text={'حذف'}/>
                    </Grid.Col>
                    <Grid.Col xs={5}>
                        <SecondaryOutlineBtn
                            capsule={'true'} text={'انصراف'}
                            onClick={() => setReportDeletionOpened(false)}
                        />
                    </Grid.Col>
                </Grid>
            </Modal>
            <Modal
                opened={filterIsOpen}
                onClose={() => setFilterIsOpened(false)}
                title="فیلتر" size={'lg'}
            >
                <Stack spacing={'md'}>
                    <TextInput
                        placeholder="جستجو"
                        icon={<IconSearch size={14} stroke={1.5}/>}
                        darker={true}
                        value={search}
                        onChange={handleSearchChange}
                    />
                    <SelectInput
                        placeholder={'نوع گزارش را انتخاب کنید'}
                        data={ReportTypesArray.map((el) => ({value: el, label: reportObject[el as ReportTypes]}))}
                        onChange={onChangeFilterType}
                        value={filterType}
                    />
                    <SelectInput
                        placeholder={'نوع محتوا را انتخاب کنید'}
                        data={[{value: 'post', label: 'پست'}, {value: 'comment', label: 'نظر'}]}
                        onChange={onChangeFilterContentType}
                        value={filterContentType}
                    />
                    <Grid gutter={'md'} justify={'space-between'} p={'sm'}>
                        <Grid.Col xs={5}>
                            <PrimaryOutlineBtn
                                onClick={() => {
                                    setPage(1)
                                    fetchReports(1, true).catch()
                                }}
                                capsule={'true'}
                                text={'اعمال'}
                                size={'sm'}
                            />
                        </Grid.Col>
                        <Grid.Col xs={5}>
                            <SecondaryOutlineBtn
                                onClick={() => {
                                    setSearch('');
                                    setFilterType(null);
                                    setFilterContentType(null);
                                }}
                                capsule={'true'}
                                text={'پاک کردن'}
                                size={'sm'}
                            />
                        </Grid.Col>
                    </Grid>
                </Stack>
            </Modal>
            <Affix position={{top: 110, left: -5}} zIndex={0}>
                <FilterBtn
                    text={'فیلتر'}
                    onClick={() => setFilterIsOpened(true)}
                />
            </Affix>
        </Box>
    );
}