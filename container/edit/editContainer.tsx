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
import {IconAlertCircle} from "@tabler/icons";

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
    const [loading, setLoading] = useState<boolean>(false);
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
                icon: <IconAlertCircle size={20}/>
            })
            return null
        }
        if (bodyText.length < 100) {
            showNotification({
                message: 'بدنه پست باید حداقل شامل 100 کاراکتر باشد',
                title: 'خطا',
                autoClose: 3000,
                color: 'red',
                icon: <IconAlertCircle size={20}/>
            })
            return null
        }
        return {
            title: title.trim(),
            body: body.trim(),
        }
    }

    type postingFunctionType = (posting?: boolean) => Promise<void>

    const createArticle: postingFunctionType = async (posting: boolean = false): Promise<void> => {
        const data: CheckDataResult | null = checkData()
        if (!data) return undefined
        const apis: APIS = getApis()
        const response: AxiosResponse | undefined = await apis.article.createArticle(data as CreateArticleValues)
        if (!!response?.data?.id) {
            const id = response?.data?.id
            const updatedArticle: GetArticleResponseDto = response?.data as GetArticleResponseDto
            if (!!onUpdateArticle) onUpdateArticle(updatedArticle)
            await push(`/edit/${id}${posting ? "?posting=true" : ""}`)
        } else {
            showNotification({
                message: appMessages.somethingWentWrong,
                title: 'خطا',
                autoClose: 3000,
                color: 'red',
                icon: <IconAlertCircle size={20}/>
            })
        }
    }

    const updateArticle: postingFunctionType = async (posting: boolean = false): Promise<void> => {
        const data: CheckDataResult | null = checkData()
        if (!data) return undefined
        const apis: APIS = getApis()
        const response: AxiosResponse | undefined = await apis.article.updateArticle(
            article?.id as number, data as CreateArticleValues
        )
        if (!!response?.data && !!onUpdateArticle) {
            const updatedArticle: GetArticleResponseDto = response?.data as GetArticleResponseDto
            onUpdateArticle(updatedArticle)
            if (posting && !!updatedArticle?.id) {
                const id: number = updatedArticle?.id
                await push(`/edit/${id}?posting=true`)
            }
        } else {
            showNotification({
                message: appMessages.somethingWentWrong,
                title: 'خطا',
                autoClose: 3000,
                color: 'red',
                icon: <IconAlertCircle size={20}/>
            })
        }
    }

    const onSave: postingFunctionType = async (posting: boolean = false): Promise<void> => {
        try {
            setLoading(true)
            if (!article) await createArticle(posting)
            else await updateArticle(posting)
            setLoading(false)
            if (!posting) showNotification({
                message: 'پست مورد نظر با موفقیت ذخیره شد',
                title: 'عملیات موفقیت آمیز بود',
                autoClose: 3000,
                color: 'green',
            })
        } catch (e: AxiosError | any) {
            errorHandler(e)
            setLoading(false)
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
                            <PrimaryBtn
                                text={'انتشار پست'} capsule={"true"} loading={loading}
                                onClick={(() => onSave(true)) as MouseEventHandler}
                            />
                        </Grid.Col>
                        <Grid.Col xl={2} lg={2} md={2} sm={3} xs={12} pt={0}>
                            <SecondaryBtn
                                text={'ذخیره تغییرات'} capsule={"true"} loading={loading}
                                onClick={(() => onSave()) as MouseEventHandler}
                            />
                        </Grid.Col>
                    </Grid>
                </Grid.Col>
            </Grid>
        </Container>
    )
}

export default EditContainer
