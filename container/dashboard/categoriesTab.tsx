import {ScrollContainer} from "../../component/inputs";
import {Container, Group, Tabs, Text, Box} from "@mantine/core";
import React, {useMemo} from "react";
import {useCategoriesList} from "./tabs.style";
import {CategoriesTab as CategoriesTabType} from "../../utils/types";

interface CategoriesListProps {
    tabs: CategoriesTabType[] | undefined;
}

export default function CategoriesTab({tabs}: CategoriesListProps) {
    const {classes, theme} = useCategoriesList();
    const items = useMemo(() => {
        return !!tabs ? tabs.map((tab, index) => (
            <Tabs.Tab value={tab.value} key={index} className={classes.tab}>
                <Text size={'sm'} weight={400}>{tab.displayValue}</Text>
            </Tabs.Tab>
        )) : [];
    }, [tabs, classes.tab])
    return (
        <Box className={classes.wrapper}>
            <Box className={classes.flexBoxes}/>
            <Box  className={classes.mainFlexBoxes}>
                <Container size={'xl'} className={classes.container}>
                    <ScrollContainer scroll={'x'} bgColor={theme.colors.grey[0]} hover={true}>
                        <Box sx={{transform: 'rotateX(180deg)'}}>
                            <Tabs className={classes.tabs} variant="outline" radius="xs" defaultValue="gallery">
                                <Tabs.List className={classes.tabsList}>
                                    <Group position="left" spacing={0} px={'sm'} noWrap={true}>
                                        {items}
                                    </Group>
                                </Tabs.List>
                            </Tabs>
                        </Box>
                    </ScrollContainer>
                </Container>
                <Box className={classes.mobileContainer}/>
            </Box>
            <Box className={classes.flexBoxes}/>
        </Box>
    )
}

// export function SimpleCategoriesTab({tabs}: CategoriesListProps) {
//     const {classes} = useCategoriesList();
//     const items = useMemo(() => {
//         return !!tabs ? tabs.map((tab, index) => (
//             <Tabs.Tab value={tab.value} key={index} className={classes.tab}>
//                 <Text size={'sm'} weight={400}>{tab.displayValue}</Text>
//             </Tabs.Tab>
//         )) : [];
//     }, [tabs, classes.tab])
//     return (
//         <ScrollContainer scroll={'x'}>
//             <Tabs className={classes.tabs} variant="outline" radius="xs" defaultValue="gallery" sx={{width: "100%"}}>
//                 <Tabs.List className={classes.tabsList} sx={{width: "100%"}}>
//                     <Container sx={{width: "100%"}} size={'xl'}>
//                         <Group position="left" spacing={0}>
//                             {items}
//                         </Group>
//                     </Container>
//                 </Tabs.List>
//             </Tabs>
//         </ScrollContainer>
//     )
// }
