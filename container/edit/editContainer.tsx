import {Container, Modal, Grid, Text} from "@mantine/core";
import {ArticlesLandEditor, FloatingLabelInput} from "../../component/inputs";
import React, {MouseEventHandler, MutableRefObject, useEffect, useRef, useState} from "react";
import {
    PrimaryBtn,
    DangerBtn,
    PrimaryOutlineBtn,
    SecondaryOutlineBtn, SecondaryBtn
} from "../../component/buttons";
import {errorHandler} from "../../utils/helpers";
import {AxiosError, AxiosResponse} from "axios";
import {htmlToText} from 'html-to-text';
import {showNotification} from "@mantine/notifications";
import useRequest from "../../hooks/useRequest";
import {
    APIS,
    CreateArticleValues,
    DraftResponseDto,
    GetArticleResponseDto,
    UseRequestResult
} from "../../utils/types";
import {NextRouter, useRouter} from "next/router";
import {appMessages} from "../../utils/messages";
import {IconAlertCircle} from "@tabler/icons";
import DraftProvider from "../../providers/draftProvider";
import Drafts from "./drafts";

class EditContainerProps {
    article?: GetArticleResponseDto
    onUpdateArticle?: (article: GetArticleResponseDto) => void | undefined
    drafts?: DraftResponseDto[] | undefined
    titleRef?: MutableRefObject<any> | undefined
}

class EditContainerPropsHOC {
    article?: GetArticleResponseDto
    onUpdateArticle?: (article: GetArticleResponseDto) => void | undefined
}

class CheckDataResult {
    title?: string | undefined
    body?: string | undefined
}

const EditContainerHOC = ({article, onUpdateArticle}: EditContainerPropsHOC): JSX.Element => {
    const [drafts, setDrafts] = useState<DraftResponseDto[]>([]);
    const ref = useRef();
    const onGetDrafts = (drafts: DraftResponseDto[]): void => {
        if (!!drafts) setDrafts(drafts)
    }

    return (
        <>
            {
                !!article ? <DraftProvider
                        titleRef={ref} setDrafts={onGetDrafts}
                        mainArticle={article}
                    >
                        <EditContainer drafts={drafts} titleRef={ref} article={article} onUpdateArticle={onUpdateArticle}/>
                    </DraftProvider> :
                    <DraftProvider
                        titleRef={ref} setDrafts={onGetDrafts}
                    >
                        <EditContainer drafts={drafts} titleRef={ref} article={article}
                                       onUpdateArticle={onUpdateArticle}/>
                    </DraftProvider>
            }
        </>
    )
}

const EditContainer = ({article, onUpdateArticle, titleRef, drafts = []}: EditContainerProps) => {
    const [removeDialogOpened, setRemoveDialogOpened] = useState<boolean>(false);
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
        if (!data) throw undefined
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
        if (!data) throw undefined
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
            setLoading(false)
            if (e === undefined) return undefined
            errorHandler(e)
        }
    }

    const onRemove = async () => {
        try {
            setLoading(true)
            const apis: APIS = getApis()
            await apis.article.removeArticle(article?.id as number)
            setLoading(false)
            showNotification({
                message: 'پست مورد نظر با موفقیت حذف شد',
                title: 'عملیات موفقیت آمیز بود',
                autoClose: 2000,
                color: 'green',
            })
            setTimeout(() => {
                push('/dashboard')
            }, 2100)
        } catch (e: AxiosError | any) {
            errorHandler(e)
            setLoading(false)
        }
    }

    const disablePublished = async () => {
        try {
            setLoading(true)
            const apis: APIS = getApis()
            await apis.article.dropArticle(article?.id as number)
            setLoading(false)
            showNotification({
                message: 'پست مورد نظر با موفقیت لغو شد',
                title: 'عملیات موفقیت آمیز بود',
                autoClose: 2000,
                color: 'green',
            })
            setTimeout(() => {
                push('/dashboard?tab=unpublished')
            }, 2100)
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
        <>

            <Container size={'xl'} mb={90}>
                <Grid>
                    <Grid.Col xl={6} lg={7} md={8} xs={12}>
                        <FloatingLabelInput
                            label={'عنوان مقاله خود را وارد کنید'}
                            onChange={onChangeTitle}
                            value={title}
                            customref={titleRef}
                        />
                    </Grid.Col>
                    <Grid.Col xs={12}>
                        <ArticlesLandEditor data={article}/>
                    </Grid.Col>
                    <Grid.Col xs={12}>
                        <Drafts draftsList={drafts}/>
                    </Grid.Col>
                    <Grid.Col xs={12} mt={"sm"}>
                        <Grid dir={'ltr'} p={0} align={'end'}>
                            <Grid.Col xl={10} lg={9} md={9} sm={8} xs={12} pt={0}>
                                <Grid p={0} align={'end'} gutter={'sm'}>
                                    <Grid.Col xl={3} lg={3} md={4} sm={6} xs={12} pt={"xs"}>
                                        {
                                            article?.published ? <SecondaryBtn
                                                text={'لغو انتشار'} capsule={"true"} loading={loading}
                                                onClick={(() => disablePublished()) as MouseEventHandler}
                                            /> : <PrimaryBtn
                                                text={'انتشار پست'} capsule={"true"} loading={loading}
                                                onClick={(() => onSave(true)) as MouseEventHandler}
                                            />
                                        }
                                    </Grid.Col>
                                    <Grid.Col xl={3} lg={3} md={4} sm={6} xs={12} pt={'xs'}>
                                        <PrimaryOutlineBtn
                                            text={'ذخیره تغییرات'} capsule={"true"} loading={loading}
                                            onClick={(() => onSave()) as MouseEventHandler}
                                        />
                                    </Grid.Col>
                                </Grid>
                            </Grid.Col>
                            {
                                !!article?.id && <Grid.Col xl={2} lg={3} md={3} sm={4} xs={12} py={0} mb={13} mt={'sm'}>
                                    <DangerBtn
                                        text={'حذف پست'} capsule={"true"} loading={loading}
                                        onClick={(() => setRemoveDialogOpened(true)) as MouseEventHandler}
                                    />
                                </Grid.Col>
                            }
                        </Grid>
                    </Grid.Col>
                </Grid>
            </Container>
            <Modal
                opened={removeDialogOpened}
                onClose={() => setRemoveDialogOpened(false)}
                title={<Text color={'grey.4'} weight={500} size={'sm'}>
                    آیا شما می خواهید مقاله مورد نظر را حذف کنید؟
                </Text>}
                centered={true}
            >
                <Grid>
                    <Grid.Col xs={6}>
                        <PrimaryBtn text={'بله'} onClick={() => {
                            setRemoveDialogOpened(false)
                            onRemove().catch()
                        }}/>
                    </Grid.Col>
                    <Grid.Col xs={6}>
                        <SecondaryOutlineBtn text={'خیر'} onClick={() => setRemoveDialogOpened(false)}/>
                    </Grid.Col>
                </Grid>
            </Modal>
        </>
    )
}

export default EditContainerHOC
