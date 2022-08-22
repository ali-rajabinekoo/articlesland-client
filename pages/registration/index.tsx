import React, {SetStateAction, useState} from "react";
import type {NextPage} from 'next'
import {AuthLayout} from "../../container/layout/authLayout";
import {RegistrationForm, RegistrationFormTitle} from "../../container/registration";
import {SignupFormValues} from "../../utils/types";
import {VerificationForm, VerificationFormTitle} from "../../container/verification";
import {NextRouter, useRouter} from "next/router";

const Registration: NextPage = () => {
    const [key, setKey] = useState<string>()
    const [step, setStep] = useState<number>(1)
    const [timer, setTimer] = useState()
    const [values, setValues] = useState<SignupFormValues>()
    const {push}: NextRouter = useRouter()

    const onSubmitted = (newKey: string, body: SignupFormValues) => {
        setKey(newKey)
        setValues(body)
        setStep(2)
        const time: any = !!process.env.TIMER ? Date.now() + process.env.TIMER : Date.now() + -1
        setTimer(time)
    }

    const onVerified = async () => {
        await push('/')
    }

    const backFromVerification = async () => {
        setStep(1)
    }

    const renderTitle = (): React.ReactNode => {
        switch (step) {
            case 1: {
                return <RegistrationFormTitle/>
            }
            case 2: {
                return <VerificationFormTitle back={backFromVerification}/>
            }
        }
    }

    const renderContent = (): React.ReactNode => {
        switch (step) {
            case 1: {
                return <RegistrationForm onSubmitted={onSubmitted}/>
            }
            case 2: {
                return <VerificationForm
                    verificationKey={key} onVerified={onVerified}
                    mobile={values?.phoneNumber} duration={timer}
                    body={values} onSubmitted={onSubmitted}
                />
            }
        }
    }

    return (<AuthLayout title={renderTitle()}>
        {renderContent()}
    </AuthLayout>)
}

export default Registration