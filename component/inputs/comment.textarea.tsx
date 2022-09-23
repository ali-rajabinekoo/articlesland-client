import {ChangeEventHandler} from "react";
import {TextAreaInput} from "./index";
import {Stack, Group, Text, Avatar, Grid, useMantineTheme} from "@mantine/core";
import {UserDto} from "../../utils/types";
import {changeUrlToServerRequest} from "../../utils/helpers";
import {PrimaryBtn, PrimaryOutlineBtn} from "../buttons";

class CommentTextareaProps {
    user!: UserDto;
    loading?: boolean;
    onChange?: Function | undefined;
    handleOnModal?: Function | undefined;
    handleOnClose?: Function | undefined;
}

const CommentTextarea = ({user, onChange, handleOnModal, handleOnClose, loading = false}: CommentTextareaProps) => {
    const theme = useMantineTheme()
    return (<Stack spacing={'md'} pt={'sm'}>
        <Group>
            <Avatar src={changeUrlToServerRequest(user.avatar as string)} alt={user.username as string} radius="xl"/>
            <div>
                <Text size="sm">{user.displayName}</Text>
            </div>
        </Group>
        <TextAreaInput
            onChange={onChange as ChangeEventHandler}
            textcolor={theme.colors.grey[4]}
            placeholder={'نظر خود را بنویسید'}
        />
        <Grid gutter={'sm'} justify={'end'}>
            {!!handleOnClose && <Grid.Col xs={5} md={4}>
                <PrimaryOutlineBtn onClick={() => handleOnClose()} text={'لغو ارسال'} capsule={'true'}/>
            </Grid.Col>}
            <Grid.Col xs={5} md={4}>
                <PrimaryBtn
                    text={'ارسال نظر'}
                    capsule={'true'}
                    loading={loading}
                    onClick={() => {
                        if (!!handleOnModal) handleOnModal()
                    }}/>
            </Grid.Col>
        </Grid>
    </Stack>)
}

export default CommentTextarea