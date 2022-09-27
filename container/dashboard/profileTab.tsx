import {ScrollContainer} from "../../component/inputs";
import {Container, Group, Tabs, Text, Modal, Stack} from "@mantine/core";
import React, {useEffect, useState} from "react";
import {useCategoriesList} from "./tabs.style";
import {
    APIS,
    FollowBody,
    FollowedUserDto,
    LinkedItemDto,
    UserDto,
    UseRequestResult,
    UseUserInfoResult
} from "../../utils/types";
import {changeUrlToServerRequest, defaultProfileCategoryItem, errorHandler} from "../../utils/helpers";
import {PrimaryBtn, PrimaryOutlineBtn} from "../../component/buttons";
import Link from "next/link";
import {NextRouter, useRouter} from "next/router";
import {UserInfoWrapper} from "../../component/wrappers/userInfo";
import FollowedUser from "../../component/tables/followedUsers";
import useRequest from "../../hooks/useRequest";
import {AxiosResponse} from "axios";
import {showNotification} from "@mantine/notifications";
import {appMessages} from "../../utils/messages";
import {IconAlertCircle, IconCheck} from "@tabler/icons";
import useUserInfo from "../../hooks/useUserInfo";

interface ProfileProps {
    user: UserDto
}

export default function ProfileTab({user}: ProfileProps) {
    const {classes} = useCategoriesList();
    const {query}: NextRouter = useRouter();
    const {getApis}: UseRequestResult = useRequest()
    const {setNewUser}: UseUserInfoResult = useUserInfo()
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
    const handleUnfollowing = async (id: number) => {
        const apis: APIS = getApis()
        try {
            const body: FollowBody = new FollowBody()
            body.newFollowingUserId = id
            const response: AxiosResponse | undefined =
                await apis.user.unfollow(body);
            if (!response) return showNotification({
                message: appMessages.somethingWentWrong,
                title: 'خطا',
                autoClose: 3000,
                color: 'red',
                icon: <IconAlertCircle size={20}/>
            })
            const user: UserDto = response.data as UserDto
            setNewUser(user)
            setFollowings(followings.filter(el => el.id !== id))
            showNotification({
                message: appMessages.unfollowed,
                autoClose: 2000,
                color: 'green',
                icon: <IconCheck size={20}/>
            })
        } catch (e) {
            errorHandler(e)
        }
    }
    const fetchFollowersAndFollowings = async () => {
        const apis: APIS = getApis()
        try {
            const response: AxiosResponse | undefined =
                await apis.user.userInfo();
            if (!response) return showNotification({
                message: appMessages.somethingWentWrong,
                title: 'خطا',
                autoClose: 3000,
                color: 'red',
                icon: <IconAlertCircle size={20}/>
            })
            const user: UserDto = response.data as UserDto
            const tempFollowers = [...(user.followers as UserDto[] || [])]
            const tempFollowings = [...(user.followings as UserDto[] || [])]
            setFollowers(tempFollowers.map(el => ({
                avatar: changeUrlToServerRequest(el.avatar as string),
                displayName: el.displayName,
                username: el.username,
                id: el.id,
            })) as FollowedUserDto[])
            setFollowings(tempFollowings.map(el => ({
                avatar: changeUrlToServerRequest(el.avatar as string),
                displayName: el.displayName,
                username: el.username,
                id: el.id,
            })) as FollowedUserDto[])
            console.log(user)
        } catch (e) {
            errorHandler(e)
        }
    }
    useEffect(() => {
        fetchFollowersAndFollowings().catch()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <div>
            <Group position={'center'} style={!!user ? {} : {display: 'none'}} mb={'sm'} mt={'lg'}>
                <Stack align={'center'} spacing={'sm'} sx={{maxWidth: 1000}} p={'lg'}>
                    <UserInfoWrapper
                        user={user}
                        onClickFollowers={onClickFollowers}
                        onClickFollowings={onClickFollowings}
                    />
                    <Group position={'center'} spacing={'sm'} mt={"sm"}>
                        <Link href={'/profile'}>
                            <PrimaryOutlineBtn text={'تنظیمات حساب کاربری'} capsule={"true"}/>
                        </Link>
                        <Link href={'/edit'}>
                            <PrimaryBtn text={'نوشتن پست جدید'} capsule={"true"}/>
                        </Link>
                    </Group>
                </Stack>
            </Group>
            <ScrollContainer scroll={'x'}>
                <Tabs
                    className={classes.tabs} variant="outline" radius="xs"
                    value={query?.tab as string || 'posts'} sx={{width: "100%"}}
                >
                    <Tabs.List className={classes.tabsList} sx={{width: "100%"}}>
                        <Container size={'xl'}>
                            <Group position="center" spacing={0}>
                                {defaultProfileCategoryItem.map((el: LinkedItemDto, index: number) => {
                                    return (
                                        <Link href={el.href} key={index}>
                                            <Tabs.Tab value={el.value as string} className={classes.tab}>
                                                <Text size={'sm'} weight={400}>{el.label}</Text>
                                            </Tabs.Tab>
                                        </Link>
                                    )
                                })}
                            </Group>
                        </Container>
                    </Tabs.List>
                </Tabs>
            </ScrollContainer>
            <Modal
                opened={openedModalFollowers}
                onClose={() => setOpenedModalFollowers(false)}
                title="لیست دنبال کنندگان"
                centered={true}
                size={'lg'}
                overflow={'inside'}
            >
                <FollowedUser
                    isFollowersList={true}
                    data={followers}
                    onRemoveData={handleUnfollowing}
                />
            </Modal>
            <Modal
                opened={openedModalFollowings}
                onClose={() => setOpenedModalFollowings(false)}
                title="لیست دنبال شوندگان"
                centered={true}
                size={'lg'}
                overflow={'inside'}
            >
                <FollowedUser
                    isFollowersList={false}
                    data={followings}
                    onRemoveData={handleUnfollowing}
                />
            </Modal>
        </div>
    )
}
