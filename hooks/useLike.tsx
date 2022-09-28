import {APIS, ArticleDto, UseLike, UseRequestResult} from "../utils/types";
import {AxiosResponse} from "axios";
import {showNotification} from "@mantine/notifications";
import {appMessages} from "../utils/messages";
import {IconAlertCircle, IconCheck} from "@tabler/icons";
import {errorHandler} from "../utils/helpers";
import React from "react";
import useRequest from "./useRequest";

const useLike = (): UseLike => {
    const {getApis}: UseRequestResult = useRequest()

    const like = async (id: number, includes: boolean) => {
        try {
            const apis: APIS = getApis()
            const response: AxiosResponse | undefined =
                includes ? await apis.article.removeLike(id) :
                    await apis.article.addLike(id)
            const articles: ArticleDto[] = response?.data as ArticleDto[]
            if (!articles) {
                return showNotification({
                    message: appMessages.somethingWentWrong,
                    title: 'خطا',
                    autoClose: 3000,
                    color: 'red',
                    icon: <IconAlertCircle size={20}/>
                })
            }
            showNotification({
                message: includes ? appMessages.removeLiked : appMessages.liked,
                autoClose: 3000,
                color: 'green',
                icon: <IconCheck size={20}/>
            })
            return [...articles]
        } catch (e) {
            errorHandler(e)
            return null
        }
    }

    return {like}
}

export default useLike