import {createStyles} from '@mantine/core';

export const useProfileStyles = createStyles((theme) => ({
    container: {
        padding: `0px 150px`,
        [theme.fn.smallerThan('md')]: {
            padding: `0px 50px`,
        },
        [theme.fn.smallerThan('sm')]: {
            padding: 0,
        },
    }
}));
