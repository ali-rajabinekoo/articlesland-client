import {ScrollContainer} from "../../component/inputs";
import {Container, Group, Tabs, Text} from "@mantine/core";
import React, {useMemo} from "react";
import {useCategoriesList} from "./tabs.style";

class TabsItemDto {
    displayValue!: string
    value!: string
}

interface CategoriesListProps {
    tabs: TabsItemDto[] | undefined;
}

export default function CategoriesTab({tabs}: CategoriesListProps) {
    const {classes} = useCategoriesList();
    const items = useMemo(() => {
        return !!tabs ? tabs.map((tab, index) => (
            <Tabs.Tab value={tab.value} key={index} className={classes.tab}>
                <Text size={'sm'} weight={400}>{tab.displayValue}</Text>
            </Tabs.Tab>
        )) : [];
    }, [tabs, classes.tab])
    return (
        <ScrollContainer scroll={'x'}>
            <Tabs className={classes.tabs} variant="outline" radius="xs" defaultValue="gallery" sx={{width: "100%"}}>
                <Tabs.List className={classes.tabsList} sx={{width: "100%"}}>
                    <Container sx={{width: "100%"}} size={'xl'}>
                        <Group position="left" spacing={0}>
                            {items}
                        </Group>
                    </Container>
                </Tabs.List>
            </Tabs>
        </ScrollContainer>
    )
}
