import {createStyles} from "@mantine/core";

export const useDashboardLayoutStyles = createStyles((theme) => ({
    header: {
        paddingTop: theme.spacing.sm,
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.grey[0],
        marginBottom: 120,
    },

    mainSection: {
        paddingBottom: theme.spacing.sm,
    },

    user: {
        color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
        padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
        borderRadius: theme.radius.sm,
        transition: 'background-color 100ms ease',

        '&:hover': {
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
        },
    },
    
    userInfo: {
        [theme.fn.smallerThan('xs')]: {
            display: 'none',
        },  
    },
    
    headerTitle: {
        fontFamily: 'Poppins',
        color: theme.colors.secondary[3],
        fontWeight: 600,
        fontSize: theme.fontSizes.xl,
        [theme.fn.smallerThan('md')]: {
            fontSize: theme.fontSizes.lg,
        },
        [theme.fn.smallerThan('xs')]: {
            fontSize: theme.fontSizes.md,
        },
    },

    headerTitleIcon: {
        [theme.fn.smallerThan('xs')]: {
            display: 'none'
        },
    },

    burger: {
        [theme.fn.largerThan('xs')]: {
            display: 'none',
        },
    },

    userActive: {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
    },
}));