import {DropzoneButton} from "../../component/buttons/upload";
import {Group} from "@mantine/core";
import {SecondaryBtn} from "../../component/buttons";
import React, {useState} from "react";
import {errorHandler} from "../../utils/helpers";
import {AxiosError, AxiosResponse} from "axios";
import {UserDto} from "../../utils/types";
import {showNotification} from "@mantine/notifications";
import {appMessages} from "../../utils/messages";
import {IconAlertCircle, IconCheck} from "@tabler/icons";
import {Apis} from "../../utils/apis";
import userStorage from "../../utils/userStorage";

const ProfileAvatar = (): JSX.Element => {
    const [newAvatar, setNewAvatar] = useState<File>();
    const [loading, setLoading] = useState<true | false>();
    const onChangeNewAvatar = (file: File) => {
        setNewAvatar(file)
    }
    const onSubmit = async (): Promise<void> => {
        try {
            setLoading(true)
            const apis: Apis = new Apis()
            const formData: FormData = new FormData();
            if (!!newAvatar) {
                formData.append("image", newAvatar as File);
            }
            const response: AxiosResponse | undefined = await apis.user.updateAvatar(formData)
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
            userStorage.setNewUser(response.data as UserDto)
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
    }
    return (
        <div>
            <DropzoneButton isAvatar={true} onChange={onChangeNewAvatar} disabled={loading}/>
            <Group position={'center'} mt={60}>
                <SecondaryBtn
                    onClick={onSubmit} loading={loading}
                    text={'ثبت تغییرات'} capsule={'true'}
                    containersx={{width: 160}}
                />
            </Group>
        </div>
    )
}

export default ProfileAvatar
