import {Container, Box, Accordion, Paper, Text, Stack, Card} from "@mantine/core";
import {useCommentStyles} from "./comments.styles";
import {CommentDto, UserDto} from "../../utils/types";
import {useEffect, useState} from "react";
import useUserInfo from "../../hooks/useUserInfo";
import NewComment from "./newComment";
import CommentCardContent from "../../component/cards/comment.card";
import {RootState} from "../../utils/app.store";
import {useAppSelector} from "../../hooks/redux";

class PostCommentsProps {
    articleId?: number | undefined;
}

const PostComments = ({articleId}: PostCommentsProps): JSX.Element => {
    const {classes} = useCommentStyles()
    const {userInfo} = useUserInfo()
    const [isOpen, setIsOpen] = useState<string | null>()
    const [comments, setComments] = useState<CommentDto[]>([]);
    const defaultComments: CommentDto[] = useAppSelector(
        (state: RootState) => state.comments.list as CommentDto[]
    )
    const onChangeAccordion = (e: string) => {
        setIsOpen(e)
    }
    useEffect(() => {
        if (!!defaultComments) {
            setComments(defaultComments?.filter((el) => !Boolean(el?.parent)) as CommentDto[])
        }
    }, [defaultComments])
    return (
        <Box 
            className={comments?.length !== 0 ? classes.wrapper : undefined} 
            pb={comments?.length !== 0 ? "xl" : 0} pt={'md'}
        >
            <Container size={'sm'} pb={"xl"}>
                <Paper withBorder={true} sx={{display: !!userInfo ? 'block' : 'none'}}>
                    <Accordion onChange={onChangeAccordion} classNames={{item: classes.commentWrapper}}
                               defaultValue={isOpen}>
                        <Accordion.Item value="commenting">
                            <Accordion.Control>
                                <Text color={'grey.4'}>
                                    نظر خود را درباره این پست بنویسید
                                </Text>
                            </Accordion.Control>
                            <Accordion.Panel>
                                {!!userInfo && !!articleId && <NewComment
                                    articleId={articleId}
                                    user={userInfo}
                                />}
                            </Accordion.Panel>
                        </Accordion.Item>
                    </Accordion>
                </Paper>
                <Stack spacing={'md'} mt={'sm'}>
                    {[...comments].map((comment: CommentDto, index: number) => {
                        return (
                            <Card key={index} shadow="sm" p="sm" radius="md" withBorder>
                                <CommentCardContent
                                    comment={comment}
                                    user={comment.owner as UserDto}
                                    articleId={articleId as number}
                                />
                            </Card>
                        )
                    })}
                </Stack>
            </Container>
        </Box>
    )
}

export default PostComments