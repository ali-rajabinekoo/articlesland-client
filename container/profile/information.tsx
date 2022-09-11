import React, {useEffect, useState} from "react";
import {Group, Stack, Text, useMantineTheme} from "@mantine/core";
import {PasswordInput, TextAreaInput, TextInput} from "../../component/inputs";
import {SecondaryBtn} from "../../component/buttons";
import useUserInfo from "../../hooks/useUserInfo";
import {APIS, ProfileInfoFormValues, UserDto, UseRequestResult, UseUserInfoResult} from "../../utils/types";
import {useFormik} from "formik";
import {
    profileInformationValidationForm,
    ProfileInformationValidationSchema,
} from "../../utils/validators";
import {AxiosError, AxiosResponse} from "axios";
import {errorHandler} from "../../utils/helpers";
import useRequest from "../../hooks/useRequest";
import {showNotification} from "@mantine/notifications";
import {appMessages} from "../../utils/messages";
import {IconAlertCircle, IconCheck} from "@tabler/icons";

const ProfileInformation = (): JSX.Element => {
    const theme = useMantineTheme()
    const {userInfo, setNewUser}: UseUserInfoResult = useUserInfo()
    const {getApis}: UseRequestResult = useRequest()
    const [loading, setLoading] = useState<true | false>(false)

    const profileInfoForm = useFormik({
        initialValues: {
            username: "",
            password: "",
            repeatPassword: "",
            displayName: "",
            bio: "",
        } as ProfileInfoFormValues,
        validate: profileInformationValidationForm,
        validationSchema: ProfileInformationValidationSchema,
        onSubmit: async (body: ProfileInfoFormValues) => {
            try {
                setLoading(true)
                const apis: APIS = getApis()
                if (!body.password) {
                    delete body.password
                    delete body.repeatPassword
                }
                if (!body.username) {
                    delete body.username
                }
                if (!body.displayName) {
                    delete body.displayName
                }
                if (!body.bio) {
                    delete body.bio
                }
                const response: AxiosResponse | undefined = await apis.user.updateInfo(body)
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
                setNewUser(response.data as UserDto)
                showNotification({
                    message: appMessages.loggedIn,
                    autoClose: 2000,
                    color: 'green',
                    icon: <IconCheck size={20}/>
                })
                setLoading(false)
            } catch (e: AxiosError | any) {
                setLoading(false)
                errorHandler(e)
            }
        },
    });

    const setDefaultValues = () => {
        const values: ProfileInfoFormValues = new ProfileInfoFormValues()
        if (!!userInfo?.username && !values.username) {
            values.username = userInfo.username
        }
        if (!!userInfo?.displayName && !values.displayName) {
            values.displayName = userInfo.displayName
        }
        if (!!userInfo?.bio && !values.bio) {
            values.bio = userInfo.bio
        }
        if (!values.password) {
            values.password = "";
        }
        if (!values.repeatPassword) {
            values.repeatPassword = "";
        }
        profileInfoForm.setValues(values)
    }

    useEffect(() => {
        setDefaultValues()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userInfo])

    return (
        <form onSubmit={profileInfoForm.handleSubmit}>
            <Stack spacing={'sm'}>
                <TextInput
                    labeltitle="نام کاربری"
                    textcolor={theme.colors.grey[4]}
                    placeholder="نام کاربری خود را وارد کنید"
                    labelweight={700} size="md" name="username"
                    labelsx={{fontWeight: 500}}
                    onChange={profileInfoForm.handleChange}
                    value={profileInfoForm.values.username}
                    error={<Text size={"xs"} weight={500} color={"danger.3"}>
                        {profileInfoForm.errors.username}
                    </Text>}
                    disabled={loading}
                />
                <TextInput
                    labeltitle="نام نمایشی در سایت"
                    textcolor={theme.colors.grey[4]}
                    placeholder="نام نمایشی خود را وارد کنید"
                    labelweight={700} size="md" name="displayName"
                    labelsx={{fontWeight: 500}}
                    onChange={profileInfoForm.handleChange}
                    value={profileInfoForm.values.displayName}
                    error={<Text size={"xs"} weight={500} color={"danger.3"}>
                        {profileInfoForm.errors.displayName}
                    </Text>}
                    disabled={loading}
                />
                <TextAreaInput
                    labeltitle="توضیحات پروفایل"
                    textcolor={theme.colors.grey[4]}
                    placeholder="توضیحات پروفایل خود را وارد بنویسید"
                    labelweight={700}
                    name="bio" size="md"
                    labelsx={{fontWeight: 500}}
                    onChange={profileInfoForm.handleChange}
                    value={profileInfoForm.values.bio}
                    error={!!profileInfoForm?.errors?.bio ? <Text size={"xs"} weight={500} color={"danger.3"}>
                        {profileInfoForm.errors.bio}
                    </Text> : undefined}
                    disabled={loading}
                />
                <PasswordInput
                    labeltitle="رمز عبور جدید"
                    textcolor={theme.colors.grey[4]}
                    placeholder="رمز عبور جدید خود را وارد کنید"
                    labelweight={700} size="md" name="password"
                    labelsx={{fontWeight: 500}}
                    onChange={profileInfoForm.handleChange}
                    value={profileInfoForm.values.password}
                    error={<Text size={"xs"} weight={500} color={"danger.3"}>
                        {profileInfoForm.errors.password}
                    </Text>}
                    disabled={loading}
                />
                <PasswordInput
                    labeltitle="تکرار رمز عبور"
                    textcolor={theme.colors.grey[4]}
                    placeholder="تکرار رمز عبور را وارد کنید"
                    labelweight={700} size="md" name="repeatPassword"
                    labelsx={{fontWeight: 500}}
                    onChange={profileInfoForm.handleChange}
                    value={profileInfoForm.values.repeatPassword}
                    error={<Text size={"xs"} weight={500} color={"danger.3"}>
                        {profileInfoForm.errors.repeatPassword}
                    </Text>}
                    disabled={loading}
                />
                <Group position={'center'} mt={'md'}>
                    <SecondaryBtn type={'submit'} text={'ثبت تغییرات'} capsule={'true'} containersx={{width: 160}}/>
                </Group>
            </Stack>
        </form>
    )
}

export default ProfileInformation
