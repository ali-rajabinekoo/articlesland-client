import {createStyles} from '@mantine/core';

export const useTextInputStyle = createStyles((theme) => ({
    input: {
        '& .mantine-Input-input': {
            border: `1px solid ${theme.colors.grey[0]} !important`,
            borderRadius: '8px',
            backgroundColor: "#FCFDFE",
            fontSize: theme.fontSizes.sm,
            color: theme.colors.grey[3]
        },
        '& .mantine-Input-input::placeholder': {
            color: theme.colors.grey[3]
        }
    }
}));

export const usePasswordInputStyle = createStyles((theme) => ({
    input: {
        '& .mantine-Input-input': {
            borderRadius: '8px',
            border: `1px solid ${theme.colors.grey[0]} !important`,
            backgroundColor: "#FCFDFE",
        },
        '& .mantine-PasswordInput-innerInput::placeholder': {
            color: theme.colors.grey[3]
        },
        '& .mantine-PasswordInput-innerInput': {
            fontSize: theme.fontSizes.sm,
            color: theme.colors.grey[3]
        }
    }
}));

export const useScrollContainer = createStyles((theme) => ({
    scrollbar: {
        '&::-webkit-scrollbar': {
            backgroundColor: 'rgba(0, 0, 0, 0)',
            width: theme.spacing.sm,
        },
        '&::-webkit-scrollbar-track': {
            backgroundColor: 'rgba(0, 0, 0, 0)',
        },
        '&::-webkit-scrollbar-track:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0)',
        },
        '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#babac0',
            borderRadius: '16px',
            border: '5px solid #fff',
        },
        '&::-webkit-scrollbar-thumb:hover': {
            backgroundColor: '#a0a0a5',
            border: '4px solid #f4f4f4',
        },
        '&::-webkit-scrollbar-button': {
            display: 'none',
        },
    }
}))
