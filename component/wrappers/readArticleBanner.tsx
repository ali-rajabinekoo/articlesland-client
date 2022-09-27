import {createStyles, Paper} from "@mantine/core";
import {ReadArticleBannerProps} from "../../utils/types";

export const useReadArticleStyle = createStyles((theme, {src}: ReadArticleBannerProps) => ({
    banner: {
        width: "700px",
        height: "400px",
        backgroundImage: `url(${src})`,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        [`@media (max-width: ${theme.breakpoints.md}px)`]: {
            width: "600px",
            height: "350px",
        },
        [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
            width: "500px",
            height: "300px",
        },
        [`@media (max-width: ${theme.breakpoints.xs}px)`]: {
            width: "200px",
            height: "150px",
        },
    },
}));

const ReadArticleBanner = ({src}: ReadArticleBannerProps) => {
    const {classes} = useReadArticleStyle({src})

    return (
        <Paper className={classes.banner} shadow="xs" p="md"></Paper>
    )
}

export default ReadArticleBanner
