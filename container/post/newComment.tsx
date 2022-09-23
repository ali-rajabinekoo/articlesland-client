import CommentTextarea from "../../component/inputs/comment.textarea";
import {APIS, CommentDto, NewCommentBody, UserDto, UseRequestResult} from "../../utils/types";
import React, {useState} from "react";
import useRequest from "../../hooks/useRequest";
import {Grid, Modal, Text} from "@mantine/core";
import {PrimaryBtn, PrimaryOutlineBtn} from "../../component/buttons";
import {errorHandler} from "../../utils/helpers";
import {AxiosResponse} from "axios";
import {showNotification} from "@mantine/notifications";
import {validationMessages} from "../../utils/messages";
import {IconAlertCircle, IconCheck} from "@tabler/icons";
import {AppDispatch} from "../../utils/app.store";
import {useAppDispatch} from "../../hooks/redux";
import {addNewComment} from "../../reducers/comments";

class NewCommentProps {
    user!: UserDto;
    articleId!: number;
    parentId?: number | undefined;
    handleOnClose?: Function | undefined;
}

const NewComment = ({
    user,
    articleId,
    parentId,
    handleOnClose,
}: NewCommentProps): JSX.Element => {
    const [commentBody, setCommentBody] = useState<string>('')
    const [opened, setOpened] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const {getApis}: UseRequestResult = useRequest()
    const dispatch: AppDispatch = useAppDispatch()
    const onOpenModal = () => {
        if (!commentBody?.trim()) {
            return showNotification({
                message: validationMessages.empty.commentBody,
                title: 'خطا',
                autoClose: 3000,
                color: 'red',
                icon: <IconAlertCircle size={20}/>
            })
        }
        if (commentBody.trim().length < 10) {
            return showNotification({
                message: validationMessages.length.commentBodyShort,
                title: 'خطا',
                autoClose: 3000,
                color: 'red',
                icon: <IconAlertCircle size={20}/>
            })
        }
        if (commentBody.trim().length > 500) {
            return showNotification({
                message: validationMessages.length.commentBodyLong,
                title: 'خطا',
                autoClose: 3000,
                color: 'red',
                icon: <IconAlertCircle size={20}/>
            })
        }
        setOpened(true)
    }
    const onChange = (e: any) => {
        setCommentBody(e.target.value as string);
    }
    const onSubmit = async () => {
        setOpened(false)
        setLoading(true)
        const apis: APIS = getApis()
        try {
            const body: NewCommentBody = {
                body: commentBody.trim(),
            } as NewCommentBody
            if (!!parentId) body.parentId = parentId;
            const response: AxiosResponse | undefined =
                await apis.comment.addNewComment(articleId, body);
            const data: CommentDto = response?.data
            dispatch(addNewComment(data as CommentDto))
            showNotification({
                message: 'نظر شما با موفقیت ثبت شد',
                autoClose: 3000,
                color: 'green',
                icon: <IconCheck size={20}/>
            })
            setLoading(false)
        } catch (e) {
            errorHandler(e)
            setLoading(false)
        }
    }
    return (<>
            <CommentTextarea
                user={user}
                onChange={onChange}
                handleOnModal={onOpenModal}
                loading={loading}
                handleOnClose={handleOnClose}
            />
            <Modal
                opened={opened}
                onClose={() => setOpened(false)}
                title={<Text color={'grey.4'} size={'sm'}>ارسال نظر</Text>}
                centered={true}
            >
                <Text color={'grey.4'} size={'md'}>آیا از ارسال نظر خود مطمئن هستید؟</Text>
                <Grid mt={'sm'}>
                    <Grid.Col xs={6}>
                        <PrimaryBtn text={'بله'} onClick={onSubmit}/>
                    </Grid.Col>
                    <Grid.Col xs={6}>
                        <PrimaryOutlineBtn text={'خیر'} onClick={setOpened.bind({}, false)}/>
                    </Grid.Col>
                </Grid>
            </Modal>
        </>
    )
}

export default NewComment