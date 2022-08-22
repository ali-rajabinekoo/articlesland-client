import React, {SetStateAction, useEffect, useState} from "react";
import {useVerificationFormStyle} from "./styles";
import {Avatar, Stack, Text, Box, LoadingOverlay, ChevronIcon, Anchor} from "@mantine/core";
import {NextRouter, useRouter} from "next/router";
import {TextInput, VerificationCodeInputs} from "../../component/inputs";
import {PrimaryBtn} from "../../component/buttons";
import {appMessages, validationMessages} from "../../utils/messages";
import {
    APIS, SignupFormValues, SignUpResponse,
    UseRequestResult,
    UseTimer,
    UseUserInfoResult,
    VerificationBody,
    VerificationResponse
} from "../../utils/types";
import useRequest from "../../hooks/useRequest";
import {AxiosError, AxiosResponse} from "axios";
import {errorHandler, normalizePhoneNumber, Timer} from "../../utils/helpers";
import useUserInfo from "../../hooks/useUserInfo";
import {showNotification} from "@mantine/notifications";
import {IconCheck, IconChevronLeft} from "@tabler/icons";
import {CountDown} from "../../component/countdown";

class VerificationFormTitleProps {
    back?: Function | undefined
}

export function VerificationFormTitle({back}: VerificationFormTitleProps) {
    const {classes} = useVerificationFormStyle()
    const router: NextRouter = useRouter()
    const onClickBackIcon = async (): Promise<void> => {
        if (!!back) back()
    }
    return (
        <Stack align={"center"} justify={"center"} spacing={"xs"} mt={-20} className={classes.formTitle}>
            <div className={classes.backIcon} onClick={onClickBackIcon}>
                <IconChevronLeft/>
            </div>
            <Text className={classes.formTitleText} weight={700} color={'grey.3'}>
                ورود به حساب کاربری
            </Text>
            <Avatar className={classes.formAvatar} src="/assets/images/verification.svg" alt="Verification svg"/>
        </Stack>
    )
}

class VerificationFormProps {
    onVerified?: Function | undefined
    verificationKey!: string | undefined
    mobile!: string | undefined
    duration?: SetStateAction<any>
    onSubmitted?: Function
    body!: SignupFormValues | undefined
}

export function VerificationForm({
    onVerified,
    verificationKey,
    mobile,
    duration,
    onSubmitted,
    body
}: VerificationFormProps) {
    const [code, setCode] = useState<string>()
    const [codeError, setCodeError] = useState<string>()
    const [loading, setLoading] = useState<boolean>(false)
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
            return setCodeError(validationMessages.invalid.code)
        }
        try {
            const data: VerificationBody = new VerificationBody()
            data.code = code
            data.key = verificationKey
            const apis: APIS = getApis()
            setLoading(true)
            const response: AxiosResponse | undefined = await apis.auth.registerVerification(data)
            const responseBody: VerificationResponse = response?.data
            if (!responseBody) throw new Error()
            setNewAccessToken(responseBody.token)
            setNewUser(responseBody.user)
            showNotification({
                message: appMessages.registrationVerified,
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

    const resend = async () => {
        try {
            if (!isActiveResend) return null
            if (!body) return null
            setLoading(true)
            const apis: APIS = getApis()
            const response: AxiosResponse | undefined = await apis.auth.register(body)
            const data: SignUpResponse = response?.data
            if (!data?.key) throw new Error()
            setIsActiveResend(false)
            showNotification({
                message: appMessages.codeSent,
                autoClose: 2000,
                color: 'green',
                icon: <IconCheck size={20}/>
            })
            setTimeout(() => {
                if (!!onSubmitted) onSubmitted(data.key, body)
                setLoading(false)
            }, 2100)
        } catch (e: AxiosError | any) {
            errorHandler(e)
            setLoading(false)
        }
    }

    const onCompleteTimer = (): void => {
        setIsActiveResend(true)
        setTimer(null)
    }
    
    useEffect(() => {
        setTimer(duration)
    } , [duration])

    return (
        <form onSubmit={onSubmit}>
            <Stack align={"stretch"} justify={"center"} spacing={"sm"} mt={-40} p={10}>
                <LoadingOverlay
                    visible={loading} overlayBlur={2}
                    loaderProps={{size: 'md', color: 'primary.2', variant: 'dots'}}
                />
                <TextInput
                    labeltitle="شماره موبایل" color={"grey.3"} disabled={true}
                    labelweight={700} size="md" name="username"
                    value={!!mobile ? normalizePhoneNumber(mobile) : ''}
                />
                <Box>
                    <Text weight={700} sx={{width: '100%'}} size={'sm'} mb={'xs'} color={'grey.3'}>
                        کد تایید
                    </Text>
                    <Box dir='ltr'>
                        <VerificationCodeInputs onChange={onChange}/>
                    </Box>
                </Box>
                <PrimaryBtn text={'تایید نهایی'} type={"submit"}/>
            </Stack>
            <Text align="center" mt="md" size="sm" color={"grey.3"} sx={{
                display: "flex", flexWrap: "nowrap", justifyContent: "center"
            }}>
                پیامی دریافت نکردید؟
                <Anchor color={"info.2"} ml={5} onClick={resend}>
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
