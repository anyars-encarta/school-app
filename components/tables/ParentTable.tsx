import { TableColumnParams } from "@/app/types";

const ParentTable = (
    {
        parentColumns, renderRow, data, role
    }: {
        parentColumns: TableColumnParams[], renderRow: (item: any) => React.ReactNode, data: any[], role: string
    }) => {
    const columns = parentColumns.map((column) => column);
    if (role === 'admin') {
        columns.push({
            header: 'Actions',
            accessor: 'actions',
        });
    };

    return (
        <table className='w-full mt-4'>
            <thead>
                <tr className='text-left text-gray-500 text-sm'>
                    {columns.map((col, i) => (
                        <th key={i} className={col.className}>{col.header}</th>
                    ))}
                </tr>
            </thead>

            <tbody>{data.map((dataItem) => renderRow(dataItem))}</tbody>
        </table>
    )
}

export default ParentTable;