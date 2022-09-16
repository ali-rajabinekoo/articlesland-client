import {APIS, GetArticleResponseDto, UseRequestResult, UseUserInfoResult} from "../../utils/types";
import {DashboardHeader} from "../../container/layout/dashboard";
import EditContainer from "../../container/edit/editContainer";
import Posting from "../../container/edit/posting";
import {NextRouter, useRouter} from "next/router";
import React, {useEffect, useState} from "react";
import useRequest from "../../hooks/useRequest";
import {fetchArticle} from "../../utils/helpers";
import {NextPage} from "next";
import useUserInfo from "../../hooks/useUserInfo";

const EditPage: NextPage = (): JSX.Element => {
    const {query, push}: NextRouter = useRouter()
    const {userInfo}: UseUserInfoResult = useUserInfo()
    const [article, setArticle] = useState<GetArticleResponseDto>()
    const {getApis}: UseRequestResult = useRequest()
    const [hasPermission, setHasPermission] = useState<boolean>(false)

    const onUpdateArticle = (updatedArticle: GetArticleResponseDto) => {
        setArticle(updatedArticle)
    }

    useEffect(() => {
        if (!!query?.id && !!userInfo) {
            const apis: APIS = getApis()
            const id = query.id as string
            fetchArticle(apis, id).then((result: GetArticleResponseDto | null) => {
                if (!!result && result.owner?.id === userInfo?.id) {
                    setArticle(result)
                    setHasPermission(true)
                } else {
                    return push('/404')
                }
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [query, userInfo])

    return (
        <div>
            <DashboardHeader/>
            <div style={{display: hasPermission ? "block" : "none"}}>
                {
                    query?.posting === "true" ? <Posting article={article as GetArticleResponseDto}/> :
                        <EditContainer article={article} onUpdateArticle={!!article ? onUpdateArticle : undefined}/>
                }
            </div>
        </div>
    )
}

export default EditPage
