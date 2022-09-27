import React, {useEffect, useState} from "react";
import {Group, Stack} from "@mantine/core";
import {IconAlertCircle, IconCheck, IconForbid, IconPlus} from "@tabler/icons";
import {PrimaryOutlineBtn, SecondaryBtn, SecondaryOutlineBtn} from "../../component/buttons";
import {APIS, FollowBody, UserDto} from "../../utils/types";
import {UserInfoWrapper} from "../../component/wrappers/userInfo";
import {errorHandler} from "../../utils/helpers";
import useUserInfo from "../../hooks/useUserInfo";
import useRequest from "../../hooks/useRequest";
import {AxiosResponse} from "axios";
import {appMessages} from "../../utils/messages";
import {showNotification} from "@mantine/notifications";

interface UserPageTabsProps {
    user: UserDto
}

export default function UserPageTabs({user}: UserPageTabsProps) {
    const {userInfo, setNewUser} = useUserInfo()
    const [followed, setFollowed] = useState<boolean>(false)
    const {getApis} = useRequest()
    const follow = async (unfollow: boolean | undefined = false) => {
        try {
            const body: FollowBody = new FollowBody()
            body.newFollowingUserId = Number(user.id);
            const apis: APIS = getApis()
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
            setFollowed(!unfollow)
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
    useEffect(() => {
        if (!!userInfo && !!user) {
            const me: UserDto | undefined = userInfo.followings?.find((el) => el.id === user.id)
            if (!!me) setFollowed(true)
            else setFollowed(false)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userInfo, user])
    return (
        <div>
            <Group position={'center'} style={!!user ? {} : {display: 'none'}} mb={'sm'} mt={'lg'}>
                <Stack align={'center'} spacing={'sm'} sx={{maxWidth: 1000}} p={'lg'}>
                    <UserInfoWrapper user={user}/>
                    {!!userInfo && <Group position={'center'} spacing={'sm'} mt={"sm"}>
                        <PrimaryOutlineBtn leftIcon={<IconForbid/>} text={'بلاک کاربر'} capsule={"true"}/>
                        {
                            !followed ?
                                <SecondaryBtn
                                    onClick={follow.bind({}, false) as any}
                                    leftIcon={<IconPlus/>}
                                    text={'فالو کنید'} capsule={"true"}
                                /> :
                                <SecondaryOutlineBtn
                                    onClick={follow.bind({}, true) as any}
                                    leftIcon={<IconPlus/>}
                                    text={'فالو شده'} capsule={"true"}
                                />
                        }
                    </Group>}
                </Stack>
            </Group>
        </div>
    )
}
