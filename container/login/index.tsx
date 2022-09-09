import React, {useState} from "react";
import {Anchor, Stack, Box, Text, Avatar} from "@mantine/core";
import {PasswordInput, TextInput} from "../../component/inputs";
import {PrimaryBtn, SecondaryBtn} from "../../component/buttons";
import {useLoginFormStyle} from "./styles";
import {NextRouter, useRouter} from "next/router";
import {useFormik} from 'formik';
import {
    APIS,
    UserAndTokenResponse,
    LoginFormValues,
    UseRequestResult,
    UseUserInfoResult
} from "../../utils/types";
import {LoginValidationSchema} from "../../utils/validators";
import useRequest from "../../hooks/useRequest";
import {AxiosError, AxiosResponse} from "axios";
import {errorHandler} from "../../utils/helpers";
import {showNotification} from "@mantine/notifications";
import {IconCheck, IconChevronLeft} from "@tabler/icons";
import {appMessages} from "../../utils/messages";
import {CountDown} from "../../component/auxiliary/countDown";
import {LoadingOverlay} from "../../component/auxiliary/loadingOverlay";
import useUserInfo from "../../hooks/useUserInfo";

export const LoginFormTitle = () => {
    const {classes} = useLoginFormStyle()
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
                برای ورود نام کاربری و پسوورد خود را وارد کنید و یا از طریق کد یکبار مصرف وارد شوید
            </Text>
        </Stack>
    )
}

interface LoginFormProps {
    onSubmitted?: Function
    showLoginByCodeForm?: Function
}

export const LoginForm = ({onSubmitted, showLoginByCodeForm}: LoginFormProps) => {
    const {push}: NextRouter = useRouter()
    const {getApis}: UseRequestResult = useRequest()
    const {setNewAccessToken, setNewUser}: UseUserInfoResult = useUserInfo()
    const [visible, setVisible] = useState<boolean>(false);

    const loginForm = useFormik({
        initialValues: {
            username: "",
            password: "",
        } as LoginFormValues,
        validationSchema: LoginValidationSchema,
        onSubmit: async (body: LoginFormValues) => {
            try {
                setVisible(true)
                const apis: APIS = getApis()
                const response: AxiosResponse | undefined = await apis.auth.loginByCredentials(body)
                const data: UserAndTokenResponse = response?.data
                if (!data?.user) throw new Error()
                if (!data?.token) throw new Error()
                setNewUser(data.user)
                setNewAccessToken(data.token)
                showNotification({
                    message: appMessages.loggedIn,
                    autoClose: 2000,
                    color: 'green',
                    icon: <IconCheck size={20}/>
                })
                setTimeout(() => {
                    setVisible(false)
                    push("/")
                }, 2100)
            } catch (e: AxiosError | any) {
                errorHandler(e)
                setVisible(false)
            }
        },
    });

    const onClickRegistrationPage = async (): Promise<void> => {
        await push("/registration")
    }



    return (
        <form onSubmit={loginForm.handleSubmit}>
            <Stack align={"stretch"} justify={"center"} spacing={"sm"} mt={-30} p={10}>
                {/*<LoadingOverlay visible={visible}/>*/}
                <TextInput
                    labeltitle="نام کاربری" color={"grey.3"}
                    placeholder="نام کاربری خود را وارد کنید"
                    labelweight={700} size="md" name="username"
                    onChange={loginForm.handleChange}
                    value={loginForm.values.username}
                    error={<Text size={"xs"} weight={500} color={"danger.3"}>
                        {loginForm.errors.username}
                    </Text>}
                    disabled={visible}
                />
                <PasswordInput
                    labeltitle="رمز عبور" color={"grey.3"}
                    placeholder="رمز عبور خود را وارد کنید"
                    labelweight={700} size="md" name="password"
                    onChange={loginForm.handleChange}
                    value={loginForm.values.password}
                    error={<Text size={"xs"} weight={500} color={"danger.3"}>
                        {loginForm.errors.password}
                    </Text>}
                    disabled={visible}
                />

                <Box>
                    {/* @ts-ignore*/}
                    <Box onClick={showLoginByCodeForm}>
                        <SecondaryBtn text={'ورود با رمز یک بار مصرف'} type={"button"} loading={visible}/>
                    </Box>
                    <PrimaryBtn text={'ورود'} type={"submit"} loading={visible}/>
                </Box>
            </Stack>
            <Text align="center" mt="sm" size="sm" color={"grey.3"}>
                حساب کاربری ندارید؟{' '}
                <Anchor color={"info.2"} onClick={onClickRegistrationPage}>
                    ثبت نام کنید
                </Anchor>
            </Text>
            <CountDown/>
        </form>
    )
}
