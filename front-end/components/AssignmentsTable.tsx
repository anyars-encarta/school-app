
const AssignmentsTable = (
    {
        assignmentsColumns, renderRow, data
    }: {
        assignmentsColumns: TableColumnParams[], renderRow: (item: any) => React.ReactNode, data: any[]
    }) => {
    return (
        <table className='w-full mt-4'>
            <thead>
                <tr className='text-left text-gray-500 text-sm'>
                    {assignmentsColumns.map((col, i) => (
                        <th key={i} className={col.className}>{col.header}</th>
                    ))}
                </tr>
            </thead>

            <tbody>{data.map((dataItem) => renderRow(dataItem))}</tbody>
        </table>
    )
}

export default AssignmentsTable;