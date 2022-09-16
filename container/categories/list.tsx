import {Container, Grid, Text} from "@mantine/core";
import {CategoryCard} from "../../component/cards/categoryCard";
import {changeUrlToServerRequest, errorHandler} from "../../utils/helpers";
import {
    APIS,
    CategoryDto,
    SetSelectedCategories,
    UseFetchSelectedCategoriesResult,
    UserDto,
    UseRequestResult
} from "../../utils/types";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {AppDispatch, RootState} from "../../utils/app.store";
import React, {useEffect, useState} from "react";
import useRequest from "../../hooks/useRequest";
import {AxiosError, AxiosResponse} from "axios";
import {showNotification} from "@mantine/notifications";
import {appMessages} from "../../utils/messages";
import {IconAlertCircle, IconCheck} from "@tabler/icons";
import {PrimaryBtn} from "../../component/buttons";
import {setUserCategories} from "../../reducers/userCategories";
import useFetchSelectedCategories from "../../hooks/useFetchSelectedCategories";

const CategoriesList = (): JSX.Element => {
    const categories: CategoryDto[] = useAppSelector((state: RootState) => state.categories.list)
    const dispatch: AppDispatch = useAppDispatch()
    const {getApis}: UseRequestResult = useRequest()
    const [selectedCategories, setSelectedCategories] = useState<number[]>([])
    const {selectedCategories: userCategories}: UseFetchSelectedCategoriesResult = useFetchSelectedCategories()

    const onClickCategoryCard = (id: string | number): void => {
        if (selectedCategories.includes(Number(id) as number)) {
            const newSelectedCategories: number[] = selectedCategories.filter(el => el !== Number(id))
            setSelectedCategories(newSelectedCategories)
        } else {
            const newSelectedCategories: number[] = [...selectedCategories]
            newSelectedCategories.push(Number(id))
            setSelectedCategories(newSelectedCategories)
        }
    }

    const submitNewCategories = async () => {
        const apis: APIS = getApis()
        try {
            const body: SetSelectedCategories = new SetSelectedCategories()
            body.list = [...selectedCategories]
            const response: AxiosResponse | undefined = await apis.category.setCategoriesForUser(body)
            if (!response) {
                return showNotification({
                    message: appMessages.somethingWentWrong,
                    title: 'خطا',
                    autoClose: 3000,
                    color: 'red',
                    icon: <IconAlertCircle size={20}/>
                })
            } else {
                showNotification({
                    message: 'لیست های انتخاب شده با موفقیت ثبت شدند',
                    autoClose: 3000,
                    color: 'green',
                    icon: <IconCheck size={20}/>
                })
                const user: UserDto = response.data as UserDto
                dispatch(setUserCategories(user.selectedCategories as CategoryDto[]))
            }
        } catch (e: AxiosError | any) {
            setSelectedCategories([...userCategories]?.map(el => Number(el.id)) as number[])
            errorHandler(e)
        }
    }

    useEffect(() => {
        if (userCategories.length !== 0) {
            setSelectedCategories([...userCategories]?.map(el => Number(el.id)) as number[])
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userCategories])

    return (
        <Container size={'xl'}>
            <Text size={'md'} weight={700} color={'grey.4'}>
                حداقل 3 موضوع که به آن‌ها علاقه دارید را انتخاب کنید
            </Text>
            <Text mt={'xs'} size={'md'} weight={400} color={'grey.4'}>
                به کمک این اطلاعات، پست‌هایی که بیشتر دوست دارید به شما پیشنهاد داده می‌شود.
            </Text>
            <Grid mt={'md'} gutter={'xs'} justify={"center"}>
                {categories.map((el: CategoryDto, index: number) => {
                    return (
                        <Grid.Col sm={2.3} md={2.2} lg={2.1} xs={4} key={index}>
                            <CategoryCard
                                title={el.displayTitle as string}
                                action={onClickCategoryCard.bind(this, el.id as number)}
                                image={changeUrlToServerRequest(el.avatar as string)}
                                selected={selectedCategories.includes(Number(el.id) as number)}
                            />
                        </Grid.Col>
                    )
                })}

            </Grid>
            <Grid mt={'lg'} mb={'80px'} gutter={'xs'} justify={"center"}>
                <Grid.Col sm={2.3} md={2.2} lg={2.1} xs={4}>
                    <PrimaryBtn onClick={submitNewCategories} text={'ثبت تغییرات'}/>
                </Grid.Col>
            </Grid>
        </Container>
    )
}

export default CategoriesList
