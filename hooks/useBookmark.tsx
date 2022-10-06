import {APIS, ArticleDto, UseBookmark, UseRequestResult} from "../utils/types";
import {AxiosResponse} from "axios";
import {showNotification} from "@mantine/notifications";
import {appMessages} from "../utils/messages";
import {IconAlertCircle, IconCheck} from "@tabler/icons";
import React from "react";
import useRequest from "./useRequest";

const useBookmark = (): UseBookmark => {
    const {getApis}: UseRequestResult = useRequest()
    
    const bookmark = async (id: number, includes: boolean) => {
        try {
            const apis: APIS = getApis()
            const response: AxiosResponse | undefined =
                includes ? await apis.article.removeBookmark(id) :
                    await apis.article.addBookmark(id)
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
                message: includes ? appMessages.removeBookmarked : appMessages.bookmarked,
                autoClose: 3000,
                color: 'green',
                icon: <IconCheck size={20}/>
            })
            return [...articles]
        } catch (e) {
            throw (e)
        }
    }
    
    return {bookmark}
}

export default useBookmark