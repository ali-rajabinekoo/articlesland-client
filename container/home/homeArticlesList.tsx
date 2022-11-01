import React, {useEffect, useState} from "react";
import {Container, Grid, Pagination, Center} from "@mantine/core";
import {APIS, ArticleDto, LikesAndBookmarksObject, UseBookmark, UseLike} from "../../utils/types";
import useRequest from "../../hooks/useRequest";
import {AxiosResponse} from "axios";
import {showNotification} from "@mantine/notifications";
import {IconAlertCircle} from "@tabler/icons";
import {EmptyContent} from "../errors/empty";
import {ArticleCard} from "../../component/cards/articleCard";
import {changeUrlToServerRequest, errorHandler, validFeaturesFilter} from "../../utils/helpers";
import useUserInfo from "../../hooks/useUserInfo";
import useBookmark from "../../hooks/useBookmark";
import useLike from "../../hooks/useLike";
import {NextRouter, useRouter} from "next/router";
import FiltersDrawer from "../explore/filtersDrawer";

class HomeArticlesListProps {
    searchValue?: string | undefined;
    isExplorePage?: boolean | undefined;
}

const HomeArticlesList = (props: HomeArticlesListProps) => {
    const {getApis} = useRequest(false)
    const {userInfo, setNewUser} = useUserInfo()
    const [noContentTitle, setNoContentTitle] = useState<string>('');
    const [articles, setArticles] = useState<ArticleDto[]>()
    const [page, setPage] = useState<number>(1)
    const [totalPages, setTotalPages] = useState<number>(1)
    const [selectedCategory, setSelectedCategory] = useState<number>()
    const {bookmark}: UseBookmark = useBookmark()
    const {like}: UseLike = useLike()
    const {query}: NextRouter = useRouter()

    const onChangePage = (newPage: number) => {
        setPage(newPage)
    }

    const handleOnBookmark = async (articleId: number, isBookmarked: boolean) => {
        try {
            if (!userInfo) return undefined;
            let newBookmarks: ArticleDto[];
            if (isBookmarked) {
                newBookmarks = await bookmark(articleId, true)
            } else {
                newBookmarks = await bookmark(articleId, false)
            }
            const newUserInfo = {...userInfo}
            newUserInfo.bookmarks = [...newBookmarks]
            setNewUser(newUserInfo)
            let fetchedBookmarks: LikesAndBookmarksObject = {};
            for (const bookmark of newBookmarks) {
                fetchedBookmarks[String(bookmark.id)] = true
            }
            formatArticles(
                undefined,
                undefined,
                Object.keys(fetchedBookmarks).length !== 0 ? fetchedBookmarks : undefined,
            );
        } catch (e) {
            errorHandler(e)
        }
    }

    const handleOnLike = async (articleId: number, isLiked: boolean) => {
        try {
            if (!userInfo) return undefined;
            let newLikes: ArticleDto[];
            if (isLiked) {
                newLikes = await like(articleId, true)
            } else {
                newLikes = await like(articleId, false)
            }
            const newUserInfo = {...userInfo}
            newUserInfo.likes = [...newLikes]
            setNewUser(newUserInfo)
            let fetchedLikes: LikesAndBookmarksObject = {};
            for (const like of newLikes) {
                fetchedLikes[String(like.id)] = true
            }
            formatArticles(
                undefined,
                Object.keys(fetchedLikes).length !== 0 ? fetchedLikes : undefined,
                undefined,
            );
        } catch (e) {
            errorHandler(e)
        }
    }

    const formatArticles = (
        fetchedArticles?: ArticleDto[] | undefined,
        fetchedLikes?: LikesAndBookmarksObject | undefined,
        fetchedBookmarks?: LikesAndBookmarksObject | undefined,
    ) => {
        setArticles((fetchedArticles || articles || []).map((el: ArticleDto) => {
            const liked: boolean = !!fetchedLikes ? fetchedLikes[el?.id as any] : el.liked || false;
            const bookmarked: boolean = !!fetchedBookmarks ? fetchedBookmarks[el?.id as any] : el.bookmarked || false;
            return {...el, liked, bookmarked}
        }))
    }

    const fetchArticles = async (
        categories?: string | undefined,
        features?: { [key: string]: boolean },
        users?: string | undefined,
    ) => {
        const apis: APIS = getApis()
        const searchValue: string | undefined = props.searchValue?.trim();
        let userSelectedCategories: undefined | string = undefined;
        if (
            !!userInfo &&
            Array.isArray(userInfo?.selectedCategories) &&
            props.isExplorePage
        ) {
            userSelectedCategories = userInfo.selectedCategories?.map((el => el.id as number)).join(',')
        }
        try {
            const response: AxiosResponse | undefined = await apis.article.getArticlesByCategory(
                page, categories || userSelectedCategories, searchValue, features, users,
            );
            if (!response) return showNotification({
                message: 'عنوان پست الزامیست',
                title: 'خطا',
                autoClose: 3000,
                color: 'red',
                icon: <IconAlertCircle size={20}/>
            })
            const fetchedArticles: ArticleDto[] = response.data?.articles;
            const fetchedLikes: LikesAndBookmarksObject = response.data?.likes || {};
            const fetchedBookmarks: LikesAndBookmarksObject = response.data?.bookmarks || {};
            const fetchedTotalPage: number = response.data?.totalPages || 1;
            setTotalPages(fetchedTotalPage)
            if (fetchedArticles.length === 0) {
                setNoContentTitle('هیچ پستی برای نمایش وجود ندارد')
                setArticles([])
            } else {
                setNoContentTitle('')
                formatArticles(fetchedArticles, fetchedLikes, fetchedBookmarks);
            }
        } catch (e) {
            errorHandler(e)
        }
    }

    // Home page queries
    useEffect(() => {
        if (!!selectedCategory) fetchArticles([selectedCategory].join(',')).catch();
        else fetchArticles().catch();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userInfo, page, selectedCategory, props.searchValue])
    useEffect(() => {
        if (props.isExplorePage) return undefined;
        if (!!query?.categoryId) setSelectedCategory(Number(query?.categoryId))
        else setSelectedCategory(undefined)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [query?.categoryId])

    // Explore page queries
    useEffect(() => {
        if (!props.isExplorePage) return undefined;
        let categories: string | undefined;
        let users: string | undefined;
        let features: { [key: string]: boolean } | undefined;
        if (
            typeof (query?.categories) === 'string' &&
            query.categories.trim().length !== 0
        ) {
            categories = query.categories
        }
        if (
            typeof (query?.features) === 'string' &&
            query.features.trim().length !== 0
        ) {
            const featuresArray = query.features.split(',')
            const featuresObject: { [key: string]: boolean } = {}
            for (const feature of featuresArray) {
                if (validFeaturesFilter.includes(feature)) {
                    featuresObject[feature] = true;
                }
            }
            features = featuresObject;
        }
        if (
            typeof (query?.users) === 'string' &&
            query.users.trim().length !== 0
        ) {
            users = query.users
        }
        fetchArticles(categories, features, users).catch()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [query?.features, query?.users, query?.categories])

    return (
        <Container size={'xl'} mb={150}>
            {/*<Box mt={'md'} mb={'xl'} sx={{display: !!props.searchValue ? 'block' : 'none'}}>*/}
            {/*    <Box sx={{display: 'flex', alignItems: 'center'}}>*/}
            {/*        <Text component={'span'} color={'grey.4'} mr={'xs'} weight={500}>کلیدواژه جستجو شده:</Text>*/}
            {/*        <Text component={'span'} color={'grey.4'} mr={'xs'} weight={400}>{props.searchValue}</Text>*/}
            {/*        <UnstyledButton mt={4}><IconCircleX/></UnstyledButton>*/}
            {/*    </Box>*/}
            {/*</Box>*/}
            {props.isExplorePage && <FiltersDrawer/>}
            <Grid mt={props.isExplorePage ? 90 : 0}>
                {!!noContentTitle && <EmptyContent title={noContentTitle} disableBtn={true}/>}
                {(articles || []).map((el: ArticleDto, index: number) => (
                    <Grid.Col xs={12} sm={6} md={6} lg={4} key={index}>
                        <ArticleCard
                            id={el.id as number}
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
            {!noContentTitle && <Center my={'xl'}>
                <Pagination total={totalPages} color="secondary.2" page={page} onChange={onChangePage}/>
            </Center>}
        </Container>
    )
}

export default HomeArticlesList