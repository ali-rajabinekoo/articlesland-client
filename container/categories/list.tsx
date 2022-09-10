import {Container, Grid, Text} from "@mantine/core";
import {CategoryCard} from "../../component/cards/categoryCard";
import {changeUrlToServerRequest} from "../../utils/helpers";
import {CategoryDto} from "../../utils/types";
import {useAppSelector} from "../../hooks/redux";
import {RootState} from "../../utils/app.store";

const CategoriesList = (): JSX.Element => {
    const categories: CategoryDto[] = useAppSelector((state: RootState) => state.categories.list)

    const onClickCategoryCard = (id: string | number): void => {
        console.log(id)
    }

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
                                title={el.displayTitle as string} action={onClickCategoryCard.bind(this, el.id as number)}
                                image={changeUrlToServerRequest(el.avatar as string)}
                            />
                        </Grid.Col>
                    )
                })}
            </Grid>
        </Container>
    )
}

export default CategoriesList
