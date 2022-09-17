import {NextRouter, useRouter} from "next/router";
import React, {useEffect, useState} from "react";
import {ArticleDto, GetArticleResponseDto, UserDto, UseUserInfoResult} from "../../utils/types";
import {DashboardHeader} from "../../container/layout/dashboard";
import useUserInfo from "../../hooks/useUserInfo";
import {fetchArticle} from "../../utils/helpers";
import ReadArticle from "../../container/layout/readArticle";
import {Box} from "@mantine/core";
import InfoBarBottom from "../../container/post/InfoBarBottom";
import {PrimaryOutlineBtn} from "../../component/buttons";
import Link from "next/link";
import {NextPage} from "next";
import {Apis} from "../../utils/apis";

const ShowPost: NextPage = (): JSX.Element => {
    const {query}: NextRouter = useRouter()
    const {userInfo}: UseUserInfoResult = useUserInfo()
    const [article, setArticle] = useState<ArticleDto>()

    useEffect(() => {
        if (query?.info instanceof Array) {
            const apis: Apis = new Apis()
            const id = query?.info[1] as string
            fetchArticle(apis, id).then((result: ArticleDto | null) => {
                if (!!result) setArticle(result)
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [query])

    return (
        <Box mb={100}>
            <DashboardHeader/>
            <ReadArticle
                user={article?.owner as UserDto}
                article={article as GetArticleResponseDto}
                action={
                    String(userInfo?.id) === String(article?.owner?.id) ?
                        <Link href={`/edit/${article?.id}`}>
                            <PrimaryOutlineBtn text={'ویرایش'} capsule={"true"}/>
                        </Link> :
                        <></>
                }
            />
            <InfoBarBottom article={article as ArticleDto}/>
        </Box>
    )
}
export default ShowPost
