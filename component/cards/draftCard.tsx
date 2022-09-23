import {Card, Text, Box, Divider, UnstyledButton, Menu, Group, createStyles} from "@mantine/core";
import {IconDotsVertical, IconEye, IconFileUpload, IconTrash} from "@tabler/icons";
import {DraftResponseDto} from "../../utils/types";
import {MouseEventHandler} from "react";
import {formatFullDate} from "../../utils/helpers";

const useStyles = createStyles((theme) => ({
    card: {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
    },

    action: {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
        ...theme.fn.hover({
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1],
        }),
    },

    title: {
        width: "100%",
        overflow: 'hidden',
        textOverflow: "ellipsis",
        whiteSpace: 'nowrap',
        fontSize: theme.fontSizes.md,
        fontWeight: 600,
        color: theme.colors.grey[4]
    },

    body: {
        display: "-webkit-box",
        WebkitLineClamp: 3,
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden',
        lineHeight: '21.6px',
        color: theme.colors.grey[3],
        fontSize: theme.fontSizes.xs,
        marginTop: theme.spacing.xs,
    },

    bodyWrapper: {
        minHeight: '70px',
    }
}));

class DraftCardProps extends DraftResponseDto {
    showContent?: Function | undefined
    removeDraft?: Function | undefined
}

const DraftCard = (props: DraftCardProps) => {
    const {theme, classes} = useStyles()

    const setDraftBodyAsDefault = () => {
        if (!!props.body) window.editor.setData(props.body)
    }

    return (
        <Card shadow="sm" p={0} radius="md" withBorder={true}>
            <Box p="sm">
                <Text className={classes.title}>
                    {!!props.title && <>{props.title}</>}
                </Text>
                <Box className={classes.bodyWrapper}>
                    <Text className={classes.body}>
                        {!!props.description && <>{props.description}</>}
                    </Text>
                </Box>
            </Box>
            <Divider/>
            <Group p="xs" position={'apart'} align={'center'} noWrap={true}>
                <Box px={'xs'}>
                    <Text sx={{lineHeight: '21.6px'}} color={'grey.3'} size={'xs'} mt={'xs'}>
                        {!!props.createdAt && <>{formatFullDate(props.createdAt)}</>}
                        {/*09/04/2022 - 8:20*/}
                    </Text>
                </Box>
                <Menu shadow="md" width={200} position={'bottom-end'}>
                    <Menu.Target>
                        <UnstyledButton>
                            <IconDotsVertical/>
                        </UnstyledButton>
                    </Menu.Target>

                    <Menu.Dropdown>
                        <Menu.Item
                            onClick={setDraftBodyAsDefault}
                            icon={<IconFileUpload color={theme.colors.grey[4]} size={20}/>}
                        >
                            استفاده از متن
                        </Menu.Item>
                        <Menu.Item
                            onClick={props.showContent as MouseEventHandler}
                            icon={<IconEye size={20}/>}
                        >
                            نمایش متن
                        </Menu.Item>
                        <Menu.Item
                            onClick={props.removeDraft as MouseEventHandler}
                            icon={<IconTrash size={20}/>}
                        >
                            حذف متن
                        </Menu.Item>
                    </Menu.Dropdown>
                </Menu>
            </Group>
        </Card>
    )
}

export default DraftCard
