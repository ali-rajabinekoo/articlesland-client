import React from "react";
import {Box} from "@mantine/core";

class IFrameProps {
    srcDoc?: string | undefined
}

const IFrame = ({srcDoc}: IFrameProps) => {
    return (
        <Box my={'lg'} px={'sm'} sx={{boxSizing: 'content-box', maxWidth: '100%'}}>
            <div style={{boxSizing: 'content-box'}} dangerouslySetInnerHTML={{__html: `${srcDoc}`}}/>
        </Box>
    )
}

export default IFrame
