import {Grid, Group, Modal, Stack, Text, useMantineTheme} from "@mantine/core";
import {CheckBox, TextAreaInput} from "../inputs";
import React, {ChangeEventHandler, useState} from "react";
import {APIS, NewReportBody, ReportTypes, UseRequestResult, UseUserInfoResult} from "../../utils/types";
import {PrimaryBtn, PrimaryOutlineBtn} from "../buttons";
import useRequest from "../../hooks/useRequest";
import useUserInfo from "../../hooks/useUserInfo";
import {showNotification} from "@mantine/notifications";
import {validationMessages} from "../../utils/messages";
import {IconAlertCircle, IconCheck} from "@tabler/icons";
import {errorHandler} from "../../utils/helpers";

class ReportBadContentModalProps {
    opened?: boolean | undefined;
    setOpened?: Function | undefined;
    articleId?: number | null | undefined;
    commentId?: number | null | undefined;
}

const ReportBadContentModal = ({opened, setOpened, articleId, commentId}: ReportBadContentModalProps) => {
    const [type, setType] = useState<ReportTypes | ''>('');
    const [content, setContent] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const {getApis}:UseRequestResult = useRequest();
    const {userInfo}:UseUserInfoResult = useUserInfo()
    const theme = useMantineTheme();

    const onChangeType = (newType: ReportTypes | '') => {
        setType(newType)
    }

    const onChangeContent = (e: any) => {
        setContent(e.target.value)
    }
    
    const submitReport = async () => {
        const apis: APIS = getApis();
        const body: NewReportBody = new NewReportBody()
        if (!type) {
            return showNotification({
                message: validationMessages.empty.reportType,
                autoClose: 3000,
                color: 'red',
                icon: <IconAlertCircle size={20}/>
            })
        }
        body.type = type;
        if (type === 'other') body.content = content;
        if (!!articleId) body.articleId = articleId;
        if (!!commentId) body.commentId = commentId;
        try {
            setLoading(true)
            await apis.report.addNewReport(body);
            showNotification({
                message: 'گزارش شما با موفقیت ثبت شد',
                autoClose: 3000,
                color: 'green',
                icon: <IconCheck size={20}/>
            })
            setLoading(false)
        } catch (e) {
            errorHandler(e)
            setLoading(false)
        }
    }

    return (
        <Modal
            opened={!!userInfo && Boolean(opened)}
            onClose={() => {
                if (!!setOpened && !loading) setOpened(false)
            }}
            title='گزارش تخلف'
            size={'xl'}
        >
            <Text size={16} color={'grey.4'}>
                برای مشخص شدن و بررسی دقیق تر تخلف، یکی از موارد زیر را انتخاب کنید
            </Text>
            <Grid mt={'lg'} gutter={'sm'}>
                <Grid.Col>
                    <Group align={'center'} noWrap={true}>
                        <CheckBox
                            checked={type === 'spam'}
                            onChange={onChangeType.bind({}, type === 'spam' ? '' : 'spam')}
                        />
                        <Text size={16} color={'grey.4'}>
                            اسپم
                        </Text>
                    </Group>
                </Grid.Col>
                <Grid.Col>
                    <Group align={'center'} noWrap={true}>
                        <CheckBox
                            checked={type === 'immoral'}
                            onChange={onChangeType.bind({}, type === 'immoral' ? '' : 'immoral')}
                        />
                        <Text size={16} color={'grey.4'}>
                            مغایرت اخلاقی
                        </Text>
                    </Group>
                </Grid.Col>
                <Grid.Col>
                    <Group align={'center'} noWrap={true}>
                        <CheckBox
                            checked={type === 'abusive'}
                            onChange={onChangeType.bind({}, type === 'abusive' ? '' : 'abusive')}
                        />
                        <Text size={16} color={'grey.4'}>
                            نوشته توهین آمیز
                        </Text>
                    </Group>
                </Grid.Col>
                <Grid.Col>
                    <Group align={'center'} noWrap={true}>
                        <CheckBox
                            checked={type === 'illegal'}
                            onChange={onChangeType.bind({}, type === 'illegal' ? '' : 'illegal')}
                        />
                        <Text size={16} color={'grey.4'}>
                            مغایرت با قوانین وبسایت
                        </Text>
                    </Group>
                </Grid.Col>
                <Grid.Col>
                    <Group align={'center'} noWrap={true}>
                        <CheckBox
                            checked={type === 'aggressive'}
                            onChange={onChangeType.bind({}, type === 'aggressive' ? '' : 'aggressive')}
                        />
                        <Text size={16} color={'grey.4'}>
                            استفاده از تصاویر یا نوشته هایی که دارای خشونت عیان باشد
                        </Text>
                    </Group>
                </Grid.Col>
                <Grid.Col>
                    <Group align={'center'} noWrap={true}>
                        <CheckBox
                            checked={type === 'other'}
                            onChange={onChangeType.bind({}, type === 'other' ? '' : 'other')}
                        />
                        <Text size={16} color={'grey.4'}>
                            دلایل دیگر
                        </Text>
                    </Group>
                </Grid.Col>
            </Grid>
            <Stack spacing={'md'} mt={'lg'}>
                <Text size={16} color={'grey.4'}>
                    اگر دلیل دیگری وجود دارد و یا توضیحات اضافه تری را میخواهید گزارش دهید، در باکس زیر بنویسید
                </Text>
                <TextAreaInput
                    darker={true}
                    disabled={type !== 'other'}
                    onChange={onChangeContent as ChangeEventHandler}
                    textcolor={theme.colors.grey[4]}
                    placeholder={'توضیحات'}
                />
            </Stack>
            <Grid mt={'lg'} justify={'end'}>
                <Grid.Col xs={4} sm={3}>
                    <PrimaryOutlineBtn loading={loading} capsule={"true"} text={'انصراف'} onClick={() => {
                        if (!!setOpened) setOpened(false)
                    }}/>
                </Grid.Col>
                <Grid.Col xs={4} sm={3}>
                    <PrimaryBtn loading={loading} text={'ثبت تخلف'} capsule={"true"} onClick={submitReport}/>
                </Grid.Col>
            </Grid>
        </Modal>
    )
}

export default ReportBadContentModal;