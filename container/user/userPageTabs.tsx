import React, {useEffect, useState} from "react";
import {Group, Modal, Stack} from "@mantine/core";
import {IconForbid, IconPlus} from "@tabler/icons";
import {PrimaryOutlineBtn, SecondaryBtn, SecondaryOutlineBtn} from "../../component/buttons";
import {FollowedUserDto, UserDto} from "../../utils/types";
import {UserInfoWrapper} from "../../component/wrappers/userInfo";
import {changeUrlToServerRequest, errorHandler} from "../../utils/helpers";
import useUserInfo from "../../hooks/useUserInfo";
import useFollow from "../../hooks/useFollow";
import FollowedUser from "../../component/tables/followedUsers";

interface UserPageTabsProps {
    user: UserDto
}

export default function UserPageTabs({user}: UserPageTabsProps) {
    const {userInfo} = useUserInfo()
    const [followed, setFollowed] = useState<boolean>(false)
    const {follow: mainFollowFunction} = useFollow()
    const [followers, setFollowers] = useState<FollowedUserDto[]>([])
    const [followings, setFollowings] = useState<FollowedUserDto[]>([])
    const [openedModalFollowings, setOpenedModalFollowings] = useState<boolean>(false);
    const [openedModalFollowers, setOpenedModalFollowers] = useState<boolean>(false);
    const onClickFollowers = () => {
        setOpenedModalFollowings(false);
        setOpenedModalFollowers(true);
    }
    const onClickFollowings = () => {
        setOpenedModalFollowings(true);
        setOpenedModalFollowers(false);
    }
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
        } else if (!!user) {
            setFollowings((user.followings || []).map((el) => {
                return {
                    avatar: changeUrlToServerRequest(el.avatar as string),
                    displayName: el.displayName,
                    username: el.username,
                    id: el.id,
                }
            }) as FollowedUserDto[])
            setFollowers((user.followers || []).map((el) => {
                return {
                    avatar: changeUrlToServerRequest(el.avatar as string),
                    displayName: el.displayName,
                    username: el.username,
                    id: el.id,
                }
            }) as FollowedUserDto[])
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userInfo, user])
    return (
        <div>
            <Group position={'center'} style={!!user ? {} : {display: 'none'}} mb={'sm'} mt={'lg'}>
                <Stack align={'center'} spacing={'sm'} sx={{maxWidth: 1000}} p={'lg'}>
                    <UserInfoWrapper
                        user={user}
                        onClickFollowers={onClickFollowers}
                        onClickFollowings={onClickFollowings}
                    />
                    {!!userInfo && <Group position={'center'} spacing={'sm'} mt={"sm"}>
                        <PrimaryOutlineBtn leftIcon={<IconForbid/>} text={'بلاک کاربر'} capsule={"true"}/>
                        {
                            !followed ?
                                <SecondaryBtn
                                    onClick={follow.bind({}, false) as any}
                                    leftIcon={<IconPlus/>}
                                    text={'دنبال کنید'} capsule={"true"}
                                /> :
                                <SecondaryOutlineBtn
                                    onClick={follow.bind({}, true) as any}
                                    leftIcon={<IconPlus/>}
                                    text={'دنبال شده'} capsule={"true"}
                                />
                        }
                    </Group>}
                </Stack>
            </Group>
            <Modal
                opened={openedModalFollowers}
                onClose={() => setOpenedModalFollowers(false)}
                title="لیست دنبال کنندگان"
                centered={true}
                size={'lg'}
                overflow={'outside'}
                styles={{body: {minHeight: 300}}}
            >
                <FollowedUser
                    isFollowersList={true}
                    data={followers}
                    disableMoreOptions={true}
                />
            </Modal>
            <Modal
                opened={openedModalFollowings}
                onClose={() => setOpenedModalFollowings(false)}
                title="لیست دنبال شوندگان"
                centered={true}
                size={'lg'}
                overflow={'outside'}
                styles={{body: {minHeight: 300}}}
            >
                <FollowedUser
                    isFollowersList={false}
                    data={followings}
                    disableMoreOptions={true}
                />
            </Modal>
        </div>
    )
}
