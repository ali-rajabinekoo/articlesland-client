import {createStyles} from '@mantine/core';

export const useTextInputStyle = createStyles((theme) => ({
    input: {
        '& .mantine-Input-input' : {
            border: `1px solid ${theme.colors.grey[0]} !important`,
            borderRadius: '8px',
            backgroundColor: "#FCFDFE",
            fontSize: theme.fontSizes.sm,
            color: theme.colors.grey[3]
        },
        '& .mantine-Input-input::placeholder' : {
            color: theme.colors.grey[3]
        }
    }
}));

export const usePasswordInputStyle = createStyles((theme) => ({
    input: {
        '& .mantine-Input-input' : {
            borderRadius: '8px',
            border: `1px solid ${theme.colors.grey[0]} !important`,
            backgroundColor: "#FCFDFE",
        },
        '& .mantine-PasswordInput-innerInput::placeholder' : {
            color: theme.colors.grey[3]
        },
        '& .mantine-PasswordInput-innerInput' : {
            fontSize: theme.fontSizes.sm,
            color: theme.colors.grey[3]
        }
    }
}));
