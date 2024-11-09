'use client';
import { sortBy } from 'lodash';
import Tippy from '@tippyjs/react';
import { IRootState } from '@/store';
import { RoleType } from '@/types/forms';
import { useEffect, useState } from 'react';
import { updateIsEdit } from '@/store/role-slice';
import { exportTable } from '@/utils/file-exports';
import { statusBadgeColor } from '@/types/ui-props';
import { Pencil, Plus, Trash2 } from 'lucide-react';
import { useAppContext } from '@/contexts/app-context';
import { useQuery, useQueryClient } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import CommonSheet from '../common-sheet/common-sheet';
import { QueryKeyConstants } from '@/constants/query-keys';
import * as EnquiryServices from '@/services/enquiry-services';
import EnquiryForm from '@/components/forms/enquiry/enquiry-form';
import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import ConfirmationButtonModal from '@/components/organisms/common-modals/confirmation-modal';

const col = ['_id', 'phoneNo', 'name', 'tripType', 'leavingFrom', 'leavingTo', 'dateRange', 'cabinClassAndTravellers', 'isDelete', 'createdBy', 'updatedBy'];

const EnquiryTable = () => {
    const isRtl = useSelector((state: IRootState) => state.themeConfigReducer.rtlClass) === 'rtl' ? true : false;
    const isEdit = useSelector((state: IRootState) => state.roleReducer?.isEdit);

    const { showToast } = useAppContext();
    const queryClient = useQueryClient();
    const dispatch = useDispatch();

    const {
        isLoading: isEnquiriesLoading,
        data: enquiriesData,
        refetch: enquiriesRefetch,
    } = useQuery(QueryKeyConstants.GET_ALL_ENQUIRIES_KEY, EnquiryServices.fetchAllEnquiries, {
        onError: () => {},
    });

    const [page, setPage] = useState(1);
    const PAGE_SIZES = [10, 20, 30, 50, 100];
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [rowData, setRowData] = useState<RoleType[]>([]);
    const [initialRecords, setInitialRecords] = useState(sortBy(rowData, '_id'));
    const [recordsData, setRecordsData] = useState(initialRecords);
    const [search, setSearch] = useState('');
    const [selectedRecords, setSelectedRecords] = useState<any>([]);
    const [isSheetOpen, setIsSheetOpen] = useState(false);
    const [editData, setEditData] = useState<any>([]);

    const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
        columnAccessor: 'updatedAt',
        direction: 'desc',
    });
    // Handle selecting individual rows
    const handleRowSelection = (record: any) => {
        setSelectedRecords((prevSelected: any) => {
            if (prevSelected.includes(record)) {
                return prevSelected.filter((r: any) => r !== record); // Deselect if already selected
            } else {
                return [...prevSelected, record]; // Add to selected if not selected
            }
        });
    };

    // Handle "Select All" checkbox
    const handleSelectAll = (isChecked: boolean) => {
        if (isChecked) {
            setSelectedRecords(recordsData); // Select all visible records
        } else {
            setSelectedRecords([]); // Deselect all
        }
    };

    useEffect(() => {
        if (enquiriesData && enquiriesData.length > 0) {
            setRowData(enquiriesData);
        } else {
            setRowData([]); // Make sure to set the state even if enquiriesData is not available
        }
    }, [enquiriesData]);

    useEffect(() => {
        setPage(1); // Reset to page 1 when page size changes
    }, [pageSize]);

    useEffect(() => {
        // Sort and set records based on rowData
        const sortedRecords = sortBy(rowData, sortStatus.columnAccessor);
        setInitialRecords(sortStatus.direction === 'desc' ? sortedRecords.reverse() : sortedRecords);
    }, [rowData, sortStatus]);

    useEffect(() => {
        const from = (page - 1) * pageSize;
        const to = from + pageSize;
        setRecordsData([...rowData.slice(from, to)]); // Use rowData instead of initialRecords
    }, [page, pageSize, rowData]);

    useEffect(() => {
        const from = (page - 1) * pageSize;
        const to = from + pageSize;
        const filteredAndSortedData = sortBy(
            rowData.filter((item: any) => {
                return (
                    item._id.toString().includes(search.toLowerCase()) ||
                    item.phoneNo.toString().toLowerCase().includes(search.toLowerCase()) ||
                    item.name.toString().toLowerCase().includes(search.toLowerCase()) ||
                    item.tripType.toString().toLowerCase().includes(search.toLowerCase()) ||
                    item.leavingFrom.toString().toLowerCase().includes(search.toLowerCase()) ||
                    item.leavingTo.toString().toLowerCase().includes(search.toLowerCase())
                );
            }),
            sortStatus.columnAccessor
        );

        // Set recordsData for current page
        setRecordsData(sortStatus.direction === 'desc' ? filteredAndSortedData.reverse().slice(from, to) : filteredAndSortedData.slice(from, to));
    }, [rowData, page, pageSize, sortStatus, search]);

    useEffect(() => {
        const data = sortBy(initialRecords, sortStatus.columnAccessor);
        setInitialRecords(sortStatus.direction === 'desc' ? data.reverse() : data);
        setPage(1);
    }, [sortStatus]);

    const handleFileExport = async (type: string) => {
        await exportTable(type, rowData, col);
    };

    const handleEdit = async (record: object) => {
        setIsSheetOpen(true);
        dispatch(updateIsEdit(true));
        setEditData(record);
    };

    return (
        <>
            <div className="panel mt-6">
                <div className="mb-4.5 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                    {/* Search input container */}
                    <div className="flex items-center gap-x-2">
                        <input type="text" className="form-input w-auto" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
                    </div>
                </div>
                <div className="datatables">
                    <DataTable
                        highlightOnHover
                        className="table-hover whitespace-nowrap"
                        records={recordsData} // Pass an empty array if loading
                        columns={[
                            // "Select All" checkbox in the header
                            {
                                accessor: 'selectAll',
                                title: <input type="checkbox" className="form-checkbox" checked={selectedRecords.length === recordsData.length} onChange={(e) => handleSelectAll(e.target.checked)} />,
                                render: (record) => <input className="form-checkbox" type="checkbox" checked={selectedRecords.includes(record)} onChange={() => handleRowSelection(record)} />,
                            },
                            {
                                accessor: 'action',
                                title: 'Action',
                                titleClassName: '!text-center',
                                render: (record) => (
                                    <div className="mx-auto flex w-max items-center gap-2">
                                        <Tippy content="Edit" placement="bottom">
                                            <button type="button" onClick={() => handleEdit(record)}>
                                                <Pencil color="orange" size={18} />
                                            </button>
                                        </Tippy>
                                        <ConfirmationButtonModal
                                            type={11}
                                            title="Are you sure?"
                                            text={`Do you want to delete this data?`}
                                            confirmButtonText="Yes, delete it!"
                                            cancelButtonText="No, keep it!"
                                            buttonLabel=""
                                            onCancel={() => console.log('Action cancelled')}
                                            buttonIcon={<Trash2 color="red" size={18} />}
                                            buttonVariant="none"
                                            tipTool="Delete"
                                        />
                                    </div>
                                ),
                            },
                            { accessor: 'phoneNo', title: 'Phone No', sortable: true },
                            { accessor: 'name', title: 'Name', sortable: true },
                            { accessor: 'tripType', title: 'Trip Type', sortable: true },
                            { accessor: 'leavingFrom', title: 'Leaving From', sortable: true },
                            { accessor: 'leavingTo', title: 'Leaving To', sortable: true },
                            { accessor: 'dateRange', title: 'Date Range', sortable: true },
                            { accessor: 'cabinClassAndTravellers', title: 'Cabin Class & Travellers', sortable: true },
                            { accessor: 'status', title: 'Status', sortable: true },

                            {
                                accessor: 'isDelete',
                                title: 'Status',
                                sortable: true,
                                render: (record) => <span className={`badge bg-${statusBadgeColor(record?.isDelete)}`}>{record?.isDelete ? 'INACTIVE' : 'ACTIVE'}</span>,
                            },
                            {
                                accessor: 'createdBy',
                                title: 'Created By',
                                sortable: true,
                                render: (record: any) => (
                                    <div className="mx-auto flex">
                                        {record?.createdBy && <span className="badge badge-outline-primary rounded-full">{record?.createdBy?.firstName + ' ' + record?.createdBy?.lastName}</span>}
                                    </div>
                                ),
                            },
                            {
                                accessor: 'updatedBy',
                                title: 'Updated By',
                                sortable: true,
                                render: (record: any) => (
                                    <div className="mx-auto flex">
                                        {record?.updatedBy && <span className="badge badge-outline-primary rounded-full">{record?.updatedBy?.firstName + ' ' + record?.updatedBy?.lastName}</span>}
                                    </div>
                                ),
                            },
                        ]}
                        totalRecords={initialRecords.length}
                        recordsPerPage={pageSize}
                        page={page}
                        onPageChange={(p) => setPage(p)}
                        recordsPerPageOptions={PAGE_SIZES}
                        onRecordsPerPageChange={setPageSize}
                        sortStatus={sortStatus}
                        onSortStatusChange={setSortStatus}
                        minHeight={200}
                        paginationText={({ from, to, totalRecords }) => `Showing  ${from} to ${to} of ${totalRecords} entries`}
                    />
                </div>
                {/* Shirt Form Sheet */}
                <div>
                    <CommonSheet
                        maxWidth="max-w-[50%]"
                        isSheetOpen={isSheetOpen}
                        setIsSheetOpen={setIsSheetOpen}
                        title={isEdit && editData ? 'UPDATE ENQUIRY' : 'CREATE ENQUIRY'}
                        description="You can manage enquiries here."
                    >
                        <EnquiryForm
                        // isSheetOpen={isSheetOpen} setIsSheetOpen={setIsSheetOpen} editData={isEdit && JSON.stringify(editData)}
                        />
                    </CommonSheet>
                </div>
            </div>
        </>
    );
};

export default EnquiryTable;
