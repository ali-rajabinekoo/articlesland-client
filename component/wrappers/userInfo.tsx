import React from "react";
import {Avatar, createStyles, Group, Stack, Text, UnstyledButton} from "@mantine/core";
import {changeUrlToServerRequest} from "../../utils/helpers";
import {IconUserCircle} from "@tabler/icons";
import {UserDto} from "../../utils/types";

const useStyles = createStyles(() => ({
    textEllipsis: {
        width: "100%",
        overflow: 'hidden',
        textOverflow: "ellipsis",
        textAlign: 'center',
        whiteSpace: 'nowrap',
    },
}));

class UserInfoWrapperProps {
    user!: UserDto;
    onClickFollowers?: undefined | Function;
    onClickFollowings?: undefined | Function;
}

export const UserInfoWrapper = ({
    user, onClickFollowers, onClickFollowings
}: UserInfoWrapperProps) => {
    const {classes, theme} = useStyles()
    return (
        <Stack sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}} spacing={'sm'}>
            {user?.avatar &&
                <Avatar radius={50} size={75} src={changeUrlToServerRequest(user?.avatar as string)}/>}
            {!user?.avatar && <IconUserCircle size={75} color={theme.colors.grey[4]}/>}
            <Text size={'lg'} color={'grey.4'} weight={700} className={classes.textEllipsis}>
                {user?.displayName || user?.username}
            </Text>
            {!!user?.bio && <Text size={'sm'} color={'grey.3'} weight={400}>{user?.bio}</Text>}
            <Group position={'center'} spacing={'sm'}>
                <UnstyledButton onClick={() => {
                    if (!!onClickFollowers) onClickFollowers()
                }}>
                    <Text size={'xs'} color={'grey.3'} weight={700}>
                        توسط
                        <span style={{padding: '0px 4px'}}>{user.followers?.length}</span>
                        نفر دنبال می شود
                    </Text>
                </UnstyledButton>
                <UnstyledButton onClick={() => {
                    if (!!onClickFollowings) onClickFollowings()
                }}>
                    <Text size={'xs'} color={'grey.3'} weight={700}>
                        <span style={{paddingLeft: 4}}>{user.followings?.length}</span>
                        نفر را دنبال می کند
                    </Text>
                </UnstyledButton>
            </Group>
        </Stack>
    )
}