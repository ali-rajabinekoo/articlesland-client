import {ArticleCard} from "../../component/cards/articleCard";
import {changeUrlToServerRequest, errorHandler} from "../../utils/helpers";
import {Container, Grid} from "@mantine/core";
import {ArticleDto, UserDto} from "../../utils/types";
import {AxiosResponse} from "axios";
import React, {useEffect, useState} from "react";
import {showNotification} from "@mantine/notifications";
import {appMessages} from "../../utils/messages";
import {IconAlertCircle} from "@tabler/icons";
import {EmptyContent} from "../errors/empty";
import {NextRouter, useRouter} from "next/router";
import {Apis} from "../../utils/apis";

export default function ArticlesList() {
    const {query}: NextRouter = useRouter()
    const [loading, setLoading] = useState<boolean>(true)
    const [list, setList] = useState<ArticleDto[]>([])
    const [posts, setPosts] = useState<ArticleDto[]>([])
    const [unpublished, setUnpublished] = useState<ArticleDto[]>([])
    const [likedPosts, setLikedPosts] = useState<ArticleDto[]>([])
    const [bookmarkPosts, setBookmarkPosts] = useState<ArticleDto[]>([])
    const [owner, setOwner] = useState<UserDto>()
    const [noContentTitle, setNoContentTitle] = useState<string>('');
    const [noContentBtnText, setNoContentBtnText] = useState<string>('');

    const fetchUserInfo = async () => {
        try {
            const apis: Apis = new Apis()
            const response: AxiosResponse | undefined = await apis.user.userInfo()
            const user: UserDto = response?.data as UserDto
            if (!!user) {
                setOwner(user)
                setPosts((user.articles as ArticleDto[]).filter((el) => el.published))
                setUnpublished(
                    (user.articles as ArticleDto[]).filter((el) => !el.published)
                )
                setLikedPosts(user.likes as ArticleDto[])
                setBookmarkPosts(user.bookmarks as ArticleDto[])
                setLoading(false)
            } else {
                showNotification({
                    message: appMessages.somethingWentWrong,
                    title: 'خطا',
                    autoClose: 3000,
                    color: 'red',
                    icon: <IconAlertCircle size={20}/>
                })
                setLoading(false)
            }
        } catch (e) {
            errorHandler(e)
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchUserInfo().catch()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if (!loading) {
            if (!query?.tab) {
                setList([...posts])
                setNoContentTitle('شما هنوز پستی ننوشته اید')
                setNoContentBtnText('ایجاد پست جدید')
            } else if (query.tab === 'unpublished') {
                setList([...unpublished])
                setNoContentTitle('هیچ پیش نویسی وجود ندارد')
                setNoContentBtnText('ایجاد پست جدید')
            } else if (query.tab === 'likes') {
                setList([...likedPosts])
                setNoContentTitle('شما هنوز هیچ پستی را لایک نکرده اید')
                setNoContentBtnText('')
            } else if (query.tab === 'bookmarks') {
                setList([...bookmarkPosts])
                setNoContentTitle('شما هنوز هیچ پستی را ذخیره نکرده اید')
                setNoContentBtnText('')
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loading, query])

    return (
        <Container size={'xl'} mb={150}>
            <Grid>
                {list.length === 0 && <EmptyContent title={noContentTitle} btnText={noContentBtnText}/>}
                {list.map((el: ArticleDto, index: number) => (
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
