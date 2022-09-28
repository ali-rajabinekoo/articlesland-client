import React, {useEffect, useState} from "react";
import {Group, Stack} from "@mantine/core";
import {IconForbid, IconPlus} from "@tabler/icons";
import {PrimaryOutlineBtn, SecondaryBtn, SecondaryOutlineBtn} from "../../component/buttons";
import {UserDto} from "../../utils/types";
import {UserInfoWrapper} from "../../component/wrappers/userInfo";
import {errorHandler} from "../../utils/helpers";
import useUserInfo from "../../hooks/useUserInfo";
import useFollow from "../../hooks/useFollow";

interface UserPageTabsProps {
    user: UserDto
}

export default function UserPageTabs({user}: UserPageTabsProps) {
    const {userInfo} = useUserInfo()
    const [followed, setFollowed] = useState<boolean>(false)
    const {follow: mainFollowFunction} = useFollow()
    const follow = async (unfollow: boolean | undefined = false) => {
        try {
            mainFollowFunction(user.id, unfollow)
            setFollowed(!unfollow)
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
