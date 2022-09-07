import {Paper} from "@mantine/core";
import {ReadArticleBannerProps} from "../../utils/types";
import {useReadArticleStyle} from "./readArticleBanner.styles";

const ReadArticleBanner = ({src}: ReadArticleBannerProps) => {
    const {classes} = useReadArticleStyle({src})

    return (
        <Paper className={classes.banner} shadow="xs" p="md"></Paper>
    )
}

export default ReadArticleBanner
