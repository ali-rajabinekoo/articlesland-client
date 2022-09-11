import React, {useEffect, useState} from "react";
import {Text, useMantineTheme, Group, Box} from "@mantine/core";
import {TextInput} from "../../component/inputs";
import {
    APIS,
    PureVerificationBody,
    SendEmailCodeValues,
    UserDto,
    UseRequestResult,
    UseUserInfoResult
} from "../../utils/types";
import useUserInfo from "../../hooks/useUserInfo";
import useRequest from "../../hooks/useRequest";
import {useFormik} from "formik";
import {SendEmailCodeSchema} from "../../utils/validators";
import {AxiosError, AxiosResponse} from "axios";
import {showNotification} from "@mantine/notifications";
import {appMessages} from "../../utils/messages";
import {IconAlertCircle, IconCheck} from "@tabler/icons";
import {errorHandler} from "../../utils/helpers";
import {PrimaryOutlineBtn, SecondaryBtn} from "../../component/buttons";
import ProfileVerification from "./verification";

const ProfileEmail = (): JSX.Element => {
    const theme = useMantineTheme()
    const {userInfo, setNewUser}: UseUserInfoResult = useUserInfo()
    const {getApis}: UseRequestResult = useRequest()
    const [loading, setLoading] = useState<true | false>(false)
    const [changed, setChanged] = useState<true | false>(false)
    const [code, setCode] = useState<string>()
    const [codeSent, setCodeSent] = useState<true | false>(false)
    const [isActiveResend, setIsActiveResend] = useState<boolean>(false)
    const [timer, setTimer] = useState<number>()

    const editEmailForm = useFormik({
        initialValues: {email: ""} as SendEmailCodeValues,
        validationSchema: SendEmailCodeSchema,
        onSubmit: async (body: SendEmailCodeValues) => {
            if (codeSent) return verifyCode();
            sendCode(body).catch()
        },
    });

    const sendCode = async (body: SendEmailCodeValues) => {
        try {
            setLoading(true)
            const apis: APIS = getApis()
            await apis.user.sendEmailUpdateCode(body)
            showNotification({
                message: appMessages.codeSentEmail,
                autoClose: 2000,
                color: 'green',
                icon: <IconCheck size={20}/>
            })
            setLoading(false)
            setCodeSent(true)
            setTimerComponent()
        } catch (e: AxiosError | any) {
            setLoading(false)
            errorHandler(e)
        }
    }

    const verifyCode = async () => {
        try {
            setLoading(true)
            const body: PureVerificationBody = new PureVerificationBody()
            body.code = code;
            const apis: APIS = getApis()
            const response: AxiosResponse | undefined = await apis.user.verifyEmailUpdateCode(body)
            if (!response) {
                setLoading(false)
                return showNotification({
                    message: appMessages.somethingWentWrong,
                    title: 'خطا',
                    autoClose: 3000,
                    color: 'red',
                    icon: <IconAlertCircle size={20}/>
                })
            }
            editEmailForm.resetForm()
            setNewUser(response.data as UserDto)
            showNotification({
                message: appMessages.updatedSuccessfully,
                autoClose: 2000,
                color: 'green',
                icon: <IconCheck size={20}/>
            })
            setLoading(false)
            setCodeSent(false)
            setIsActiveResend(false)
            setTimer(undefined)
        } catch (e: AxiosError | any) {
            setLoading(false)
            errorHandler(e)
        }
    }

    const setDefaultValues = () => {
        const values: SendEmailCodeValues = new SendEmailCodeValues()
        if (!!userInfo?.email && !editEmailForm.values.email) {
            values.email = userInfo.email
        }
        editEmailForm.setValues(values)
    }

    const onChangeCode = (newCode: string) => {
        setCode(newCode)
    }

    const onCompleteTimer = (): void => {
        setIsActiveResend(true)
    }

    const setTimerComponent = (): void => {
        setIsActiveResend(false)
        const time: any = !!process.env.TIMER ? Date.now() + process.env.TIMER : Date.now() + -1
        setTimer(time as number)
    }

    useEffect(() => {
        editEmailForm.resetForm()
        setDefaultValues()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userInfo])

    useEffect(() => {
        if (
            !!userInfo && !!editEmailForm.values.email &&
            userInfo.email !== editEmailForm.values.email
        ) {
            setChanged(true)
        } else {
            setChanged(false)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [editEmailForm.values.email])

    return (
        <form onSubmit={editEmailForm.handleSubmit}>
            <TextInput
                textcolor={theme.colors.grey[4]}
                placeholder="آدرس ایمیل خود را وارد کنید"
                labelweight={700} size="md" name="email"
                labelsx={{fontWeight: 500}}
                onChange={editEmailForm.handleChange}
                value={editEmailForm.values.email}
                error={<Text size={"xs"} weight={500} color={"danger.3"}>
                    {editEmailForm.errors.email}
                </Text>}
                disabled={loading || codeSent}
            />

            <ProfileVerification
                onCompleteTimer={onCompleteTimer}
                onChange={onChangeCode}
                sendCode={sendCode.bind({}, editEmailForm.values)}
                codeSent={codeSent}
                isActiveResend={isActiveResend}
                timer={timer}
            />
            <Group position={'center'} mt={'md'} mb={'md'} sx={codeSent ? {} : {display: "none"}}>
                <SecondaryBtn capsule={"true"} type={'submit'} text={'ثبت تغییرات'} loading={loading}/>
            </Group>

            <Box sx={
                !codeSent && changed && !editEmailForm.errors.email ?
                    {display: 'block'} :
                    {display: "none"}
            }>
                <Group position={'center'} mt={'md'}>
                    <PrimaryOutlineBtn type={'submit'} text={'ارسال کد یکبار مصرف'} loading={loading}/>
                </Group>
            </Box>
        </form>
    )
}

export default ProfileEmail
