import {Box, Group, UnstyledButton, Text, createStyles} from "@mantine/core";
import React, {MouseEventHandler} from "react";
import Link from "next/link";
import {LinkedItemDto} from "../../utils/types";

const useStyles = createStyles(() => ({
    btn: {
        '&:hover': {
            backgroundColor: '#f8f9fa',
            width: "100%"
        }
    }
}))

const Item = ({label, icon, href}: LinkedItemDto) => {
    const {classes} = useStyles()
    return (
        <Link href={href}>
            <UnstyledButton className={classes.btn}>
                <Group spacing={'xs'} p={'xs'}>
                    {icon}
                    <Text color={'grey.4'}>
                        {label}
                    </Text>
                </Group>
            </UnstyledButton>
        </Link>
    )
}

class NavbarCategoryItemsProps {
    items!: LinkedItemDto[]
    onClickClose?: Function | undefined
}

// this component is same with headerProfileDropdown but this component does not have menu component
const NavbarListItems = ({items, onClickClose}: NavbarCategoryItemsProps) => {
    return (
        <Box>
            {
                items.map((item: LinkedItemDto, index: number) => {
                    return (
                        <Box key={index} onClick={onClickClose as MouseEventHandler}>
                            <Item
                                label={item.label}
                                href={item.href}
                                icon={item.icon}
                            />
                        </Box>
                    )
                })
            }
        </Box>
    )
}

export default NavbarListItems
