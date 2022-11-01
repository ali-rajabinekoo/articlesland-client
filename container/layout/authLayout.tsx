import React, {ReactNode} from "react";
import {
    Paper,
    createStyles,
    Title,
    Text,
    Box,
    Grid
} from '@mantine/core';

const useStyles = createStyles((theme) => ({
    wrapper: {
        height: '100vh',
        overflow: "hidden",
        backgroundSize: 'cover',
        backgroundPosition: "bottom",
        backgroundImage:
            'url(/assets/images/mountains.svg)',
    },

    formPaper: {
        borderRight: `1px solid ${
            theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[3]
        }`,
        height: '100vh',
        maxWidth: 450,
        paddingTop: 80,
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
        borderTopLeftRadius: 8,
        borderBottomLeftRadius: 8,

        [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
            maxWidth: '100%',
            borderTopLeftRadius: 0,
            borderBottomLeftRadius: 0,
        },
    },

    title: {
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,
        fontFamily: theme.fontFamily,
    },

    logo: {
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,
        width: 120,
        display: 'block',
        marginLeft: 'auto',
        marginRight: 'auto',
    },
}));

interface AuthLayoutProps {
    title?: ReactNode
    children?: ReactNode
}

export function AuthLayout({children, title}: AuthLayoutProps) {
    const {classes} = useStyles();
    return <Box dir={"ltr"}>
        <Box className={classes.wrapper}>
            <Grid>
                <Grid.Col lg={5.8} xl={3.8}>
                    <Paper className={classes.formPaper} p={30} dir={"rtl"} sx={{overflowY: 'auto', overflowX: "hidden"}}>
                        <Title order={2} className={classes.title} align="center" mt="md" mb={50}>
                            {title}
                        </Title>
                        {children}
                    </Paper>
                </Grid.Col>
                <Grid.Col lg={7.2} xl={8.2}>
                    <Box sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "100vh",
                        paddingBottom: 420,
                        marginRight: -100
                    }}>
                        <Text color={"secondary.3"} sx={{
                            fontFamily: "Poppins", fontWeight: 600, fontSize: 96, lineHeight: "130%", letterSpacing: 5
                        }}>ArticleLand</Text>
                    </Box>
                </Grid.Col>
            </Grid>
        </Box>
    </Box>
}