import {createStyles} from '@mantine/core';

export const usePrimaryBtnStyle = createStyles((theme) => ({
    btn: {
        '&:hover' : {
            backgroundColor: theme.colors.primary[3]
        },
    }
}));

export const usePrimaryDangerBtnStyle = createStyles((theme) => ({
    btn: {
        '&:hover' : {
            backgroundColor: theme.colors.danger[4]
        },
    }
}));

export const usePrimaryOutlineBtnStyle = createStyles((theme) => ({
    btn: {
        '&:hover' : {
            backgroundColor: theme.colors.primary[0]
        },
    }
}));
