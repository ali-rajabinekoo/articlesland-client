import React from "react";
import {Box} from "@mantine/core";

class IFrameProps {
    srcDoc?: string | undefined
}

const IFrame = ({srcDoc}: IFrameProps) => {

    return (
        <Box my={'lg'} px={'sm'} sx={{boxSizing: 'content-box'}}>
            <div style={{boxSizing: 'content-box'}} dangerouslySetInnerHTML={{__html: `${srcDoc}`}}></div>
        </Box>
    )
}

export default IFrame
