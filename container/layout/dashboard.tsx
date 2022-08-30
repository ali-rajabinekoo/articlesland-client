import React, {useState} from 'react';
import {
    Container,
    Avatar,
    UnstyledButton,
    Group,
    Text,
    Menu,
} from '@mantine/core';
import {useClickOutside} from '@mantine/hooks';
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
    const [userMenuOpened, setUserMenuOpened] = useState(false);
    const ref = useClickOutside(() => setUserMenuOpened(false));
    
    return (
        <div className={classes.header}>
            <Container className={classes.mainSection} size={'xl'} dir={'ltr'}>
                <Group position="apart" sx={{flexWrap: 'nowrap'}}>
                    <Group align={'center'} spacing={'xs'} sx={{flexWrap: 'nowrap'}}>
                        <Avatar src={'/assets/images/icon.png'} size={40} radius={50}/>
                        <Text className={classes.headerTitle}>
                            ArticlesLand
                        </Text>
                    </Group>

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
                                        <Text className={classes.userInfo} weight={500} size="sm" mr={3}>
                                            {user?.displayName || user?.username}
                                        </Text>
                                        <IconChevronDown className={classes.headerTitleIcon} size={12} stroke={1.5}/>
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