import React, {SetStateAction, useEffect, useState} from "react";
import {useVerificationFormStyle} from "./styles";
import {Avatar, Stack, Text, Box, Anchor} from "@mantine/core";
import {TextInput, VerificationCodeInputs} from "../../component/inputs";
import {PrimaryBtn} from "../../component/buttons";
import {appMessages, validationMessages} from "../../utils/messages";
import {
    APIS,
    SendLoginCodeValues,
    UseRequestResult,
    UseUserInfoResult,
    VerificationBody,
    UserAndTokenResponse
} from "../../utils/types";
import useRequest from "../../hooks/useRequest";
import {AxiosError, AxiosResponse} from "axios";
import {errorHandler, normalizePhoneNumber} from "../../utils/helpers";
import useUserInfo from "../../hooks/useUserInfo";
import {showNotification} from "@mantine/notifications";
import {IconAlertCircle, IconCheck, IconChevronLeft} from "@tabler/icons";
import {CountDown} from "../../component/countDown";
import {LoadingOverlay} from "../../component/loadingOverlay";
import {useFormik} from "formik";
import {SendLoginCodeSchema} from "../../utils/validators";

class VerificationFormTitleProps {
    back?: Function | undefined
    title?: string | undefined
}

export function VerificationFormTitle({back, title}: VerificationFormTitleProps) {
    const {classes} = useVerificationFormStyle()

    const onClickBackIcon = async (): Promise<void> => {
        if (!!back) back()
    }

    return (
        <Stack align={"center"} justify={"center"} spacing={"xs"} mt={-20} className={classes.formTitle}>
            <div className={classes.backIcon} onClick={onClickBackIcon}>
                <IconChevronLeft/>
            </div>
            <Text className={classes.formTitleText} weight={700} color={'grey.3'}>
                {title}
            </Text>
            <Avatar className={classes.formAvatar} src="/assets/images/verification.svg" alt="Verification svg"/>
        </Stack>
    )
}

class VerificationFormProps {
    onVerified?: Function | undefined
    verificationKey!: string | undefined
    defaultMobile!: string | undefined
    btnTitle!: string | undefined
    duration?: SetStateAction<any>
    resendCode?: Function
}

export function VerificationForm({
    onVerified,
    verificationKey,
    defaultMobile,
    btnTitle,
    duration,
    resendCode
}: VerificationFormProps) {
    const [code, setCode] = useState<string>()
    const [loading, setLoading] = useState<boolean>(false)
    const [codeSent, setCodeSent] = useState<boolean>(false)
    const [timer, setTimer] = useState<any>()
    const [isActiveResend, setIsActiveResend] = useState<boolean>(false)
    const {getApis}: UseRequestResult = useRequest()
    const {setNewUser, setNewAccessToken}: UseUserInfoResult = useUserInfo()

    const onChange = (newCode: string) => {
        setCode(newCode)
    }

    const onSubmit = async (e: any): Promise<any> => {
        e.preventDefault()
        if (code?.length !== 6) {
            return showNotification({
                message: validationMessages.invalid.code,
                title: 'خطا',
                autoClose: 2000,
                color: 'red',
                icon: <IconAlertCircle size={20}/>
            });
        }
        try {
            const data: VerificationBody = new VerificationBody()
            data.code = code
            data.key = verificationKey
            const apis: APIS = getApis()
            setLoading(true)
            let response: AxiosResponse | undefined
            if (!!defaultMobile) {
                response = await apis.auth.registerVerification(data)
            } else {
                response = await apis.auth.verifyLoginCode(data)
            }
            const responseBody: UserAndTokenResponse = response?.data
            if (!responseBody) {
                setLoading(false)
                return showNotification({
                    message: appMessages.somethingWentWrong,
                    title: 'خطا',
                    autoClose: 3000,
                    color: 'red',
                    icon: <IconAlertCircle size={20}/>
                })
            }
            setNewAccessToken(responseBody.token)
            setNewUser(responseBody.user)
            showNotification({
                message: !!defaultMobile ? appMessages.registrationVerified : appMessages.loggedIn,
                autoClose: 2000,
                color: 'green',
                icon: <IconCheck size={20}/>
            })
            setTimeout(() => {
                if (!!onVerified) onVerified()
            }, 2100)
            setLoading(false)
        } catch (e) {
            setLoading(false)
            errorHandler(e)
        }
    }

    const sendCode = async (body?: any) => {
        try {
            if (!resendCode) return null
            setLoading(true)
            if (!!body) await resendCode(body)
            else await resendCode()
            setIsActiveResend(false)
            setTimeout(() => {
                setLoading(false)
            }, 2100)
        } catch (e: AxiosError | any) {
            setCodeSent(false)
            setLoading(false)
            errorHandler(e)
        }
    }

    const onCompleteTimer = (): void => {
        setIsActiveResend(true)
        setTimer(null)
    }

    const sendCodeForm = useFormik({
        initialValues: {
            phoneNumber: "",
        } as SendLoginCodeValues,
        validationSchema: SendLoginCodeSchema,
        onSubmit: async (body: SendLoginCodeValues) => {
            if (codeSent) return null
            setCodeSent(true)
            sendCode(body)
        }
    })

    useEffect(() => {
        setTimer(duration)
    }, [duration])

    return (
        <form onSubmit={!!defaultMobile || codeSent ? onSubmit : sendCodeForm.handleSubmit}>
            <Stack align={"stretch"} justify={"center"} spacing={"sm"} mt={-40} p={10}>
                <LoadingOverlay visible={loading}/>
                <TextInput
                    labelweight={700} size="md" name="phoneNumber" placeholder={'شماره موبایل خود را وارد کنید'}
                    labeltitle="شماره موبایل" color={"grey.3"} disabled={!!defaultMobile}
                    value={!!defaultMobile ? normalizePhoneNumber(defaultMobile) : sendCodeForm.values.phoneNumber}
                    onChange={sendCodeForm.handleChange}
                    error={<Text size={"xs"} weight={500} color={"danger.3"}>
                        {sendCodeForm.errors.phoneNumber}
                    </Text>}
                />
                <Box sx={{display: !!defaultMobile || codeSent ? "block" : "none"}}>
                    <Text weight={700} sx={{width: '100%'}} size={'sm'} mb={'xs'} color={'grey.3'}>
                        کد تایید
                    </Text>
                    <Box dir='ltr'>
                        <VerificationCodeInputs onChange={onChange}/>
                    </Box>
                </Box>
                <PrimaryBtn text={btnTitle} type={"submit"}/>
            </Stack>
            <Text align="center" mt="md" size="sm" color={"grey.3"} sx={{
                display: !!defaultMobile || codeSent ? "flex" : "none", flexWrap: "nowrap", justifyContent: "center"
            }}>
                پیامی دریافت نکردید؟
                {/* @ts-ignore*/}
                <Anchor
                    color={"info.2"} ml={5}
                    onClick={!isActiveResend ? () => null : sendCode.bind({}, sendCodeForm.values)}
                >
                    {
                        !!timer && !isActiveResend ?
                            <CountDown duration={timer} onComplete={onCompleteTimer}/> :
                            <span>مجدد امتحان کنید</span>
                    }
                </Anchor>
            </Text>
        </form>
    )
}
