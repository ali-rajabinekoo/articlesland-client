import React, {useEffect, useState} from "react";
import {Group, Modal, Stack} from "@mantine/core";
import {IconForbid, IconPlus} from "@tabler/icons";
import {PrimaryBtn, PrimaryOutlineBtn, SecondaryBtn, SecondaryOutlineBtn} from "../../component/buttons";
import {FollowedUserDto, UserDto} from "../../utils/types";
import {UserInfoWrapper} from "../../component/wrappers/userInfo";
import {changeUrlToServerRequest, errorHandler} from "../../utils/helpers";
import useUserInfo from "../../hooks/useUserInfo";
import useFollow from "../../hooks/useFollow";
import FollowedUser from "../../component/tables/followedUsers";
import useBlockingUser from "../../hooks/useBlockingUser";

interface UserPageTabsProps {
    user: UserDto
}

export default function UserPageTabs({user}: UserPageTabsProps) {
    const {userInfo} = useUserInfo()
    const [followed, setFollowed] = useState<boolean>(false)
    const [blocked, setBlocked] = useState<boolean>(false)
    const {follow: mainFollowFunction} = useFollow()
    const {block: mainBlockingFunction} = useBlockingUser()
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
            await mainFollowFunction(user.id, unfollow)
            setFollowed(!unfollow)
        } catch (e) {
            errorHandler(e)
        }
    }
    const block = async (unblock: boolean | undefined = false) => {
        try {
            await mainBlockingFunction(user.id, unblock)
            setBlocked(!unblock)
        } catch (e) {
            errorHandler(e)
        }
    }
    useEffect(() => {
        if (!!userInfo && !!user) {
            const targetFollower: UserDto | undefined = userInfo.followings?.find((el) => el.id === user.id)
            if (!!targetFollower) setFollowed(true)
            else setFollowed(false)
            const targetBlockedUser: UserDto | undefined = userInfo.blockedUsers?.find((el) => el.id === user.id)
            if (!!targetBlockedUser) setBlocked(true)
            else setBlocked(false)
        }
        if (!!user) {
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
                        {
                            !blocked ?
                                <PrimaryOutlineBtn
                                    onClick={block.bind({}, false) as any}
                                    leftIcon={<IconForbid/>}
                                    text={'مسدود کردن'}
                                    capsule={"true"}
                                /> :
                                <PrimaryBtn
                                    onClick={block.bind({}, true) as any}
                                    leftIcon={<IconForbid/>}
                                    text={'مسدود'}
                                    capsule={"true"}
                                />
                        }
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
