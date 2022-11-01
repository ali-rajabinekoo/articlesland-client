import React, {useEffect, useState} from 'react';
import {
    createStyles,
    Table,
    Box,
    UnstyledButton,
    Group,
    Text,
    Center,
    Grid,
} from '@mantine/core';
import {keys} from '@mantine/utils';
import {IconSelector, IconChevronDown, IconChevronUp, IconSearch} from '@tabler/icons';
import {StatsTableRowData} from "../../utils/types";
import {ScrollContainer, TextInput} from "../inputs";

const useStyles = createStyles((theme) => ({
    th: {
        padding: '0 !important',
    },

    control: {
        width: '100%',
        padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,

        '&:hover': {
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
        },
    },

    icon: {
        width: 21,
        height: 21,
        borderRadius: 21,
    },
}));

interface TableSortProps {
    data: StatsTableRowData[];
}

interface ThProps {
    children: React.ReactNode;
    reversed: boolean;
    sorted?: boolean | number;
    onSort?: () => void | undefined;
}

function Th({children, reversed, sorted, onSort}: ThProps) {
    const {classes} = useStyles();
    const Icon = sorted ? (reversed ? IconChevronUp : IconChevronDown) : IconSelector;
    return (
        <th className={classes.th}>
            <UnstyledButton onClick={onSort} className={classes.control}>
                <Group position="apart">
                    <Text weight={500} size="sm">
                        {children}
                    </Text>
                    <Center className={classes.icon}>
                        <Icon size={14} stroke={1.5}/>
                    </Center>
                </Group>
            </UnstyledButton>
        </th>
    );
}

function filterData(data: StatsTableRowData[], search: string) {
    const query = search?.toLowerCase().trim();
    return data.filter((item) =>
        keys(data[0]).some((key) => String(item[key]).toLowerCase().includes(query))
    );
}

function sortData(
    data: StatsTableRowData[],
    payload: { sortBy: keyof StatsTableRowData | null; reversed: boolean; search: string }
) {
    const {sortBy} = payload;

    if (!sortBy) {
        return filterData(data, payload.search);
    }

    return filterData(
        [...data].sort((a, b) => {
            if (payload.reversed) {
                if (typeof b[sortBy] === 'number' && typeof a[sortBy] === 'number') {
                    return Number(b[sortBy]) - Number(a[sortBy])
                }
                return (b[sortBy] as string).localeCompare(a[sortBy] as string);
            }

            if (typeof b[sortBy] === 'number' && typeof a[sortBy] === 'number') {
                return Number(a[sortBy]) - Number(b[sortBy])
            }
            return (a[sortBy] as string).localeCompare(b[sortBy] as string);
        }),
        payload.search
    );
}

export function TableStatsComponent({data = []}: TableSortProps) {
    const [search, setSearch] = useState('');
    const [sortedData, setSortedData] = useState<StatsTableRowData[]>([]);
    const [sortBy, setSortBy] = useState<keyof StatsTableRowData | null>(null);
    const [reverseSortDirection, setReverseSortDirection] = useState(false);

    const setSorting = (field: keyof StatsTableRowData) => {
        const reversed = field === sortBy ? !reverseSortDirection : false;
        setReverseSortDirection(reversed);
        setSortBy(field);
        setSortedData(sortData(data, {sortBy: field, reversed, search}));
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {value} = event.currentTarget;
        setSearch(value);
        setSortedData(sortData(data, {sortBy, reversed: reverseSortDirection, search: value}));
    };

    useEffect(() => {
        setSortedData([...data] as StatsTableRowData[])
    }, [data])

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
                <ScrollContainer sx={{maxHeight: '70vh', overflowY: 'auto'}} scroll={'y'}>
                    <Box>
                        <Table
                            horizontalSpacing="md"
                            verticalSpacing="xs"
                            sx={{tableLayout: 'fixed', width: '100%'}}
                        >
                            <thead>
                            <tr>
                                <Th
                                    sorted={sortBy === 'title'}
                                    reversed={reverseSortDirection}
                                    onSort={() => setSorting('title')}
                                >
                                    <Text color={'grey.4'} weight={700} size={'sm'} py={'xs'}>عنوان پست</Text>
                                </Th>
                                <Th
                                    sorted={sortBy === 'todayView'}
                                    reversed={reverseSortDirection}
                                    onSort={() => setSorting('todayView')}
                                >
                                    <Text color={'grey.4'} weight={700} size={'sm'} py={'xs'}>بازدید های امروز</Text>
                                </Th>
                                <Th
                                    sorted={sortBy === 'viewed'}
                                    reversed={reverseSortDirection}
                                    onSort={() => setSorting('viewed')}
                                >
                                    <Text color={'grey.4'} weight={700} size={'sm'} py={'xs'}>بازدید کل</Text>
                                </Th>
                            </tr>
                            </thead>
                            <tbody>
                            {sortedData.length > 0 ? (
                                sortedData.map((row, index: number) => (
                                    <tr key={index}>
                                        <td>
                                            <Text color={'grey.4'} weight={400} size={'sm'} py={'xs'}>
                                                {row.title}
                                            </Text>
                                        </td>
                                        <td>
                                            <Text color={'grey.4'} weight={400} size={'sm'} py={'xs'}>
                                                {row.todayView}
                                            </Text>
                                        </td>
                                        <td>
                                            <Text color={'grey.4'} weight={400} size={'sm'} py={'xs'}>
                                                {row.viewed}
                                            </Text>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    {Array.isArray(data) && !!data[0] && <td colSpan={Object.keys(data[0]).length}>
                                        <Text weight={500} align="center">
                                            مقاله ای یافت نشد
                                        </Text>
                                    </td>}
                                </tr>
                            )}
                            </tbody>
                        </Table>
                    </Box>
                </ScrollContainer>
            </Grid.Col>
        </Grid>
    );
}