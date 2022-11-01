import React, {useState} from "react";
import type {NextPage} from 'next'
import {AuthLayout} from "../../container/layout/authLayout";
import {APIS, SendLoginCodeValues, SignupFormValues, UseRequestResult, VerificationResponse} from "../../utils/types";
import {VerificationForm, VerificationFormTitle} from "../../container/verification";
import {NextRouter, useRouter} from "next/router";
import {AxiosResponse} from "axios";
import {showNotification} from "@mantine/notifications";
import {appMessages} from "../../utils/messages";
import {IconCheck} from "@tabler/icons";
import useRequest from "../../hooks/useRequest";
import {LoginForm, LoginFormTitle} from "../../container/login";

const Login: NextPage = () => {
    const [key, setKey] = useState<string>()
    const [step, setStep] = useState<number>(1)
    const [timer, setTimer] = useState()
    const [values, setValues] = useState<SignupFormValues>()
    const {getApis}: UseRequestResult = useRequest()
    const {push}: NextRouter = useRouter()

    const onVerified = async () => {
        await push('/')
    }

    const backFromVerification = async () => {
        setStep(1)
    }

    const resend = async (body: SendLoginCodeValues) => {
        const apis: APIS = getApis()
        let response: AxiosResponse | undefined = await apis.auth.sendLoginCode(body)
        const data: VerificationResponse = response?.data
        if (!data?.key) throw new Error()
        showNotification({
            message: appMessages.codeSent,
            autoClose: 2000,
            color: 'green',
            icon: <IconCheck size={20}/>
        })
        setKey(data.key)
        const time: any = !!process.env.TIMER ? Date.now() + process.env.TIMER : Date.now() + -1
        setTimer(time)
    }

    const showLoginByCodeForm = () => {
        setStep(2)
    }

    const renderTitle = (): React.ReactNode => {
        switch (step) {
            case 1: {
                return <LoginFormTitle/>
            }
            case 2: {
                return <VerificationFormTitle
                    title={'ایجاد حساب کاربری'}
                    back={backFromVerification}
                />
            }
        }
    }

    const renderContent = (): React.ReactNode => {
        switch (step) {
            case 1: {
                return <LoginForm showLoginByCodeForm={showLoginByCodeForm}/>
            }
            case 2: {
                return <VerificationForm
                    verificationKey={key} onVerified={onVerified}
                    defaultMobile={values?.phoneNumber} duration={timer}
                    btnTitle={!!key ? 'ورود' : 'ارسال کد یکبار مصرف'} resendCode={resend}
                />
            }
        }
    }

    return (<AuthLayout title={renderTitle()}>
        {renderContent()}
    </AuthLayout>)
}

export default Login