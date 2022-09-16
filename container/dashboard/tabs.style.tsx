import {createStyles} from "@mantine/core";

export const useCategoriesList = createStyles((theme) => ({
    tabs: {
        [theme.fn.smallerThan('sm')]: {
            display: 'none',
        },
    },

    tabsList: {
        borderColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.grey[1],
        display: "inline-block"
    },

    tab: {
        height: '45px',
        backgroundColor: 'transparent',

        '&:hover': {
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.grey[0],
        },

        padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,

        '&[data-active]': {
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
            borderColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.grey[1],
        },
    },

    textEllipsis: {
        width: "100%",
        overflow: 'hidden',
        textOverflow: "ellipsis",
        textAlign: 'center',
        whiteSpace: 'nowrap',
    },

    tabContainer: {
        overflowX: 'auto'
    }
}));
