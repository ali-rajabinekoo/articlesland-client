import {ArticleCard} from "../../component/auxiliary/articleCard";
import {changeUrlToServerRequest, errorHandler} from "../../utils/helpers";
import {Container, Grid} from "@mantine/core";
import useRequest from "../../hooks/useRequest";
import {APIS, ArticleDto, UserDto, UseRequestResult} from "../../utils/types";
import {AxiosResponse} from "axios";
import React, {useEffect, useState} from "react";
import {showNotification} from "@mantine/notifications";
import {appMessages} from "../../utils/messages";
import {IconAlertCircle} from "@tabler/icons";

export default function ArticlesList() {
    const {getApis}: UseRequestResult = useRequest()
    const [articles, setArticles] = useState<ArticleDto[]>([])
    const [owner, setOwner] = useState<UserDto>()

    const fetchUserInfo = async () => {
        try {
            const apis: APIS = getApis()
            const response: AxiosResponse | undefined = await apis.user.userInfo()
            const user: UserDto = response?.data as UserDto
            if (!!user) {
                setOwner(user)
                setArticles(user.articles as ArticleDto[])
            } else {
                showNotification({
                    message: appMessages.somethingWentWrong,
                    title: 'خطا',
                    autoClose: 3000,
                    color: 'red',
                    icon: <IconAlertCircle size={20}/>
                })
            }
        } catch (e) {
            errorHandler(e)
        }
    }

    useEffect(() => {
        fetchUserInfo().catch()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <Container size={'xl'} mb={150}>
            <Grid>
                {articles.map((el: ArticleDto, index: number) => (
                    <Grid.Col xs={12} sm={6} md={6} lg={4} key={index}>
                        <ArticleCard
                            image={!!el?.bannerUrl ? changeUrlToServerRequest(el?.bannerUrl) : undefined}
                            title={el?.title as string || ""}
                            link={`/post/${owner?.username}/${el.id}`}
                            description={el?.description as string || ""}
                            category={el?.category?.displayTitle as string || ""}
                            author={{
                                name: owner?.displayName || owner?.username || "",
                                image: !!owner?.avatar ? changeUrlToServerRequest(owner?.avatar) : '',
                            }}
                            liked={true}
                        />
                    </Grid.Col>
                ))}
            </Grid>
        </Container>
    )
}
