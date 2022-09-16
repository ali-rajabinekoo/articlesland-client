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
        <Box sx={{display: 'flex', alignItems: 'end'}}>
            <Box sx={{width: '100%', borderBottom: '1px solid #C2C4C9'}}></Box>
            <Container p={0} size={'xl'} sx={{transform: 'rotateX(180deg)'}}>
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
            <Box sx={{width: '100%', borderBottom: '1px solid #C2C4C9'}}></Box>
        </Box>
    )
}
