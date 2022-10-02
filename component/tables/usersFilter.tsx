import {Table, Avatar, Group} from '@mantine/core';
import {UserDto} from "../../utils/types";
import {filterTableStyles} from "./filterTable.styles";

class UsersFilterProps {
    users?: UserDto[];
    onSelectUser?: Function | undefined;
    selectedUsers?: { [key: string]: boolean } | undefined;
}

function UsersFilter({users = [], onSelectUser, selectedUsers = {}}: UsersFilterProps) {
    const {classes} = filterTableStyles()

    const rows = (Array.isArray(users) ? users : [])?.map((element: UserDto, index: number) => (
        <tr key={index}
            className={!!element?.id && selectedUsers[element?.id] ? classes.selectedTableRow : classes.tableRow}
            onClick={() => {
                if (!!onSelectUser) onSelectUser(element.id)
            }}>
            <td>
                <Group noWrap={true}>
                    <Avatar radius={'xl'}/> {element.displayName}
                </Group>
            </td>
        </tr>
    ));

    return (
        <Table horizontalSpacing="md" verticalSpacing="sm" highlightOnHover={true}>
            <tbody>{rows}</tbody>
        </Table>
    );
}

export default UsersFilter
