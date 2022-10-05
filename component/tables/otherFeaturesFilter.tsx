import {Table} from '@mantine/core';
import {filterTableStyles} from "./filterTable.styles";

class OtherFeaturesFilterProps {
    onSelect?: Function | undefined;
    selectedItems?: {[key: string]: boolean} | undefined;
}

function OtherFeaturesFilter({onSelect, selectedItems = {}}: OtherFeaturesFilterProps) {
    const {classes} = filterTableStyles()
    
    return (
        <Table horizontalSpacing="md" verticalSpacing="sm" highlightOnHover={true}>
            <tbody>
                <tr
                    className={!!selectedItems?.mostPopular ? classes.selectedTableRow : classes.tableRow}
                    onClick={() => {
                    if (!!onSelect) onSelect('mostPopular')
                }}>
                    <td>محبوبیت</td>
                </tr>
            </tbody>
        </Table>
    );
}

export default OtherFeaturesFilter
