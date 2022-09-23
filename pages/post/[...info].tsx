import React, {useEffect, useState} from "react";
import {
    ArticleDto,
    CommentDto,
    GetArticleResponseDto,
    PublicAPIS,
    UserDto,
    UseUserInfoResult
} from "../../utils/types";
import {DashboardHeader} from "../../container/layout/dashboard";
import useUserInfo from "../../hooks/useUserInfo";
import {publicApis} from "../../hooks/useRequest";
import ReadArticle from "../../container/layout/readArticle";
import {Box} from "@mantine/core";
import InfoBarBottom from "../../container/post/InfoBarBottom";
import {PrimaryOutlineBtn, SecondaryOutlineBtn} from "../../component/buttons";
import Link from "next/link";
import {NextPage} from "next";
import {AxiosResponse} from "axios";
import {NextRouter, useRouter} from "next/router";
import PostComments from "../../container/post/comments";
import {useAppDispatch} from "../../hooks/redux";
import {AppDispatch} from "../../utils/app.store";
import {initComments} from "../../reducers/comments";

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
    const {userInfo}: UseUserInfoResult = useUserInfo()
    const [article, setArticle] = useState<ArticleDto>()
    const {push} : NextRouter= useRouter()

    useEffect(() => {
        if (!!articles) {
            setArticle(articles)
            dispatch(initComments(articles.comments as CommentDto[]))
        } else if (articles === null) {
            push('/404').catch()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [articles])

    return (
        <Box>
            <DashboardHeader/>
            <ReadArticle
                user={article?.owner as UserDto}
                article={article as GetArticleResponseDto}
                action={
                    String(userInfo?.id) === String(article?.owner?.id) ?
                        <Link href={`/edit/${article?.id}`}>
                            <PrimaryOutlineBtn text={'ویرایش'} capsule={"true"}/>
                        </Link> :
                        <SecondaryOutlineBtn text={'دنبال کردن'} capsule={"true"}/>
                }
            />
            <InfoBarBottom article={article as ArticleDto}/>
            <PostComments articleId={article?.id as number}/>
        </Box>
    )
}
export default ShowPost
