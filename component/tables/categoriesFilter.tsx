import {Table} from '@mantine/core';
import {CategoryDto} from "../../utils/types";
import {filterTableStyles} from "./filterTable.styles";

class CategoriesFilterProps {
    categories?: CategoryDto[];
    onClickCategory?: Function | undefined;
    selectedCategories?: { [key: string]: boolean } | undefined;
}

function CategoriesFilter({categories = [], onClickCategory, selectedCategories = {}}: CategoriesFilterProps) {
    const {classes} = filterTableStyles()

    const rows = categories.map((element: CategoryDto, index: number) => (
        <tr key={index}
            className={!!element?.id && selectedCategories[element?.id] ? classes.selectedTableRow : classes.tableRow}
            onClick={() => {
                if (!!onClickCategory) onClickCategory(element.id)
            }}>
            <td>{element.displayTitle}</td>
        </tr>
    ));

    return (
        <Table horizontalSpacing="md" verticalSpacing="sm" highlightOnHover={true}>
            <tbody>{rows}</tbody>
        </Table>
    );
}

export default CategoriesFilter
