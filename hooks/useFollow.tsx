import useRequest from "./useRequest";
import useUserInfo from "./useUserInfo";
import {APIS, FollowBody, UseFollow, UserDto} from "../utils/types";
import {AxiosResponse} from "axios";
import {showNotification} from "@mantine/notifications";
import {appMessages} from "../utils/messages";
import {IconAlertCircle, IconCheck} from "@tabler/icons";
import {errorHandler} from "../utils/helpers";
import React from "react";

const useFollow = (): UseFollow => {
    const {getApis} = useRequest()
    const {setNewUser} = useUserInfo()

    const follow = async (userId: number, unfollow: boolean | undefined = false) => {
        const apis: APIS = getApis()
        const body: FollowBody = new FollowBody()
        body.newFollowingUserId = Number(userId);
        try {
            const response: AxiosResponse | undefined = unfollow ?
                await apis.user.unfollow(body) :
                await apis.user.follow(body);
            if (!response) return showNotification({
                message: appMessages.somethingWentWrong,
                title: 'خطا',
                autoClose: 3000,
                color: 'red',
                icon: <IconAlertCircle size={20}/>
            })
            setNewUser(response.data as UserDto)
            showNotification({
                message: unfollow ? appMessages.unfollowed : appMessages.followed,
                autoClose: 2000,
                color: 'green',
                icon: <IconCheck size={20}/>
            })
        } catch (e) {
            errorHandler(e)
        }
    }

    return {follow}
}

export default useFollow