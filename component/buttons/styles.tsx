import {createStyles} from '@mantine/core';

export const usePrimaryBtnStyle = createStyles((theme) => ({
    btn: {
        '&:hover' : {
            backgroundColor: theme.colors.primary[3]
        },
    }
}));

export const useSecondaryBtnStyle = createStyles((theme) => ({
    btn: {
        '&:hover' : {
            backgroundColor: theme.colors.primary[0]
        },
    }
}));
