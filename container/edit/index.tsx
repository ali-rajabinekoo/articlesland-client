import {Container, Grid} from "@mantine/core";
import {ArticlesLandEditor, FloatingLabelInput} from "../../component/inputs";
import React, {MouseEventHandler, useEffect, useState} from "react";
import {PrimaryBtn, SecondaryBtn} from "../../component/buttons";
import {errorHandler} from "../../utils/helpers";
import {AxiosError, AxiosResponse} from "axios";
import {htmlToText} from 'html-to-text';
import {showNotification} from "@mantine/notifications";
import useRequest from "../../hooks/useRequest";
import {APIS, CreateArticleValues, GetArticleResponseDto, UseRequestResult} from "../../utils/types";
import {NextRouter, useRouter} from "next/router";
import {appMessages} from "../../utils/messages";

class EditContainerProps {
    article?: GetArticleResponseDto
    onUpdateArticle?: (article: GetArticleResponseDto) => void | undefined
}

class CheckDataResult {
    title?: string | undefined
    body?: string | undefined
}

const EditContainer = ({article, onUpdateArticle}: EditContainerProps) => {
    const [title, setTitle] = useState<string>('');
    const {getApis}: UseRequestResult = useRequest();
    const {push}: NextRouter = useRouter()

    const onChangeTitle = (e: any): void => {
        setTitle(e.target.value)
    }

    const checkData = (): CheckDataResult | null => {
        // @ts-ignore
        const body: string = window.editor?.getData()
        const bodyText: string = htmlToText(body?.trim())
        if (!title) {
            showNotification({
                message: 'عنوان پست الزامیست',
                title: 'خطا',
                autoClose: 3000,
                color: 'red',
            })
            return null
        }
        if (bodyText.length < 100) {
            showNotification({
                message: 'بدنه پست باید حداقل شامل 100 کاراکتر باشد',
                title: 'خطا',
                autoClose: 3000,
                color: 'red',
            })
            return null
        }
        return {
            title: title.trim(),
            body: body.trim(),
        }
    }

    const createArticle = async (): Promise<void> => {
        const data: CheckDataResult | null = checkData()
        if (!data) return undefined
        const apis: APIS = getApis()
        const response: AxiosResponse | undefined = await apis.article.createArticle(data as CreateArticleValues)
        if (!!response?.data?.id) {
            const id = response?.data?.id
            const updatedArticle: GetArticleResponseDto = response?.data as GetArticleResponseDto
            if (!!onUpdateArticle) onUpdateArticle(updatedArticle)
            await push(`/edit/${id}`)
        } else {
            showNotification({
                message: appMessages.somethingWentWrong,
                title: 'خطا',
                autoClose: 3000,
                color: 'red',
            })
        }
    }

    const updateArticle = async (): Promise<void> => {
        const data: CheckDataResult | null = checkData()
        if (!data) return undefined
        const apis: APIS = getApis()
        const response: AxiosResponse | undefined = await apis.article.updateArticle(
            article?.id as number, data as CreateArticleValues
        )
        if (!!response?.data && !!onUpdateArticle) {
            const updatedArticle: GetArticleResponseDto = response?.data as GetArticleResponseDto
            onUpdateArticle(updatedArticle)
        } else {
            showNotification({
                message: appMessages.somethingWentWrong,
                title: 'خطا',
                autoClose: 3000,
                color: 'red',
            })
        }
    }

    const onSave: MouseEventHandler | undefined = async (): Promise<void> => {
        try {
            if (!article) await createArticle()
            else await updateArticle()
        } catch (e: AxiosError | any) {
            errorHandler(e)
        }
    }

    useEffect(() => {
        if (!!article?.title) {
            setTitle(article.title)
        }
    }, [article])

    return (
        <Container size={'xl'}>
            <Grid>
                <Grid.Col xl={6} lg={7} md={8} xs={12}>
                    <FloatingLabelInput
                        label={'عنوان مقاله خود را وارد کنید'}
                        onChange={onChangeTitle}
                        value={title}
                    />
                </Grid.Col>
                <Grid.Col xs={12}>
                    <ArticlesLandEditor data={article}/>
                </Grid.Col>
                <Grid.Col xs={12}>
                    <Grid dir={'ltr'} p={0}>
                        <Grid.Col xl={2} lg={2} md={2} sm={3} xs={12} pt={0}>
                            <PrimaryBtn text={'انتشار پست'} capsule={"true"}/>
                        </Grid.Col>
                        <Grid.Col xl={2} lg={2} md={2} sm={3} xs={12} pt={0}>
                            <SecondaryBtn text={'ذخیره تغییرات'} capsule={"true"} onClick={onSave}/>
                        </Grid.Col>
                    </Grid>
                </Grid.Col>
            </Grid>
        </Container>
    )
}

export default EditContainer
