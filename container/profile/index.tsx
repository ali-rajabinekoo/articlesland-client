import React from "react";
import {Container, Text, Accordion} from "@mantine/core";
import ProfileInformation from "./information";
import {useProfileStyles} from "./index.styles";
import ProfileAvatar from "./avatar";
import ProfileMobile from "./mobile";
import ProfileEmail from "./email";

const ProfileContainer = () => {
    const {classes} = useProfileStyles()
    return (
        <Container size={'md'}>
            <Text color={'grey.4'} size={'lg'} weight={700}>
                تنظیمات حساب کاربری
            </Text>
            <Text mt={'xs'} color={'grey.4'}>
                شما می توانید از این طریق، اطلاعات خود را تایید و یا تغییر دهید.
            </Text>
            <Accordion chevronPosition="right" variant="contained" mt={'md'}>
                <Accordion.Item value="avatar">
                    <Accordion.Control>
                        <Text color={'grey.4'} weight={500}>عکس پروفایل</Text>
                    </Accordion.Control>
                    <Accordion.Panel>
                        <ProfileAvatar/>
                    </Accordion.Panel>
                </Accordion.Item>

                <Accordion.Item value="information">
                    <Accordion.Control>
                        <Text color={'grey.4'} weight={500}>اطلاعات شخصی</Text>
                    </Accordion.Control>
                    <Accordion.Panel pt={'sm'}  pb={'md'}>
                        <div className={classes.container}>
                            <ProfileInformation/>
                        </div>
                    </Accordion.Panel>
                </Accordion.Item>

                <Accordion.Item value="mobileNumber">
                    <Accordion.Control>
                        <Text color={'grey.4'} weight={500}>شماره موبایل</Text>
                    </Accordion.Control>
                    <Accordion.Panel>
                        <div className={classes.container}>
                            <ProfileMobile/>
                        </div>
                    </Accordion.Panel>
                </Accordion.Item>

                <Accordion.Item value="emailAddress">
                    <Accordion.Control>
                        <Text color={'grey.4'} weight={500}>ایمیل</Text>
                    </Accordion.Control>
                    <Accordion.Panel>
                        <div className={classes.container}>
                            <ProfileEmail/>
                        </div>
                    </Accordion.Panel>
                </Accordion.Item>
            </Accordion>
        </Container>
    )
}

export default ProfileContainer
