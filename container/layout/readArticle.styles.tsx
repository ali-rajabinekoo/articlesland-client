import {createStyles} from "@mantine/core";

export const useReadArticleBannerStyle = createStyles((theme) => ({
    avatar: {
        [`@media (max-width: ${theme.breakpoints.xs}px)`]: {
            display: "none",
        },
    },
}));
