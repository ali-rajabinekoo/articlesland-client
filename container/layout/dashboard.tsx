import React from 'react';
import {Container} from '@mantine/core';
import {useDashboardLayoutStyles} from "./dashboard.styles";
import Navbar from "../../component/navbar";

interface DashboardHeaderProps {
    headerTabs?: React.ReactNode | JSX.Element | undefined
}

export function DashboardHeader({headerTabs}: DashboardHeaderProps) {
    const {classes, cx} = useDashboardLayoutStyles();

    return (
        <div className={cx(classes.header, {[classes.headerBorder]: !headerTabs})}>
            <Container className={classes.mainSection} size={'xl'} dir={'ltr'}>
                <Navbar/>
            </Container>
            {headerTabs}
        </div>
    );
}
