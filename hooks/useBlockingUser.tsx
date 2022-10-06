import useRequest from "./useRequest";
import useUserInfo from "./useUserInfo";
import {APIS, UseBlockingUser, UserDto} from "../utils/types";
import {AxiosResponse} from "axios";
import {showNotification} from "@mantine/notifications";
import {appMessages} from "../utils/messages";
import {IconAlertCircle, IconCheck} from "@tabler/icons";
import {errorHandler} from "../utils/helpers";
import React from "react";

const useBlockingUser = (): UseBlockingUser => {
    const {getApis} = useRequest()
    const {setNewUser} = useUserInfo()

    const block = async (userId: number, unblock: boolean | undefined = false): Promise<boolean> => {
        const apis: APIS = getApis()
        try {
            const response: AxiosResponse | undefined = unblock ?
                await apis.user.unblock(userId) :
                await apis.user.block(userId);
            if (!response) {
                showNotification({
                    message: appMessages.somethingWentWrong,
                    title: 'خطا',
                    autoClose: 3000,
                    color: 'red',
                    icon: <IconAlertCircle size={20}/>
                })
                return false
            }
            setNewUser(response.data as UserDto)
            showNotification({
                message: unblock ? appMessages.unblocked : appMessages.blocked,
                autoClose: 2000,
                color: 'green',
                icon: <IconCheck size={20}/>
            })
            return true
        } catch (e) {
            errorHandler(e)
            return false
        }
    }

    return {block}
}

export default useBlockingUser