import {APIS, GetArticleResponseDto, UserDto, UseRequestResult, UseUserInfoResult} from "../../utils/types";
import {DashboardHeader} from "../../container/layout/dashboard";
import useUserInfo from "../../hooks/useUserInfo";
import EditContainer from "../../container/edit/editContainer";
import Posting from "../../container/edit/posting";
import {NextRouter, useRouter} from "next/router";
import React, {useEffect, useState} from "react";
import useRequest from "../../hooks/useRequest";
import {AxiosError, AxiosResponse} from "axios";
import {errorHandler} from "../../utils/helpers";
import {showNotification} from "@mantine/notifications";
import {IconAlertCircle} from "@tabler/icons";

const EditPage = (): JSX.Element => {
    const {userInfo}: UseUserInfoResult = useUserInfo()
    const {query}: NextRouter = useRouter()
    const [article, setArticle] = useState<GetArticleResponseDto>()
    const {getApis}: UseRequestResult = useRequest()

    const fetchArticle = async (): Promise<GetArticleResponseDto | null> => {
        try {
            const apis: APIS = getApis()
            const response: AxiosResponse | undefined = await apis.article.getArticle(query.id as string)
            if (!response) {
                showNotification({
                    message: 'عنوان پست الزامیست',
                    title: 'خطا',
                    autoClose: 3000,
                    color: 'red',
                    icon: <IconAlertCircle size={20}/>
                })
                return null
            } else {
                return response.data as GetArticleResponseDto
            }
        } catch (e: AxiosError | any) {
            errorHandler(e)
            return null
        }
    }

    const onUpdateArticle = (updatedArticle: GetArticleResponseDto) => {
        setArticle(updatedArticle)
    }

    useEffect(() => {
        if (!!query?.id) {
            fetchArticle().then((result: GetArticleResponseDto | null) => {
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
