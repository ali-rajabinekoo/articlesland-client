import React, {useRef} from "react";
import {createStyles, Box} from "@mantine/core";

const useStyles = createStyles(() => ({
    frame: {
        width: "100%",
        border: "none",
        overflowY: "auto",
    },
}));

class IFrameProps {
    srcDoc?: string | undefined
    srcUrl?: string | undefined
}

const IFrame = ({srcDoc, srcUrl}: IFrameProps) => {
    const {classes, cx} = useStyles()
    const ref = useRef()
    const [height, setHeight] = React.useState("0px");

    const onLoad = () => {
        // @ts-ignore
        setHeight(ref.current.contentWindow.document.body.scrollHeight + "px");
    };

    return (
        <Box>
            <iframe
                onLoad={onLoad}
                height={height}
                className={cx(classes.frame, 'showArticle')}
                srcDoc={`<body style="padding: 0 30px; box-sizing: border-box">${srcDoc}</body>`}
                src={srcUrl}
                ref={ref as any}
                scrolling="no"
                frameBorder="0"
            />
        </Box>
    )
}

export default IFrame
