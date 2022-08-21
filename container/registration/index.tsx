import React from "react";
import {Anchor, Stack, Text, Box, Avatar} from "@mantine/core";
import {PasswordInput, TextInput} from "../../component/inputs";
import {PrimaryBtn} from "../../component/buttons";
import {ChevronLeftIcon} from '@heroicons/react/outline'
import {useRegistrationFormStyle} from "./styles";
import {useRouter} from "next/router";

export const RegistrationFormTitle = () => {
    const {classes} = useRegistrationFormStyle()
    const {push} = useRouter()
    const onClickBackIcon = async () => {
        await push("/")
    }
    return (
        <Stack align={"center"} justify={"center"} spacing={"xs"} mt={-20} className={classes.formTitle}>
            <div className={classes.backIcon} onClick={onClickBackIcon}>
                <ChevronLeftIcon/>
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

export const RegistrationForm = () => {
    const {push} = useRouter()
    const onClickLoginPage = async () => {
        await push("/login")
    }
    return (
        <Box>
            <Stack align={"stretch"} justify={"center"} spacing={"sm"} mt={-30}>
                <TextInput
                    labeltitle="نام کاربری" color={"grey.3"} size="md"
                    placeholder="نام کاربری خود را وارد کنید"
                    labelWeight={900}
                />
                <TextInput
                    labeltitle="ایمیل" color={"grey.3"} size="md"
                    placeholder="ایمیل خود را وارد کنید"
                    labelWeight={900} weight={900}
                />
                <TextInput
                    labeltitle="شماره موبایل" color={"grey.3"} size="md"
                    placeholder="شماره موبایل خود را وارد کنید"
                    labelWeight={900}
                />
                <PasswordInput
                    labeltitle="رمز عبور" color={"grey.3"} size="md"
                    placeholder="رمز عبور خود را وارد کنید"
                    labelWeight={900}
                />
                <PasswordInput
                    labeltitle="تکرار رمز عبور" color={"grey.3"} size="md"
                    placeholder="رمز عبور خود را دوباره وارد کنید"
                    labelWeight={900}
                />
                <PrimaryBtn text={'ثبت نام'}/>
            </Stack>
            <Text align="center" mt="lg" size="sm" color={"grey.3"}>
                حساب کاربری دارید؟{' '}
                <Anchor color={"info.2"} onClick={onClickLoginPage}>
                    وارد شوید
                </Anchor>
            </Text>
        </Box>
    )
}