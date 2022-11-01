import React, {useEffect, useState} from "react";
import {Container} from "@mantine/core";
import {TableStatsComponent} from "../../component/tables/stats";
import {APIS, StatsTableRowData, ViewedArticleResponseDto} from "../../utils/types";
import useRequest from "../../hooks/useRequest";
import {AxiosResponse} from "axios";
import {errorHandler} from "../../utils/helpers";
import {showNotification} from "@mantine/notifications";
import {appMessages} from "../../utils/messages";
import {IconAlertCircle} from "@tabler/icons";

const StatsTable = (): JSX.Element => {
    const {getApis} = useRequest()
    const [data, setData] = useState<StatsTableRowData[]>([])
    const fetchStats = async () => {
        const apis: APIS = getApis();
        try {
            const response: AxiosResponse | undefined = await apis.article.getMyArticle()
            if (!response?.data) {
                return showNotification({
                    message: appMessages.somethingWentWrong,
                    title: 'خطا',
                    autoClose: 3000,
                    color: 'red',
                    icon: <IconAlertCircle size={20}/>
                })
            }
            const articles: ViewedArticleResponseDto[] = response?.data as ViewedArticleResponseDto[]
            setData(articles.map((el: ViewedArticleResponseDto) => {
                return {
                    id: el.id,
                    title: el.title,
                    viewed: el.viewed,
                    todayView: el.todayViews,
                } as StatsTableRowData
            }))
        } catch (e) {
            errorHandler(e)
        }
    }
    useEffect(() => {
        fetchStats().catch()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <Container size={"xl"}>
            <TableStatsComponent data={data || []}/>
        </Container>
    )
}

export default StatsTable