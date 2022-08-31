import {ScrollContainer} from "../../component/inputs";
import {Container, Group, Tabs, Text, Avatar, Stack} from "@mantine/core";
import React from "react";
import {useCategoriesList} from "./tabs.style";
import {UserDto} from "../../utils/types";
import {changeUrlToServerRequest} from "../../utils/helpers";
import {PrimaryBtn, SecondaryBtn} from "../../component/buttons";

interface ProfileProps {
    user: UserDto
}

export default function ProfileTab({user}: ProfileProps) {
    const {classes} = useCategoriesList();
    return (
        <div>
            <Group position={'center'} style={!!user ? {} : {display: 'none'}} mb={'sm'} mt={'lg'}>
                <Stack align={'center'} spacing={'sm'} sx={{maxWidth: 1000}} p={'lg'}>
                    <Avatar radius={50} size={75} src={changeUrlToServerRequest(user?.avatar as string)}/>
                    <Text size={'lg'} weight={700} className={classes.textEllipsis}>
                        {user?.displayName || user?.username}
                    </Text>
                    <Text size={'sm'} color={'grey.3'} weight={400}>{user?.bio}</Text>
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
                    <Group position={'center'} spacing={'sm'}>
                        <SecondaryBtn text={'تنظیمات حساب کاربری'} capsule={"true"}/>
                        <PrimaryBtn text={'نوشتن پست جدید'} capsule={"true"}/>
                    </Group>
                </Stack>
            </Group>
            <ScrollContainer scroll={'x'}>
                <Tabs className={classes.tabs} variant="outline" radius="xs" defaultValue="posts" sx={{width: "100%"}}>
                    <Tabs.List className={classes.tabsList} sx={{width: "100%"}}>
                        <Container size={'xl'}>
                            <Group position="left" spacing={0}>
                                <Tabs.Tab value={'posts'} className={classes.tab}>
                                    <Text size={'sm'} weight={400}>پست ها</Text>
                                </Tabs.Tab>
                                <Tabs.Tab value={'likes'} className={classes.tab}>
                                    <Text size={'sm'} weight={400}>لایک شده ها</Text>
                                </Tabs.Tab>
                                <Tabs.Tab value={'bookmarks'} className={classes.tab}>
                                    <Text size={'sm'} weight={400}>دخیره شده ها</Text>
                                </Tabs.Tab>
                            </Group>
                        </Container>
                    </Tabs.List>
                </Tabs>
            </ScrollContainer>
        </div>
    )
}
