import {Table, ScrollArea, Group, Avatar, Text, createStyles} from '@mantine/core';
import {changeUrlToServerRequest, convertNotificationTypeToMessage, notificationValidTypes} from "../../utils/helpers";
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
                            src={!item?.user?.avatar ? undefined : changeUrlToServerRequest(item.user?.avatar as string)}
                        />
                        <Text size="sm" weight={500}>
                            <Text color={'grey.4'} className={classes.title}>
                                {convertNotificationTypeToMessage(
                                    item.type as notificationValidTypes,
                                    (item.user?.displayName || item.user?.username) as string
                                )}
                                {!!(item?.message) && (
                                    <Text ml={'xs'} component={'span'} color={'grey.4'} size={'xs'} weight={500}>
                                        {item.message}
                                    </Text>
                                )}
                            </Text>
                        </Text>
                    </Group>
                </td>
                <td className={classes.createdAt}>
                    <Text color={'grey.4'} size={'xs'} weight={500}>{item.created_at}</Text>
                </td>
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
