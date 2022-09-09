import React, {useState} from "react";
import {Anchor, Stack, Text, Box, Avatar} from "@mantine/core";
import {PasswordInput, TextInput} from "../../component/inputs";
import {PrimaryBtn} from "../../component/buttons";
import {useRegistrationFormStyle} from "./styles";
import {NextRouter, useRouter} from "next/router";
import {useFormik} from 'formik';
import {APIS, SignupFormValues, VerificationResponse, UseRequestResult} from "../../utils/types";
import {signupValidationForm, SignupValidationSchema} from "../../utils/validators";
import useRequest from "../../hooks/useRequest";
import {AxiosError, AxiosResponse} from "axios";
import {errorHandler} from "../../utils/helpers";
import {showNotification} from "@mantine/notifications";
import {IconCheck, IconChevronLeft} from "@tabler/icons";
import {appMessages} from "../../utils/messages";
import {CountDown} from "../../component/auxiliary/countDown";
import {LoadingOverlay} from "../../component/auxiliary/loadingOverlay";

export const RegistrationFormTitle = () => {
    const {classes} = useRegistrationFormStyle()
    const {push}: NextRouter = useRouter()
    const onClickBackIcon = async (): Promise<void> => {
        await push("/")
    }
    return (
        <Stack align={"center"} justify={"center"} spacing={"xs"} mt={-20} className={classes.formTitle}>
            <div className={classes.backIcon} onClick={onClickBackIcon}>
                <IconChevronLeft/>
            </div>
            <Avatar src="/assets/images/icon.svg" size={225} alt="Articles Land"/>
            <Text size={"xl"} sx={{fontStyle: 'IRANSansX-Bold'}} color={"grey.3"} mt={-20}>
                به
                <Text mx={5} component={"span"} sx={{fontFamily: "Poppins"}}>
                    ArticleLand
                </Text>
                خوش آمدید
            </Text>
            <Text size={"sm"} weight={400} color={"grey.3"}>
                برای ثبت نام فرم زیر را تکمیل کنید
            </Text>
        </Stack>
    )
}

interface RegistrationFormProps {
    onSubmitted?: Function
}

export const RegistrationForm = ({onSubmitted}:RegistrationFormProps) => {
    const {push}: NextRouter = useRouter()
    const {getApis}: UseRequestResult = useRequest()
    const [visible, setVisible] = useState<boolean>(false);

    const signupForm = useFormik({
        initialValues: {
            username: "",
            phoneNumber: "",
            password: "",
            repeatPassword: ""
        } as SignupFormValues,
        validate: signupValidationForm,
        validationSchema: SignupValidationSchema,
        onSubmit: async (body: SignupFormValues) => {
            try {
                setVisible(true)
                const apis: APIS = getApis()
                const response: AxiosResponse | undefined = await apis.auth.register(body)
                const data: VerificationResponse = response?.data
                if (!data?.key) throw new Error()
                showNotification({
                    message: appMessages.codeSent,
                    autoClose: 2000,
                    color: 'green',
                    icon: <IconCheck size={20}/>
                })
                setTimeout(() => {
                    if (!!onSubmitted) onSubmitted(data.key, body)
                    setVisible(false)
                }, 2100)
            } catch (e: AxiosError | any) {
                errorHandler(e)
                setVisible(false)
            }
        },
    });

    const onClickLoginPage = async (): Promise<void> => {
        await push("/login")
    }

    return (
        <form onSubmit={signupForm.handleSubmit}>
            <Stack align={"stretch"} justify={"center"} spacing={"sm"} mt={-30} p={10}>
                {/*<LoadingOverlay visible={visible}/>*/}
                <TextInput
                    labeltitle="نام کاربری" color={"grey.3"}
                    placeholder="نام کاربری خود را وارد کنید"
                    labelweight={700} size="md" name="username"
                    onChange={signupForm.handleChange}
                    value={signupForm.values.username}
                    error={<Text size={"xs"} weight={500} color={"danger.3"}>
                        {signupForm.errors.username}
                    </Text>}
                    disabled={visible}
                />
                <TextInput
                    labeltitle="شماره موبایل" color={"grey.3"}
                    placeholder="شماره موبایل خود را وارد کنید"
                    labelweight={700} size="md" name="phoneNumber"
                    onChange={signupForm.handleChange}
                    value={signupForm.values.phoneNumber}
                    error={<Text size={"xs"} weight={500} color={"danger.3"}>
                        {signupForm.errors.phoneNumber}
                    </Text>}
                    disabled={visible}
                />
                <PasswordInput
                    labeltitle="رمز عبور" color={"grey.3"}
                    placeholder="رمز عبور خود را وارد کنید"
                    labelweight={700} size="md" name="password"
                    onChange={signupForm.handleChange}
                    value={signupForm.values.password}
                    error={<Text size={"xs"} weight={500} color={"danger.3"}>
                        {signupForm.errors.password}
                    </Text>}
                    disabled={visible}
                />
                <PasswordInput
                    labeltitle="تکرار رمز عبور" color={"grey.3"}
                    placeholder="رمز عبور خود را دوباره وارد کنید"
                    labelweight={700} size="md" name="repeatPassword"
                    onChange={signupForm.handleChange}
                    value={signupForm.values.repeatPassword}
                    error={<Text size={"xs"} weight={500} color={"danger.3"}>
                        {signupForm.errors.repeatPassword}
                    </Text>}
                    disabled={visible}
                />
                <PrimaryBtn text={'ثبت نام'} type={"submit"} loading={visible}/>
            </Stack>
            <Text align="center" mt="sm" size="sm" color={"grey.3"}>
                حساب کاربری دارید؟{' '}
                <Anchor color={"info.2"} onClick={onClickLoginPage}>
                    وارد شوید
                </Anchor>
            </Text>
            <CountDown/>
        </form>
    )
}
