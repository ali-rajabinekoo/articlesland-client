import React, {ReactNode} from "react";
import {
    Paper,
    createStyles,
    TextInput,
    PasswordInput,
    Checkbox,
    Button,
    Title,
    Text,
    Anchor,
    Box
} from '@mantine/core';

interface Props {
    children?: ReactNode
}

const useStyles = createStyles((theme) => ({
    wrapper: {
        height: '100vh',
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

export function AuthLayout({children}: Props) {
    const {classes} = useStyles();
    return <Box dir={"ltr"}>
        <Box className={classes.wrapper}>
            <Paper className={classes.formPaper} p={30} dir={"rtl"}>
                <Title order={2} className={classes.title} align="center" mt="md" mb={50}>
                    {children}
                </Title>

                <TextInput label="Email address" placeholder="hello@gmail.com" size="md"/>
                <PasswordInput label="Password" placeholder="Your password" mt="md" size="md"/>
                <Checkbox label="Keep me logged in" mt="xl" size="md"/>
                <Button fullWidth mt="xl" size="md">
                    Login
                </Button>

                <Text align="center" mt="md">
                    Don&apos;t have an account?{' '}
                    <Anchor<'a'> href="#" weight={700} onClick={(event) => event.preventDefault()}>
                        Register
                    </Anchor>
                </Text>
            </Paper>
        </Box>
    </Box>
}