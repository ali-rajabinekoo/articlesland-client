import {ScrollContainer} from "../../component/inputs";
import {Container, Group, Tabs, Text, Avatar, Stack} from "@mantine/core";
import React from "react";
import {useCategoriesList} from "./tabs.style";
import {LinkedItemDto, UserDto} from "../../utils/types";
import {changeUrlToServerRequest, defaultProfileCategoryItem} from "../../utils/helpers";
import {PrimaryBtn, PrimaryOutlineBtn} from "../../component/buttons";
import Link from "next/link";
import {IconUserCircle} from "@tabler/icons";

interface ProfileProps {
    user: UserDto
}

export default function ProfileTab({user}: ProfileProps) {
    const {classes, theme} = useCategoriesList();
    return (
        <div>
            <Group position={'center'} style={!!user ? {} : {display: 'none'}} mb={'sm'} mt={'lg'}>
                <Stack align={'center'} spacing={'sm'} sx={{maxWidth: 1000}} p={'lg'}>
                    {user?.avatar &&
                        <Avatar radius={50} size={75} src={changeUrlToServerRequest(user?.avatar as string)}/>}
                    {!user?.avatar && <IconUserCircle size={75} color={theme.colors.grey[4]}/>}
                    <Text size={'lg'} color={'grey.4'} weight={700} className={classes.textEllipsis}>
                        {user?.displayName || user?.username}
                    </Text>
                    {!!user?.bio && <Text size={'sm'} color={'grey.3'} weight={400}>{user?.bio}</Text>}
                    <Group position={'center'} spacing={'sm'}>
                        <Text size={'xs'} color={'grey.3'} weight={700}>
                            توسط
                            26
                            نفر دنبال می شود
                        </Text>
                        <Text size={'xs'} color={'grey.3'} weight={700}>
                            26
                            نفر را دنبال می کند
                        </Text>
                    </Group>
                    <Group position={'center'} spacing={'sm'} mt={"sm"}>
                        <Link href={'/profile'}>
                            <PrimaryOutlineBtn text={'تنظیمات حساب کاربری'} capsule={"true"}/>
                        </Link>
                        <Link href={'/edit'}>
                            <PrimaryBtn text={'نوشتن پست جدید'} capsule={"true"}/>
                        </Link>
                    </Group>
                </Stack>
            </Group>
            <ScrollContainer scroll={'x'}>
                <Tabs className={classes.tabs} variant="outline" radius="xs" defaultValue="posts" sx={{width: "100%"}}>
                    <Tabs.List className={classes.tabsList} sx={{width: "100%"}}>
                        <Container size={'xl'}>
                            <Group position="center" spacing={0}>
                                {defaultProfileCategoryItem.map((el: LinkedItemDto, index: number) => {
                                    return (
                                        <Link href={el.href} key={index}>
                                            <Tabs.Tab value={el.value as string} className={classes.tab}>
                                                <Text size={'sm'} weight={400}>{el.label}</Text>
                                            </Tabs.Tab>
                                        </Link>
                                    )
                                })}
                            </Group>
                        </Container>
                    </Tabs.List>
                </Tabs>
            </ScrollContainer>
        </div>
    )
}
