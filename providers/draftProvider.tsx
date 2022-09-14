import React, {MutableRefObject, useEffect, useState} from "react";
import {useInterval} from "@mantine/hooks";
import useRequest from "../hooks/useRequest";
import {APIS, DraftResponseDto, GetArticleResponseDto, SaveDraftValues} from "../utils/types";
import {AxiosResponse} from "axios";
import {showNotification} from "@mantine/notifications";
import {appMessages} from "../utils/messages";
import {IconAlertCircle} from "@tabler/icons";

class DraftProviderProps {
    titleRef?: MutableRefObject<any>
    mainArticle!: GetArticleResponseDto
    children?: JSX.Element | React.ReactNode | undefined
    setDrafts?: (drafts: DraftResponseDto[]) => void | undefined
}

const timer: string | undefined = process.env.CACHE_TIMER

export default function DraftProvider({children, titleRef, setDrafts, mainArticle}: DraftProviderProps) {
    const {getApis} = useRequest()
    const interval = useInterval(() => {
        saveDraft().catch()
    }, Number(timer as string));

    const saveDraft = async () => {
        const apis: APIS = getApis()
        try {
            const reqBody: SaveDraftValues = new SaveDraftValues()
            reqBody.body = window.editor?.getData()?.trim()
            if (
                (reqBody.body || '').length < 100 ||
                (!!mainArticle && mainArticle.body === reqBody.body)
            ) {
                return undefined
            }
            const title: string | undefined = titleRef?.current?.value
            if (!!title) reqBody.title = title
            await apis.draft.saveDraft(reqBody, mainArticle?.id as number)
            await fetchDrafts()
        } catch (e) {
            console.log(e)
        }
    }

    const fetchDrafts = async () => {
        const apis: APIS = getApis()
        try {
            const response: AxiosResponse | undefined = await apis.draft.getArticleDrafts(mainArticle?.id as number)
            if (!response) {
                showNotification({
                    message: appMessages.somethingWentWrong,
                    title: 'خطا',
                    autoClose: 3000,
                    color: 'red',
                    icon: <IconAlertCircle size={20}/>
                })
            } else {
                if (!!setDrafts) setDrafts(response.data as DraftResponseDto[])
            }
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        fetchDrafts().catch()
        interval.start();
        return interval.stop;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return <>{children}</>
}
