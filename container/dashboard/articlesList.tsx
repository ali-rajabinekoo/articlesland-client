import {ArticleCard} from "../../component/cards/articleCard";
import {changeUrlToServerRequest, errorHandler} from "../../utils/helpers";
import {Container, Grid} from "@mantine/core";
import useRequest from "../../hooks/useRequest";
import {APIS, ArticleDto, UseBookmark, UseLike, UserDto, UseRequestResult} from "../../utils/types";
import {AxiosResponse} from "axios";
import React, {useEffect, useState} from "react";
import {showNotification} from "@mantine/notifications";
import {appMessages} from "../../utils/messages";
import {IconAlertCircle} from "@tabler/icons";
import {EmptyContent} from "../errors/empty";
import {NextRouter, useRouter} from "next/router";
import useBookmark from "../../hooks/useBookmark";
import useUserInfo from "../../hooks/useUserInfo";
import useLike from "../../hooks/useLike";

export default function ArticlesList() {
    const {getApis}: UseRequestResult = useRequest()
    const {userInfo} = useUserInfo()
    const {query}: NextRouter = useRouter()
    const {bookmark}: UseBookmark = useBookmark()
    const {like}: UseLike = useLike()
    const [loading, setLoading] = useState<boolean>(true)
    const [list, setList] = useState<ArticleDto[]>([])
    const [posts, setPosts] = useState<ArticleDto[]>([])
    const [unpublished, setUnpublished] = useState<ArticleDto[]>([])
    const [likedPosts, setLikedPosts] = useState<ArticleDto[]>([])
    const [bookmarkPosts, setBookmarkPosts] = useState<ArticleDto[]>([])
    const [noContentTitle, setNoContentTitle] = useState<string>('');
    const [noContentBtnText, setNoContentBtnText] = useState<string>('');
    const [isBookmarked, setIsBookmarked] = useState<boolean>(false);
    const [isLiked, setIsLiked] = useState<boolean>(false);

    const handleOnBookmark = async (id: number, isBookmarked: boolean = false) => {
        let articles: ArticleDto[] = []
        if (isBookmarked) {
            articles = await bookmark(id, true)
        } else {
            articles = await bookmark(id, false)
        }
        if (!articles) return undefined
        setBookmarkPosts(articles)
        if (query.tab === 'bookmarks') setList(articles.map(
            (el) =>
                likedPosts.find(el2 => el2.id === el.id) ?
                    ({...el, liked: true}) : el
        ))
        else setList(list.map((el) => {
            return articles?.find(el2 => el2.id === el.id) ? {...el, bookmarked: true} : {...el, bookmarked: false}
        }))
    }

    const handleOnLike = async (id: number, isLiked: boolean = false) => {
        let articles: ArticleDto[] = []
        if (isLiked) {
            articles = await like(id, true)
        } else {
            articles = await like(id, false)
        }
        if (!articles) return undefined
        setLikedPosts(articles)
        if (query.tab === 'likes') setList(articles.map(
            (el) =>
                bookmarkPosts.find(el2 => el2.id === el.id) ?
                    ({...el, bookmarked: true}) : el
        ))
        else setList(list.map((el) => {
            return articles?.find(el2 => el2.id === el.id) ? {...el, liked: true} : {...el, liked: false}
        }))
    }

    const fetchUserInfo = async () => {
        try {
            const apis: APIS = getApis()
            const response: AxiosResponse | undefined = await apis.user.userInfo()
            const user: UserDto = response?.data as UserDto
            if (!!user) {
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
                setList([...posts].map((el) => {
                    const bookmarkedTarget: ArticleDto | undefined = bookmarkPosts.find(el2 => el2.id === el.id)
                    const likedTarget: ArticleDto | undefined = likedPosts.find(el2 => el2.id === el.id)
                    return {...el, liked: !!likedTarget, bookmarked: !!bookmarkedTarget}
                }));
                setNoContentTitle('شما هنوز پستی ننوشته اید')
                setNoContentBtnText('ایجاد پست جدید')
                setIsBookmarked(false)
                setIsLiked(false)
            } else if (query.tab === 'unpublished') {
                setList([...unpublished].map((el) => {
                    const bookmarkedTarget: ArticleDto | undefined = bookmarkPosts.find(el2 => el2.id === el.id)
                    const likedTarget: ArticleDto | undefined = likedPosts.find(el2 => el2.id === el.id)
                    return {...el, liked: !!likedTarget, bookmarked: !!bookmarkedTarget}
                }));
                setNoContentTitle('هیچ پیش نویسی وجود ندارد')
                setNoContentBtnText('ایجاد پست جدید')
                setIsBookmarked(false)
                setIsLiked(false)
            } else if (query.tab === 'likes') {
                setList([...likedPosts].map(
                        (el) => bookmarkPosts.find(el2 => el2.id === el.id) ?
                            ({...el, bookmarked: true}) : el
                    )
                )
                setNoContentTitle('شما هنوز هیچ پستی را لایک نکرده اید')
                setNoContentBtnText('')
                setIsBookmarked(false)
                setIsLiked(true)
            } else if (query.tab === 'bookmarks') {
                setList([...bookmarkPosts].map(
                        (el) => likedPosts.find(el2 => el2.id === el.id) ?
                            ({...el, liked: true}) : el
                    )
                )
                setNoContentTitle('شما هنوز هیچ پستی را ذخیره نکرده اید')
                setNoContentBtnText('')
                setIsBookmarked(true)
                setIsLiked(false)
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
                            link={el.owner?.id === userInfo?.id ?
                                el.published ? `/post/${el.owner?.username}/${el.id}` : `/edit/${el.id}` :
                                `/post/${el.owner?.username}/${el.id}`
                            }
                            description={el?.description as string || ""}
                            category={el?.category?.displayTitle as string || ""}
                            author={{
                                name: el.owner?.displayName || el.owner?.username || "",
                                image: !!el.owner?.avatar ? changeUrlToServerRequest(el.owner?.avatar) : '',
                            }}
                            liked={isLiked || Boolean(el?.liked)}
                            userProfileLink={!!el.owner?.username ? `/user/${el.owner?.username}` : undefined}
                            bookmarked={isBookmarked || Boolean(el?.bookmarked)}
                            bookmarkFunction={
                                handleOnBookmark.bind({},
                                    el.id as number,
                                    isBookmarked || Boolean(el?.bookmarked)
                                )
                            }
                            likeFunction={
                                handleOnLike.bind({},
                                    el.id as number,
                                    isLiked || Boolean(el?.liked)
                                )
                            }
                        />
                    </Grid.Col>
                ))}
            </Grid>
        </Container>
    )
}
