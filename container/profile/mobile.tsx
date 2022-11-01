import React, {useEffect, useState} from "react";
import {Text, useMantineTheme, Group, Box} from "@mantine/core";
import {TextInput} from "../../component/inputs";
import {
    APIS, PureVerificationBody,
    SendLoginCodeValues,
    UserDto,
    UseRequestResult,
    UseUserInfoResult
} from "../../utils/types";
import useUserInfo from "../../hooks/useUserInfo";
import useRequest from "../../hooks/useRequest";
import {useFormik} from "formik";
import {SendLoginCodeSchema} from "../../utils/validators";
import {AxiosError, AxiosResponse} from "axios";
import {showNotification} from "@mantine/notifications";
import {appMessages} from "../../utils/messages";
import {IconAlertCircle, IconCheck} from "@tabler/icons";
import {errorHandler} from "../../utils/helpers";
import {PrimaryOutlineBtn, SecondaryBtn} from "../../component/buttons";
import ProfileVerification from "./verification";
import {AppDispatch} from "../../utils/app.store";
import {useAppDispatch} from "../../hooks/redux";
import {setUserInfo} from "../../reducers/userInfo";

const ProfileMobile = (): JSX.Element => {
    const theme = useMantineTheme()
    const {userInfo, setNewUser}: UseUserInfoResult = useUserInfo()
    const {getApis}: UseRequestResult = useRequest()
    const [loading, setLoading] = useState<true | false>(false)
    const [changed, setChanged] = useState<true | false>(false)
    const [code, setCode] = useState<string>()
    const [codeSent, setCodeSent] = useState<true | false>(false)
    const [isActiveResend, setIsActiveResend] = useState<boolean>(false)
    const [timer, setTimer] = useState<number>()
    const dispatch: AppDispatch = useAppDispatch()

    const editMobileForm = useFormik({
        initialValues: {phoneNumber: ""} as SendLoginCodeValues,
        validationSchema: SendLoginCodeSchema,
        onSubmit: async (body: SendLoginCodeValues) => {
            if (codeSent) return verifyCode();
            sendCode(body).catch()
        },
    });

    const sendCode = async (body: SendLoginCodeValues) => {
        try {
            setLoading(true)
            const apis: APIS = getApis()
            await apis.user.sendMobileUpdateCode(body)
            showNotification({
                message: appMessages.codeSent,
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
            const response: AxiosResponse | undefined = await apis.user.verifyMobileUpdateCode(body)
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
            editMobileForm.resetForm()
            setNewUser({...response.data as UserDto}, true)
            dispatch(setUserInfo({...response.data} as UserDto))
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
        const values: SendLoginCodeValues = new SendLoginCodeValues()
        if (!!userInfo?.phoneNumber && !editMobileForm.values.phoneNumber) {
            values.phoneNumber = `0${userInfo.phoneNumber}`
        }
        editMobileForm.setValues(values)
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
        editMobileForm.resetForm()
        setDefaultValues()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userInfo])

    useEffect(() => {
        if (
            !!userInfo && !!editMobileForm.values.phoneNumber &&
            `0${userInfo.phoneNumber}` !== editMobileForm.values.phoneNumber
        ) {
            setChanged(true)
        } else {
            setChanged(false)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [editMobileForm.values.phoneNumber])

    return (
        <form onSubmit={editMobileForm.handleSubmit}>
            <TextInput
                textcolor={theme.colors.grey[4]}
                placeholder="شماره موبایل خود را وارد کنید"
                labelweight={700} size="md" name="phoneNumber"
                labelsx={{fontWeight: 500}}
                onChange={editMobileForm.handleChange}
                value={editMobileForm.values.phoneNumber}
                error={!!editMobileForm?.errors?.phoneNumber ? <Text size={"xs"} weight={500} color={"danger.3"}>
                    {editMobileForm.errors.phoneNumber}
                </Text> : undefined}
                disabled={loading || codeSent}
            />

            <ProfileVerification
                onCompleteTimer={onCompleteTimer}
                onChange={onChangeCode}
                sendCode={sendCode.bind({}, editMobileForm.values)}
                codeSent={codeSent}
                isActiveResend={isActiveResend}
                timer={timer}
            />
            <Group position={'center'} mt={'md'} mb={'md'} sx={codeSent ? {} : {display: "none"}}>
                <SecondaryBtn capsule={"true"} type={'submit'} text={'ثبت تغییرات'} loading={loading}/>
            </Group>

            <Box sx={
                !codeSent && changed && !editMobileForm.errors.phoneNumber ?
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

export default ProfileMobile
