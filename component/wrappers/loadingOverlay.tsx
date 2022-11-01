import React from "react";
import {LoadingOverlay as BasicLoadingOverlay, LoadingOverlayProps} from "@mantine/core";

export const LoadingOverlay = ({visible, ...props}: LoadingOverlayProps) => {
    return <BasicLoadingOverlay
        loaderProps={{size: 'xl', color: 'primary.2', variant: 'bars'}}
        visible={visible}
        overlayBlur={2}
        {...props}
    />
}
