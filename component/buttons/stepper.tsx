import {UnstyledButton, Group, Avatar, Text, createStyles} from '@mantine/core';
import {IconCheck} from "@tabler/icons";

const useStyles = createStyles((theme) => ({
    separator: {
        width: '100px',
        borderTop: `2px dotted ${theme.colors.grey[2]}`,
    },
    activeSeparator: {
        width: '100px',
        borderTop: `2px solid ${theme.colors.grey[3]}`,
    },
}))

class StepperItemProps {
    title!: string;
    label!: string;
    icon!: JSX.Element;
}

class StepperProps {
    items!: StepperItemProps[];
    onChange!: Function;
    step!: number;
    color?: string | undefined;
}

const Stepper = ({items = [], onChange = () => null, step = 0, color}: StepperProps) => {
    const {classes} = useStyles()
    const onClick = (index: number) => {
        onChange(index)
    }
    return (
        <Group spacing={'xs'} noWrap={false} position={'left'}>
            {items.map((el, index: number) => {
                return (
                    <Group spacing={'xs'} noWrap={false} key={index}>
                        <UnstyledButton onClick={onClick.bind({}, index)}>
                            <Group spacing={'xs'}>
                                <Avatar size={40} color={!!color ? color : "secondary.1"}>
                                    {step > index ? <IconCheck/> : el.icon}
                                </Avatar>
                                <div>
                                    <Text color={'grey.4'} size={'sm'} weight={500}>{el.title}</Text>
                                    <Text size="xs" color="grey.3" weight={600}>{el.label}</Text>
                                </div>
                            </Group>
                        </UnstyledButton>
                        {index !== items.length - 1 &&
                            <div className={step > index ? classes.activeSeparator : classes.separator}></div>}
                    </Group>
                )
            })}
        </Group>
    )
}

export default Stepper
