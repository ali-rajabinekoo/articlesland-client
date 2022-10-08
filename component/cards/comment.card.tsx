import {Avatar, Card, Group, Stack, Text, UnstyledButton, Box, Menu, useMantineTheme, Divider} from "@mantine/core";
import {changeUrlToServerRequest, errorHandler, formatDateFromNow} from "../../utils/helpers";
import {APIS, CommentDto, UserDto, UseRequestResult, UseUserInfoResult} from "../../utils/types";
import {
    IconAlertCircle,
    IconArrowBackUp, IconCheck,
    IconChevronDown,
    IconDots,
    IconMessageCircle2,
    IconMessageReport,
    IconTrash
} from "@tabler/icons";
import useUserInfo from "../../hooks/useUserInfo";
import React, {MouseEventHandler, useEffect, useState} from "react";
import NewComment from "../../container/post/newComment";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {AppDispatch, RootState} from "../../utils/app.store";
import useRequest from "../../hooks/useRequest";
import {showNotification} from "@mantine/notifications";
import {AxiosResponse} from "axios";
import {appMessages} from "../../utils/messages";
import {initComments} from "../../reducers/comments";
import ReportBadContentModal from "../wrappers/reportBadContentModal";

class CommentCardProps {
    user!: UserDto;
    comment!: CommentDto;
    articleId!: number | string;
    isChild?: boolean | undefined;
}

const CommentCardContent = ({
    user,
    articleId,
    comment: defaultComment,
    isChild = false,
}: CommentCardProps) => {
    const theme = useMantineTheme()
    const {userInfo}: UseUserInfoResult = useUserInfo()
    const {getApis}: UseRequestResult = useRequest()
    const [isReply, setIsReply] = useState<boolean>(false)
    const [opened, setOpened] = useState(false);
    const [showChildren, setShowChildren] = useState<boolean>(false)
    const [comment, setComment] = useState<CommentDto>(defaultComment)
    const comments: CommentDto[] | undefined = useAppSelector(
        (state: RootState) => state.comments.list
    )
    const dispatch: AppDispatch = useAppDispatch()
    const onClick = () => {
        setShowChildren(!showChildren)
    }
    const onClickClose = () => {
        setIsReply(false);
    }
    const onRemove = async () => {
        const apis: APIS = getApis()
        try {
            const response: AxiosResponse | undefined =
                await apis.comment.removeComment(Number(articleId), Number(comment.id))
            if (!response) return showNotification({
                message: appMessages.somethingWentWrong,
                title: 'خطا',
                autoClose: 3000,
                color: 'red',
                icon: <IconAlertCircle size={20}/>
            })
            const data: CommentDto[] = response.data as CommentDto[]
            dispatch(initComments(data))
            showNotification({
                message: 'نظر شما با موفقیت حذف شد',
                autoClose: 3000,
                color: 'green',
                icon: <IconCheck size={20}/>
            })
        } catch (e) {
            errorHandler(e)
        }
    }
    useEffect(() => {
        const targetComment = comments?.find(el => el.id === comment.id)
        if (!!targetComment) setComment(targetComment)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [comments])
    useEffect(() => {
        const children = comments?.filter(el => el?.parent?.id === defaultComment?.id)
        if (!!defaultComment) setComment({
            ...defaultComment,
            children,
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [defaultComment])
    return (
        <>
            <Card p={isChild ? 'xs' : 0} withBorder={!!isChild}>
                <Stack spacing={'md'}>
                    <Group>
                        <Avatar src={!user?.avatar ? undefined : changeUrlToServerRequest(user.avatar as string)} alt={user.username as string}
                                radius="xl"/>
                        <div>
                            <Text size="sm">{user.displayName}</Text>
                            {!!comment?.created_at && (<Text size="xs" color="grey.3">
                                {formatDateFromNow(comment.created_at)}
                            </Text>)}
                        </div>
                    </Group>
                    {!!comment?.body && (<Text size="sm" sx={{lineHeight: '28.8px'}}>
                        {comment.body}
                    </Text>)}
                    <Group position={'apart'}>
                        <div>
                            {Number(comment.childNumber) > 0 && (
                                <UnstyledButton
                                    onClick={onClick.bind(
                                        {},
                                        comment.children as CommentDto[]
                                    ) as MouseEventHandler}
                                >
                                    <Group>
                                        <IconChevronDown color={theme.colors.grey[4]} size={18}/>

                                        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                            <IconMessageCircle2 color={theme.colors.grey[4]} size={18}/>
                                            <Text
                                                sx={{fontFamily: "Poppins"}} ml={'xs'}
                                                size={'xs'} weight={500} color={'grey.4'}
                                            >
                                                {comment.childNumber}
                                            </Text>
                                        </div>
                                    </Group>
                                </UnstyledButton>
                            )}
                        </div>

                        <Menu shadow="md" width={200}>
                            <Menu.Target>
                                <UnstyledButton>
                                    <IconDots color={theme.colors.grey[4]} size={18}/>
                                </UnstyledButton>
                            </Menu.Target>

                            <Menu.Dropdown>
                                <Menu.Item
                                    onClick={setIsReply.bind({}, true)}
                                    icon={<IconArrowBackUp color={theme.colors.grey[4]} size={16}/>}
                                >
                                    <Text color={'grey.4'} size={'xs'} weight={500}>پاسخ</Text>
                                </Menu.Item>
                                {
                                    userInfo?.id === user.id ?
                                        <Menu.Item onClick={onRemove}
                                                   icon={<IconTrash color={theme.colors.grey[4]} size={16}/>}>
                                            <Text color={'grey.4'} size={'xs'} weight={500}>حذف</Text>
                                        </Menu.Item> :
                                        <Menu.Item
                                            onClick={() => setOpened(true)}
                                            icon={<IconMessageReport color={theme.colors.grey[4]} size={16}/>}
                                        >
                                            <Text color={'grey.4'} size={'xs'} weight={500}>گزارش تخلف</Text>
                                        </Menu.Item>
                                }
                            </Menu.Dropdown>
                        </Menu>
                    </Group>
                    {isReply &&
                        <Box>
                            <Divider/>
                            <NewComment
                                handleOnClose={onClickClose}
                                user={userInfo as UserDto}
                                articleId={Number(articleId)}
                                parentId={comment.id as number}
                            />
                        </Box>
                    }
                    {showChildren &&
                        <Stack spacing={'sm'} mt={'sm'}>
                            {(comment.children || []).map((comment: CommentDto, index: number) => {
                                return (
                                    <CommentCardContent
                                        key={index} comment={comment}
                                        user={comment.owner as UserDto}
                                        articleId={articleId}
                                        isChild={true}
                                    />
                                )
                            })}
                        </Stack>
                    }
                </Stack>
            </Card>
            <ReportBadContentModal 
                setOpened={setOpened} 
                opened={opened}
                commentId={comment.id}
            />
        </>
    )
}

export default CommentCardContent
