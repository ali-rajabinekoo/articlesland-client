import React, {useState} from 'react';
import {
    Container,
    Avatar,
    UnstyledButton,
    Group,
    Text,
    Menu,
    Burger,
} from '@mantine/core';
import {useClickOutside, useDisclosure} from '@mantine/hooks';
import {IconChevronDown} from '@tabler/icons';
import {useDashboardLayoutStyles} from "./dashboard.styles";
import {HeaderDropdown} from "../../component/auxiliary/headerDropdown";
import {UserDto} from "../../utils/types";
import {changeUrlToServerRequest} from "../../utils/helpers";

interface DashboardHeaderProps {
    user: UserDto | undefined;
    headerTabs?: React.ReactNode | JSX.Element
}

export function DashboardHeader({user, headerTabs}: DashboardHeaderProps) {
    const {classes, cx} = useDashboardLayoutStyles();
    const [opened, {toggle}] = useDisclosure(false);
    const [userMenuOpened, setUserMenuOpened] = useState(false);
    const ref = useClickOutside(() => toggle);
    
    return (
        <div className={classes.header}>
            <Container className={classes.mainSection} size={'xl'} dir={'ltr'}>
                <Group position="apart">

                    <Group align={'center'}>
                        <Avatar src={'/assets/images/icon.png'} size={52}/>
                        <Text sx={{fontFamily: "Poppins"}} color={'secondary.3'} size={'xl'} weight={'600'}>
                            ArticlesLand
                        </Text>
                    </Group>

                    <Burger opened={opened} onClick={toggle} className={classes.burger} size="sm"/>

                    <div ref={ref}>
                        <Menu
                            width={260}
                            position="bottom-start"
                            transition="pop-top-right"
                            onClose={() => setUserMenuOpened(false)}
                            onOpen={() => setUserMenuOpened(true)}
                        >
                            <Menu.Target>
                                <UnstyledButton
                                    className={cx(classes.user, {[classes.userActive]: userMenuOpened})}
                                >
                                    <Group spacing={7} dir={'rtl'} align={'center'}>
                                        {
                                            user?.avatar ? 
                                            <Avatar src={changeUrlToServerRequest(user?.avatar as string)}
                                                 alt={user?.username || ''} radius="xl" size={40}/> :
                                            <></>
                                        }
                                        <Text weight={500} size="sm" sx={{lineHeight: 1}} mr={3}>
                                            {user?.displayName || user?.username}
                                        </Text>
                                        <IconChevronDown size={12} stroke={1.5}/>
                                    </Group>
                                </UnstyledButton>
                            </Menu.Target>
                            <HeaderDropdown/>
                        </Menu>
                    </div>
                </Group>
            </Container>
            {headerTabs}
        </div>
    );
}