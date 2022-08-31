import React from "react";
import {LoadingOverlay as BasicLoadingOverlay} from "@mantine/core";

export const LoadingOverlay = ({visible}: { visible: boolean }) => {
    return <BasicLoadingOverlay
        visible={visible} overlayBlur={2}
        loaderProps={{size: 'xl', color: 'primary.2', variant: 'bars'}}
    />
}
