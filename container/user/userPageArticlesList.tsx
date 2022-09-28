import {ArticleCard} from "../../component/cards/articleCard";
import {changeUrlToServerRequest} from "../../utils/helpers";
import {Container, Grid} from "@mantine/core";
import {APIS, ArticleDto, UserDto, UseRequestResult} from "../../utils/types";
import React, {useEffect, useState} from "react";
import {EmptyContent} from "../errors/empty";
import {AxiosResponse} from "axios";
import useRequest from "../../hooks/useRequest";
import useBookmark from "../../hooks/useBookmark";

class UserPageArticlesListProps {
    list?: ArticleDto[]
    owner?: UserDto | undefined
}

export default function UserPageArticlesList({list = [], owner}: UserPageArticlesListProps) {
    const [noContentTitle, setNoContentTitle] = useState<string>('');
    const [data, setData] = useState<ArticleDto[]>([]);
    const {getApis} :UseRequestResult= useRequest(false)
    const {bookmark} = useBookmark()

    const fetchUserInfo = async (): Promise<ArticleDto[]> => {
        try {
            const apis: APIS = getApis()
            const response: AxiosResponse | undefined = await apis.user.userInfo()
            const user: UserDto = response?.data as UserDto
            if (!!user) {
                return list?.map((el) => {
                    return user.bookmarks?.find((el2) => el2.id === el?.id) ? 
                        {...el, bookmarked: true}:
                        {...el, bookmarked: false}
                }) as ArticleDto[]
            }
            return list as ArticleDto[]
        } catch (e) {
            return list as ArticleDto[]
        }
    }

    const handleOnBookmark = async (id: number, bookmarked: boolean) => {
        if (bookmarked) {
            await bookmark(id, true)
            setData(data.map(el => el.id === id ? {...el, bookmarked: false} : el))
        } else {
            await bookmark(id, false)
            setData(data.map(el => el.id === id ? {...el, bookmarked: true} : el))
        }
    }

    useEffect(() => {
        fetchUserInfo().then((result) => {
            if (!result || result.length === 0) {
                setNoContentTitle('هیچ پستی برای نمایش وجود ندارد')
            } else {
                setData(result)
                setNoContentTitle('')
            }
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [list])

    return (
        <Container size={'xl'} mb={150}>
            <Grid>
                {!!noContentTitle && <EmptyContent title={noContentTitle} disableBtn={true}/>}
                {data.map((el: ArticleDto, index: number) => (
                    <Grid.Col xs={12} sm={6} md={6} lg={4} key={index}>
                        <ArticleCard
                            image={!!el?.bannerUrl ? changeUrlToServerRequest(el?.bannerUrl) : undefined}
                            title={el?.title as string || ""}
                            link={el.published ? `/post/${owner?.username}/${el.id}` : `/edit/${el.id}`}
                            description={el?.description as string || ""}
                            category={el?.category?.displayTitle as string || ""}
                            author={{
                                name: owner?.displayName || owner?.username || "",
                                image: !!owner?.avatar ? changeUrlToServerRequest(owner?.avatar) : '',
                            }}
                            bookmarked={Boolean(el.bookmarked)}
                            bookmarkFunction={handleOnBookmark.bind({}, el.id as number, Boolean(el.bookmarked))}
                        />
                    </Grid.Col>
                ))}
            </Grid>
        </Container>
    )
}
