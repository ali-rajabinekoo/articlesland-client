import {ArticleCard} from "../../component/cards/articleCard";
import {changeUrlToServerRequest, errorHandler} from "../../utils/helpers";
import {Container, Grid} from "@mantine/core";
import {ArticleDto, UseBookmark, UseLike, UserDto} from "../../utils/types";
import React, {useEffect, useState} from "react";
import {EmptyContent} from "../errors/empty";
import useBookmark from "../../hooks/useBookmark";
import useLike from "../../hooks/useLike";
import useUserInfo from "../../hooks/useUserInfo";

class UserPageArticlesListProps {
    list?: ArticleDto[]
    owner?: UserDto | undefined
}

export default function UserPageArticlesList({list = []}: UserPageArticlesListProps) {
    const [noContentTitle, setNoContentTitle] = useState<string>('');
    const [data, setData] = useState<ArticleDto[]>([]);
    const {userInfo, setNewUser} = useUserInfo()
    const {bookmark}: UseBookmark = useBookmark()
    const {like}: UseLike = useLike()

    const handleOnBookmark = async (id: number, bookmarked: boolean) => {
        try {
            let newBookmarks;
            if (bookmarked) {
                newBookmarks = await bookmark(id, true)
                setData(data.map(el => el.id === id ? {...el, bookmarked: false} : el))
            } else {
                newBookmarks = await bookmark(id, false)
                setData(data.map(el => el.id === id ? {...el, bookmarked: true} : el))
            }
            const newUserInfo = {...userInfo}
            newUserInfo.bookmarks = [...newBookmarks]
            setNewUser(newUserInfo)
        } catch (e) {
            errorHandler(e)
        }
    }

    const handleOnLike = async (id: number, liked: boolean) => {
        try {
            let newLikes;
            if (liked) {
                newLikes = await like(id, true)
                setData(data.map(el => el.id === id ? {...el, liked: false} : el))
            } else {
                newLikes = await like(id, false)
                setData(data.map(el => el.id === id ? {...el, liked: true} : el))
            }
            const newUserInfo = {...userInfo}
            newUserInfo.likes = [...newLikes]
            setNewUser(newUserInfo)
        } catch (e) {
            errorHandler(e)
        }
    }

    useEffect(() => {
        if (!!userInfo) {
            const result = list?.map((el) => {
                const bookmarked = userInfo.bookmarks?.find((el2) => el2.id === el?.id)
                const liked = userInfo.likes?.find((el2) => el2.id === el?.id)
                return {...el, bookmarked: !!bookmarked, liked: !!liked}
            }) as ArticleDto[]
            if (!result || result.length === 0) {
                setNoContentTitle('هیچ پستی برای نمایش وجود ندارد')
            } else {
                setData(result)
                setNoContentTitle('')
            }
        } else {
            if (!list || list.length === 0) {
                setNoContentTitle('هیچ پستی برای نمایش وجود ندارد')
            } else {
                setData(list)
                setNoContentTitle('')
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [list, userInfo])

    return (
        <Container size={'xl'} mb={150}>
            <Grid>
                {!!noContentTitle && <EmptyContent title={noContentTitle} disableBtn={true}/>}
                {data.map((el: ArticleDto, index: number) => (
                    <Grid.Col xs={12} sm={6} md={6} lg={4} key={index}>
                        <ArticleCard
                            image={!!el?.bannerUrl ? changeUrlToServerRequest(el?.bannerUrl) : undefined}
                            title={el?.title as string || ""}
                            link={el.published ? `/post/${el?.owner?.username}/${el.id}` : `/edit/${el.id}`}
                            description={el?.description as string || ""}
                            category={el?.category?.displayTitle as string || ""}
                            author={{
                                name: el?.owner?.displayName || el?.owner?.username || "",
                                image: !!el?.owner?.avatar ? changeUrlToServerRequest(el?.owner?.avatar) : '',
                            }}
                            userProfileLink={!!el?.owner?.username ? `/user/${el?.owner?.username}` : undefined}
                            bookmarked={Boolean(el.bookmarked)}
                            liked={Boolean(el.liked)}
                            bookmarkFunction={handleOnBookmark.bind({}, el.id as number, Boolean(el.bookmarked))}
                            likeFunction={handleOnLike.bind({}, el.id as number, Boolean(el.liked))}
                            disableCardPanel={!userInfo}
                        />
                    </Grid.Col>
                ))}
            </Grid>
        </Container>
    )
}
