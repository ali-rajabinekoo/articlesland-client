import {APIS, GetArticleResponseDto, UseRequestResult} from "../../utils/types";
import {DashboardHeader} from "../../container/layout/dashboard";
import EditContainer from "../../container/edit/editContainer";
import Posting from "../../container/edit/posting";
import {NextRouter, useRouter} from "next/router";
import React, {useEffect, useState} from "react";
import useRequest from "../../hooks/useRequest";
import {fetchArticle} from "../../utils/helpers";
import {NextPage} from "next";

const EditPage: NextPage = (): JSX.Element => {
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
            <DashboardHeader/>
            {
                query?.posting === "true" ? <Posting article={article as GetArticleResponseDto}/> :
                    <EditContainer article={article} onUpdateArticle={!!article ? onUpdateArticle : undefined}/>
            }
        </div>
    )
}

export default EditPage
