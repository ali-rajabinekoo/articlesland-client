import {PublicAPIS, UseSettingLink} from "../utils/types";
import {AxiosResponse} from "axios";
import React from "react";
import {publicApis} from "./useRequest";
import {useClipboard} from "@mantine/hooks";
import {showNotification} from "@mantine/notifications";
import {appMessages} from "../utils/messages";
import {IconAlertCircle, IconCheck} from "@tabler/icons";
import {errorHandler} from "../utils/helpers";

const useSettingLink = (): UseSettingLink => {
    const clipboard = useClipboard({ timeout: 500 });
    
    const generateNewLink = async (id: number): Promise<boolean | string> => {
        try {
            const apis: PublicAPIS = publicApis()
            const response: AxiosResponse | undefined = await apis.link.setShortLink(id)
            if (!response || !response?.data) {
                showNotification({
                    message: appMessages.somethingWentWrong,
                    title: 'خطا',
                    autoClose: 3000,
                    color: 'red',
                    icon: <IconAlertCircle size={20}/>
                })
            }
            const shortLink = response?.data as string;
            const clientUrl = process.env.CLIENT_DOMAIN;
            clipboard.copy(`${clientUrl}/link/${shortLink}`);
            showNotification({
                message: 'لینک کپی شد!',
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

    return {generateNewLink}
}

export default useSettingLink