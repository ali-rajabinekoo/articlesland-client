import {createStyles} from "@mantine/core";

export const useUploadInput = createStyles((theme) => ({
    wrapper: {
        position: 'relative',
        marginBottom: 30,
    },

    dropzone: {
        borderWidth: 1,
        paddingBottom: 50,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        minHeight: 260
    },

    icon: {
        color: theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.gray[4],
    },

    control: {
        position: 'absolute',
        width: 250,
        left: 'calc(50% - 125px)',
        bottom: -20,
        [`@media (max-width: ${theme.breakpoints.xs}px)`]: {
            left: 'calc(50% - 90px)',
            width: 180,
        },
    },

    // textGlass: {
    //     background: "rgba(255, 255, 255, 0.42)",
    //     borderRadius: "16px",
    //     boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
    //     backdropFilter: "blur(8.8px)",
    //     WebkitBackdropFilter: "blur(8.8px)",
    //     padding: theme.spacing.sm,
    // },
}));
