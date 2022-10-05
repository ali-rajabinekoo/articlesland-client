import React, {useEffect, useState} from "react";
import {Accordion, Affix, Box, Divider, Drawer, ScrollArea, Text} from "@mantine/core";
import {FilterBtn, PrimaryOutlineBtn} from "../../component/buttons";
import CategoriesFilter from "../../component/tables/categoriesFilter";
import {RootState} from "../../utils/app.store";
import {useAppSelector} from "../../hooks/redux";
import {CategoryDto, PublicAPIS, UserDto} from "../../utils/types";
import {SearchInput} from "../../component/inputs";
import queryString from 'query-string';
import {NextRouter, useRouter} from "next/router";
import OtherFeaturesFilter from "../../component/tables/otherFeaturesFilter";
import {errorHandler, validFeaturesFilter} from "../../utils/helpers";
import UsersFilter from "../../component/tables/usersFilter";
import {publicApis} from "../../hooks/useRequest";
import {AxiosResponse} from "axios";
import {showNotification} from "@mantine/notifications";
import {IconAlertCircle} from "@tabler/icons";

const FiltersDrawer = () => {
    const [opened, setOpened] = useState<boolean>(false);
    const [categoriesList, setCategoriesList] = useState<CategoryDto[]>([]);
    const [usersList, setUsersList] = useState<UserDto[]>([]);
    const [searchUsersValue, setSearchUsersValue] = useState<string>('');
    const [totalPage, setTotalPage] = useState<number>();
    const [page, setPage] = useState<number>(1);
    const [selectedCategories, setSelectedCategories] = useState<{ [key: string]: boolean }>({});
    const [selectedUsers, setSelectedUsers] = useState<{ [key: string]: boolean }>({});
    const [selectedOtherFeatures, setSelectedOtherFeatures] = useState<{ [key: string]: boolean }>({
        mostPopular: false,
    });
    const categories: CategoryDto[] = useAppSelector((state: RootState) => state.categories.list);
    const {query, push}: NextRouter = useRouter()

    const onChangeCategoriesSearch = (value: string) => {
        setCategoriesList(
            !!value.trim() ?
                categories.filter((el: CategoryDto) => el.displayTitle?.includes(value)) :
                categories
        )
    }

    const onChangeUsersSearch = (value: string) => {
        setSearchUsersValue(value)
    }

    const onClickCategory = (id: number) => {
        const selected: { [key: string]: boolean } = {...selectedCategories};
        const categoryId = String(id);
        if (selected[categoryId]) {
            delete selected[categoryId];
        } else {
            selected[categoryId] = true;
        }
        setSelectedCategories(selected)

        const queryInstance = {...query};
        queryInstance.categories = Object.keys(selected).join(',')
        push(`/explore?${queryString.stringify(queryInstance)}`).catch()
    }

    const onSelectUser = (id: number) => {
        const selected: { [key: string]: boolean } = {...selectedUsers};
        const userId = String(id);
        if (selected[userId]) {
            delete selected[userId];
        } else {
            selected[userId] = true;
        }
        setSelectedUsers(selected)

        const queryInstance = {...query};
        queryInstance.users = Object.keys(selected).join(',')
        push(`/explore?${queryString.stringify(queryInstance)}`).catch()
    }

    const onChangeOtherFeatures = (key: string) => {
        switch (key) {
            case 'mostPopular':
                const newSelectedFeatures: { [key: string]: boolean } = {
                    ...selectedOtherFeatures,
                    mostPopular: !selectedOtherFeatures.mostPopular
                }
                setSelectedOtherFeatures(newSelectedFeatures);
                const queryInstance = {...query};
                const selectedArray = []
                for (const key in newSelectedFeatures) {
                    if (newSelectedFeatures[key]) {
                        selectedArray.push(key)
                    }
                }
                queryInstance.features = selectedArray.join(',')
                push(`/explore?${queryString.stringify(queryInstance)}`).catch()
                break;
        }
    }

    const fetchUsersList = async (newPage?: number | undefined): Promise<void> => {
        const apis: PublicAPIS = publicApis()
        try {
            const response: AxiosResponse | undefined =
                await apis.user.usersList(searchUsersValue || undefined, newPage || page);
            if (!response?.data?.users || !response?.data?.totalPages) {
                showNotification({
                    message: 'عنوان پست الزامیست',
                    title: 'خطا',
                    autoClose: 3000,
                    color: 'red',
                    icon: <IconAlertCircle size={20}/>
                })
                return undefined
            }
            const data: UserDto[] = Array.isArray(response?.data?.users) ? response.data?.users as UserDto[] : [];
            const totalPageResponse: number = response?.data?.totalPages as number;
            setUsersList(!!newPage ? [...usersList, ...(data || [])] : data || []);
            setTotalPage(totalPageResponse);
        } catch (e) {
            errorHandler(e)
        }
    }

    const nextPageHandler = () => {
        const newPage: number = page + 1;
        setPage(newPage)
        fetchUsersList(newPage).catch()
    }

    useEffect(() => {
        setCategoriesList(categories)
    }, [categories])

    useEffect(() => {
        if (typeof (query?.categories) === 'string') {
            const categoriesArray = query.categories.split(',')
            const categoriesObject: { [key: string]: boolean } = {}
            for (const categoryId of categoriesArray) {
                categoriesObject[categoryId] = true;
            }
            setSelectedCategories(categoriesObject)
        }
        if (typeof (query?.users) === 'string') {
            const usersArray = query.users.split(',')
            const usersObject: { [key: string]: boolean } = {}
            for (const categoryId of usersArray) {
                usersObject[categoryId] = true;
            }
            setSelectedUsers(usersObject)
        }
        if (typeof (query?.features) === 'string') {
            const featuresArray = query.features.split(',')
            const featuresObject: { [key: string]: boolean } = {}
            for (const feature of featuresArray) {
                if (validFeaturesFilter.includes(feature)) {
                    featuresObject[feature] = true;
                }
            }
            setSelectedOtherFeatures({
                ...selectedOtherFeatures,
                ...featuresObject,
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [query])

    useEffect(() => {
        fetchUsersList().catch()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchUsersValue])

    return (
        <>
            <Drawer
                opened={opened}
                onClose={() => setOpened(false)}
                title={
                    <Text color={'grey.4'} weight={500}>فیلتر</Text>
                }
                padding="xl"
                size="xl"
                sx={{
                    zIndex: 600,
                    '& .mantine-Paper-root.mantine-Drawer-drawer': {
                        padding: 25
                    }
                }}
            >
                <Box mt={'xl'}>
                    <Accordion variant="separated" styles={{
                        content: {padding: 0}
                    }}>
                        <Accordion.Item value="categories">
                            <Accordion.Control>
                                <Text color={'grey.4'} weight={500}>لیست ها</Text>
                            </Accordion.Control>
                            <Accordion.Panel>
                                <Divider/>
                                <Box py={'xs'} px={'xs'}>
                                    <SearchInput
                                        onClickBtn={onChangeCategoriesSearch}
                                        sx={{borderRadius: '0px !important'}}
                                    />
                                </Box>
                                <Divider/>
                                <ScrollArea type={'auto'} style={{height: 285}}>
                                    <CategoriesFilter
                                        onClickCategory={onClickCategory}
                                        categories={categoriesList}
                                        selectedCategories={selectedCategories}
                                    />
                                </ScrollArea>
                            </Accordion.Panel>
                        </Accordion.Item>

                        <Accordion.Item value="users">
                            <Accordion.Control>
                                <Text color={'grey.4'} weight={500}>کاربر ها</Text>
                            </Accordion.Control>
                            <Accordion.Panel>
                                <Divider/>
                                <Box py={'xs'} px={'xs'}>
                                    <SearchInput
                                        onClickBtn={onChangeUsersSearch}
                                        sx={{borderRadius: '0px !important'}}
                                    />
                                </Box>
                                <Divider/>
                                <ScrollArea type={'auto'} style={{height: 285}}>
                                    <UsersFilter
                                        onSelectUser={onSelectUser}
                                        users={usersList}
                                        selectedUsers={selectedUsers}
                                    />
                                </ScrollArea>
                                <Box 
                                    py={'xs'} px={'xs'} 
                                    sx={{display: !!totalPage && page < totalPage ? 'block' : 'none'}}
                                >
                                    <PrimaryOutlineBtn onClick={nextPageHandler} text={'بیشتر'}/>
                                </Box>
                                <Divider/>
                            </Accordion.Panel>
                        </Accordion.Item>

                        <Accordion.Item value="other">
                            <Accordion.Control>
                                <Text color={'grey.4'} weight={500}>موارد دیگر</Text>
                            </Accordion.Control>
                            <Accordion.Panel>
                                <ScrollArea type={'auto'} style={{height: 100}}>
                                    <OtherFeaturesFilter
                                        selectedItems={selectedOtherFeatures}
                                        onSelect={onChangeOtherFeatures}
                                    />
                                </ScrollArea>
                            </Accordion.Panel>
                        </Accordion.Item>
                    </Accordion>
                </Box>
            </Drawer>

            <Affix position={{top: 110, left: -5}} zIndex={500}>
                <FilterBtn
                    text={'فیلتر'}
                    onClick={() => setOpened(true)}
                />
            </Affix>
        </>
    )
}

export default FiltersDrawer