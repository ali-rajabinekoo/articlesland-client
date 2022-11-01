import {Table, ScrollArea, Group, Avatar, Text, createStyles} from '@mantine/core';
import {
    changeUrlToServerRequest,
    convertNotificationTypeToMessage,
    formatDateFromNow,
    notificationValidTypes
} from "../../utils/helpers";
import {NotificationDto} from "../../utils/types";

const useStyles = createStyles((theme) => ({
    createdAt: {
        [theme.fn.largerThan('sm')]: {
            minWidth: 100
        },
    },
    title: {
        [theme.fn.largerThan('sm')]: {
            fontSize: theme.fontSizes.sm
        },
        [theme.fn.smallerThan('sm')]: {
            fontSize: theme.fontSizes.xs
        },
    }
}))

interface NavbarNotificationTableProps {
    data: NotificationDto[];
}

export default function NavbarNotificationTable({data = []}: NavbarNotificationTableProps) {
    const {classes} = useStyles()
    const rows = data.map((item, index: number) => {
        return (
            <tr key={index}>
                <td>
                    <Group spacing="sm" noWrap={true}>
                        <Avatar
                            size={26} radius={26}
                            src={!item?.creator?.avatar ? undefined : changeUrlToServerRequest(item.creator?.avatar as string)}
                        />
                        <Text size="sm" weight={500}>
                            <Text color={'grey.4'} className={classes.title}>
                                {convertNotificationTypeToMessage(
                                    item.type as notificationValidTypes,
                                    (item.creator?.displayName || item.creator?.username) as string
                                )}
                                {(!!(item?.content) || !!(item?.article)) && (
                                    <Text ml={'xs'} component={'span'} color={'grey.4'} size={'xs'} weight={500}>
                                        {item.content || item.article?.title}
                                    </Text>
                                )}
                            </Text>
                        </Text>
                    </Group>
                </td>
                {
                    Boolean(item.created_at) &&
                    <td className={classes.createdAt}>
                        <Text color={'grey.4'} size={'xs'}
                              weight={500}>{formatDateFromNow(item.created_at as string)}</Text>
                    </td>
                }
            </tr>
        );
    });

    return (
        <ScrollArea>
            <Table sx={{minWidth: '100%'}} verticalSpacing="sm">
                <tbody>{rows}</tbody>
            </Table>
        </ScrollArea>
    );
}
