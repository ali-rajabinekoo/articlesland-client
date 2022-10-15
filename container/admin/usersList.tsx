import {Avatar, Table, Group, Text, ActionIcon, Menu, ScrollArea, Badge, Modal} from '@mantine/core';
import {IconTrash, IconDots, IconForbid} from '@tabler/icons';
import {useState} from "react";
import {DangerBtn, PrimaryBtn, SecondaryOutlineBtn} from "../../component/buttons";

interface UsersStackProps {
    data: { avatar: string; name: string; job: string; email: string; rate: number }[];
}

export function UsersListAdminPage({data}: UsersStackProps) {
    const [userDeletionOpened, setUserDeletionOpened] = useState(false);
    const [userBlockingOpened, setUserBlockingOpened] = useState(false);
    
    const rows = data.map((item) => (
        <tr key={item.name}>
            <td>
                <Group spacing="sm">
                    <Avatar size={40} src={item.avatar} radius={40}/>
                    <div>
                        <Text size="sm" weight={500}>
                            {item.name}
                        </Text>
                        <Text color="dimmed" size="xs">
                            {item.job}
                        </Text>
                    </div>
                </Group>
            </td>
            <td>
                <Text size="sm" sx={{fontFamily: 'Poppins'}}>{item.email}</Text>
            </td>
            <td>
                <Group spacing={0} position="center">
                    {Math.random() > 0.5 ? (
                        <Badge sx={{width: 150, padding: '12px 0px'}}>
                            <Text size={'xs'} color={'black'}>
                                فعال
                            </Text>
                        </Badge>
                    ) : (
                        <Badge color="gray" sx={{width: 150, padding: '12px 0px'}}>
                            <Text size={'xs'} color={'black'}>
                                غیر فعال
                            </Text>
                        </Badge>
                    )}
                </Group>
            </td>
            <td>
                <Group spacing={0} position="right">
                    <Menu transition="pop" withArrow position="bottom-end">
                        <Menu.Target>
                            <ActionIcon>
                                <IconDots size={16} stroke={1.5}/>
                            </ActionIcon>
                        </Menu.Target>
                        <Menu.Dropdown>
                            <Menu.Item 
                                icon={<IconForbid size={16} stroke={1.5}/>} color="grey.4"
                                onClick={() => setUserBlockingOpened(true)}
                            >
                                مسدود کردن کاربر
                            </Menu.Item>
                            <Menu.Item
                                icon={<IconTrash size={16} stroke={1.5}/>} color="red"
                                onClick={() => setUserDeletionOpened(true)}
                            >
                                حذف کاربر
                            </Menu.Item>
                        </Menu.Dropdown>
                    </Menu>
                </Group>
            </td>
        </tr>
    ));

    return (
        <>
            <ScrollArea>
                <Table sx={{minWidth: 800}} verticalSpacing="md">
                    <thead>
                    <tr>
                        <th>
                            <Text size={'sm'} color={'grey,4'}>کاربرها</Text>
                        </th>
                        <th>
                            <Text size={'sm'} color={'grey,4'}>ایمیل</Text>
                        </th>
                        <th>
                            <Group spacing={0} position="center">
                                <Text size={'sm'} color={'grey,4'}>وضعیت</Text>
                            </Group>
                        </th>
                        <th>
                            <Group spacing={0} position="right">
                                <Text size={'sm'} color={'grey,4'}>گزینه ها</Text>
                            </Group>
                        </th>
                    </tr>
                    </thead>
                    <tbody>{rows}</tbody>
                </Table>
            </ScrollArea>
            <Modal
                opened={userDeletionOpened}
                onClose={() => setUserDeletionOpened(false)}
                title="حذف کاربر"
            >
                <Text sx={{lineHeight: '1.8rem'}} color={'grey.4'} size={'sm'}>
                    آیا مطمئن هستید که می خواهید کاربر مورد نظر را حذف کنید؟
                </Text>
                <Group mt={'sm'} spacing={'xs'} position={'apart'}>
                    <DangerBtn capsule={'true'} text={'حذف'}/>
                    <SecondaryOutlineBtn
                        capsule={'true'} text={'انصراف'}
                        onClick={() => setUserDeletionOpened(false)}
                    />
                </Group>
            </Modal>
            <Modal
                opened={userBlockingOpened}
                onClose={() => setUserBlockingOpened(false)}
                title="مسدود کردن کاربر"
            >
                <Text sx={{lineHeight: '1.8rem'}} color={'grey.4'} size={'sm'}>
                    آیا مطمئن هستید که می خواهید کاربر مورد نظر را مسدود کنید؟
                </Text>
                <Group mt={'sm'} spacing={'xs'} position={'apart'}>
                    <PrimaryBtn capsule={'true'} text={'مسدود کردن'}/>
                    <SecondaryOutlineBtn 
                        capsule={'true'} text={'انصراف'}
                        onClick={() => setUserBlockingOpened(false)}
                    />
                </Group>
            </Modal>
        </>
    );
}