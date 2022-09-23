import {Avatar, Card, Group, Stack, Text, UnstyledButton, Box, Menu, useMantineTheme, Divider} from "@mantine/core";
import {changeUrlToServerRequest, formatDateFromNow} from "../../utils/helpers";
import {CommentDto, UserDto} from "../../utils/types";
import {
    IconArrowBackUp,
    IconChevronDown,
    IconDots,
    IconMessageCircle2,
    IconMessageReport,
    IconTrash
} from "@tabler/icons";
import useUserInfo from "../../hooks/useUserInfo";
import {MouseEventHandler, useEffect, useState} from "react";
import NewComment from "../../container/post/newComment";
import {useAppSelector} from "../../hooks/redux";
import {RootState} from "../../utils/app.store";

class CommentCardProps {
    user!: UserDto;
    comment!: CommentDto;
    articleId!: number | string;
}

const CommentCardContent = ({
    user,
    articleId,
    comment: defaultComment,
}: CommentCardProps) => {
    const theme = useMantineTheme()
    const {userInfo} = useUserInfo()
    const [isReply, setIsReply] = useState<boolean>(false)
    const [showChildren, setShowChildren] = useState<boolean>(false)
    const [comment, setComment] = useState<CommentDto>(defaultComment)
    const comments: CommentDto[] | undefined = useAppSelector(
        (state: RootState) => state.comments.list
    )
    const onClick = () => {
        setShowChildren(!showChildren)
    }
    const onClickClose = () => {
        setIsReply(false);
    }
    useEffect(() => {
        const targetComment = comments?.find(el => el.id === comment.id)
        if (!!targetComment) setComment(targetComment)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [comments])
    return (
        <Card p={'xs'} withBorder={true}>
            <Stack spacing={'md'}>
                <Group>
                    <Avatar src={changeUrlToServerRequest(user.avatar as string)} alt={user.username as string}
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
                                    <Menu.Item icon={<IconTrash color={theme.colors.grey[4]} size={16}/>}>
                                        <Text color={'grey.4'} size={'xs'} weight={500}>حذف</Text>
                                    </Menu.Item> :
                                    <Menu.Item icon={<IconMessageReport color={theme.colors.grey[4]} size={16}/>}>
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
                                />
                            )
                        })}
                    </Stack>
                }
            </Stack>
        </Card>
    )
}

export default CommentCardContent
