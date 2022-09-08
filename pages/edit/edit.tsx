import {APIS, GetArticleResponseDto, UserDto, UseRequestResult, UseUserInfoResult} from "../../utils/types";
import {DashboardHeader} from "../../container/layout/dashboard";
import useUserInfo from "../../hooks/useUserInfo";
import EditContainer from "../../container/edit/editContainer";
import Posting from "../../container/edit/posting";
import {NextRouter, useRouter} from "next/router";
import React, {useEffect, useState} from "react";
import useRequest from "../../hooks/useRequest";
import {fetchArticle} from "../../utils/helpers";

const EditPage = (): JSX.Element => {
    const {userInfo}: UseUserInfoResult = useUserInfo()
    const {query}: NextRouter = useRouter()
    const [article, setArticle] = useState<GetArticleResponseDto>()
    const {getApis}: UseRequestResult = useRequest()

    const onUpdateArticle = (updatedArticle: GetArticleResponseDto) => {
        setArticle(updatedArticle)
    }

    useEffect(() => {
        if (!!query?.id) {
            const apis: APIS = getApis()
            const id = query.id as string
            fetchArticle(apis, id).then((result: GetArticleResponseDto | null) => {
                if (!!result) setArticle(result)
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [query])

    return (
        <div>
            <DashboardHeader user={userInfo as UserDto}/>
            {
                query?.posting === "true" ? <Posting article={article as GetArticleResponseDto}/> :
                    <EditContainer article={article} onUpdateArticle={!!article ? onUpdateArticle : undefined}/>
            }
        </div>
    )
}

export default EditPage
