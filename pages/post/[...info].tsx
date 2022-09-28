import React, {useEffect, useState} from "react";
import {
    APIS,
    ArticleDto,
    CommentDto,
    GetArticleResponseDto,
    PublicAPIS,
    UserDto, UseRequestResult,
} from "../../utils/types";
import {DashboardHeader} from "../../container/layout/dashboard";
import useRequest, {publicApis} from "../../hooks/useRequest";
import ReadArticle from "../../container/layout/readArticle";
import {Box} from "@mantine/core";
import InfoBarBottom from "../../container/post/InfoBarBottom";
import {PrimaryOutlineBtn, SecondaryBtn, SecondaryOutlineBtn} from "../../component/buttons";
import Link from "next/link";
import {NextPage} from "next";
import {AxiosResponse} from "axios";
import {NextRouter, useRouter} from "next/router";
import PostComments from "../../container/post/comments";
import {useAppDispatch} from "../../hooks/redux";
import {AppDispatch} from "../../utils/app.store";
import {initComments} from "../../reducers/comments";
import {errorHandler} from "../../utils/helpers";
import useFollow from "../../hooks/useFollow";
import useBookmark from "../../hooks/useBookmark";

export async function getStaticProps({params}: any) {
    try {
        const apis: PublicAPIS = publicApis();
        const username: string = params.info[0];
        const id: string = params.info[1];
        const response: AxiosResponse | undefined =
            await apis.article.getPublicArticle(id as string, username as string)
        if (!!response?.data) {
            return {
                props: {articles: response?.data as GetArticleResponseDto},
            };
        }
        return {
            props: {articles: null},
        }
    } catch (error) {
        return {
            props: {articles: null},
        }
    }
}

export async function getStaticPaths() {
    return {
        paths: ['/post/[...info]'],
        fallback: true,
    };
}

class ShowPostProps {
    articles?: GetArticleResponseDto | undefined | null
}

const ShowPost: NextPage = ({articles}: ShowPostProps): JSX.Element => {
    const dispatch: AppDispatch = useAppDispatch()
    const {getApis}: UseRequestResult = useRequest(false)
    const [userInfo, setUserInfo] = useState<UserDto>()
    const [isBookmarked, setIsBookmarked] = useState<boolean>(false)
    const [isFollowed, setIsFollowed] = useState<boolean>(false)
    const [article, setArticle] = useState<ArticleDto>()
    const {push}: NextRouter = useRouter()
    const {follow: mainFollowFunction} = useFollow()
    const {bookmark} = useBookmark()

    const follow = async () => {
        try {
            if (!!article?.owner?.id) {
                mainFollowFunction(article?.owner?.id, isFollowed)
                setIsFollowed(!isFollowed)
            }
        } catch (e) {
            errorHandler(e)
        }
    }

    const fetchUserInfo = async () => {
        try {
            const apis: APIS = getApis()
            const response: AxiosResponse | undefined = await apis.user.userInfo()
            const user: UserDto = response?.data as UserDto
            if (!!user) {
                setUserInfo(user)
            }
        } catch (e) {
            errorHandler(e)
        }
    }

    const handleOnBookmark = async () => {
        if (isBookmarked && !!article?.id) {
            await bookmark(article?.id, true)
            setIsBookmarked(false)
        } else {
            await bookmark(article?.id, false)
            setIsBookmarked(true)
        }
    }
    
    useEffect(() => {
        if (!!articles) {
            setArticle(articles)
            dispatch(initComments(articles.comments as CommentDto[]))
            fetchUserInfo().catch()
        } else if (articles === null) {
            push('/404').catch()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [articles])

    useEffect(() => {
        if (!!userInfo) {
            const article: ArticleDto | undefined = userInfo.bookmarks?.find((el) => el.id === articles?.id)
            if (!!article) {
                setIsBookmarked(true)
            }
            const targetUser: UserDto | undefined = userInfo?.followings?.find((el) => el.id === articles?.owner?.id)
            if (!!targetUser) {
                setIsFollowed(true)
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userInfo])

    return (
        <Box>
            <DashboardHeader/>
            <ReadArticle
                user={article?.owner as UserDto}
                article={article as GetArticleResponseDto}
                action={
                    !userInfo ? <></> :
                        String(userInfo?.id) === String(article?.owner?.id) ?
                            <Link href={`/edit/${article?.id}`}>
                                <PrimaryOutlineBtn text={'ویرایش'} capsule={"true"}/>
                            </Link> :
                            isFollowed ?
                                <SecondaryBtn onClick={follow} text={'دنبال شده'} capsule={"true"}/> :
                                <SecondaryOutlineBtn onClick={follow} text={'دنبال کردن'} capsule={"true"}/>
                }
            />
            <InfoBarBottom 
                onClickBookmark={handleOnBookmark} 
                article={article as ArticleDto}
                bookmarked={isBookmarked}
            />
            <PostComments articleId={article?.id as number}/>
        </Box>
    )
}
export default ShowPost
