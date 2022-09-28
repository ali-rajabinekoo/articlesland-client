import {Avatar, Table, Group, Text, ActionIcon, Menu, useMantineTheme, Center} from '@mantine/core';
import {IconDots, IconForbid, IconUserOff} from '@tabler/icons';
import {FollowedUserDto} from "../../utils/types";
import {EmptyContent} from "../../container/errors/empty";
import Link from "next/link";

interface UsersStackProps {
    data: FollowedUserDto[];
    isFollowersList?: boolean;
    onRemoveData?: Function | undefined;
    disableMoreOptions?: boolean;
}

export default function FollowedUser({
    data,
    onRemoveData,
    isFollowersList = false,
    disableMoreOptions = false
}: UsersStackProps) {
    const theme = useMantineTheme()
    const rows = data.map((item, index: number) => (
        <tr key={index}>
            <td>
                <Link href={`/user/${item.username}`}>
                    <Group spacing="sm" sx={{cursor: 'pointer'}}>
                        <Avatar size={40} src={item.avatar || undefined} radius={40}/>
                        <div>
                            <Text color="grey.4" size="sm" weight={500}>
                                {item.displayName}
                            </Text>
                            <Text color="grey.3" size="xs" mt={4} weight={500}>
                                {item.username}
                            </Text>
                        </div>
                    </Group>
                </Link>
            </td>
            <td>
                <Group
                    spacing={0} position="right" align={'center'}
                    sx={{display: disableMoreOptions ? 'none' : 'flex'}}
                >
                    <Menu transition="pop" withArrow position="bottom-end">
                        <Menu.Target>
                            <ActionIcon>
                                <IconDots size={16} stroke={1.5}/>
                            </ActionIcon>
                        </Menu.Target>
                        <Menu.Dropdown>
                            {!isFollowersList && <Menu.Item
                                icon={<IconUserOff color={theme.colors.grey[4]} size={18} stroke={1.5}/>}
                                onClick={onRemoveData ? onRemoveData.bind({}, item.id) : undefined}
                            >
                                <Text color="grey.4" size="sm">لغو دنبال کردن</Text>
                            </Menu.Item>}
                            <Menu.Item icon={<IconForbid color={theme.colors.grey[4]} size={18} stroke={1.5}/>}>
                                <Text color="grey.4" size="sm">بلاک کاربر</Text>
                            </Menu.Item>
                        </Menu.Dropdown>
                    </Menu>
                </Group>
            </td>
        </tr>
    ));

    return (
        <Table verticalSpacing="md">
            <tbody>{rows}</tbody>
            {rows.length === 0 && <Center>
                <EmptyContent disableBtn={true} picWidth={'300px'} title={
                    isFollowersList ?
                        'هیچ دنبال کننده ای وجود ندارد' :
                        'هیچ دنبال شونده ای وجود ندارد'
                }/>
            </Center>}
        </Table>
    );
}