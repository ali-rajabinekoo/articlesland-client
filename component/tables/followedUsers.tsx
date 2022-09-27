import {Avatar, Table, Group, Text, ActionIcon, Menu, useMantineTheme} from '@mantine/core';
import {IconDots, IconForbid, IconUserOff} from '@tabler/icons';
import {FollowedUserDto} from "../../utils/types";

interface UsersStackProps {
    data: FollowedUserDto[];
    isFollowersList?: boolean;
    onRemoveData?: Function | undefined;
}

export default function FollowedUser({data, onRemoveData, isFollowersList = false}: UsersStackProps) {
    const theme = useMantineTheme()
    const rows = data.map((item, index: number) => (
        <tr key={index}>
            <td>
                <Group spacing="sm">
                    <Avatar size={40} src={item.avatar} radius={40}/>
                    <div>
                        <Text color="grey.4" size="sm" weight={500}>
                            {item.displayName}
                        </Text>
                        <Text color="grey.3" size="xs" mt={4} weight={500}>
                            {item.username}
                        </Text>
                    </div>
                </Group>
            </td>
            <td>
                <Group spacing={0} position="right" align={'center'}>
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
        </Table>
    );
}