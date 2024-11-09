'use client';
import UserForm from '@/components/forms/user/user-form';
import { QueryKeyConstants } from '@/constants/query-keys';
import { useAppContext } from '@/contexts/app-context';
import * as UserServices from '@/services/user-services';
import { IRootState } from '@/store';
import { updateIsEdit } from '@/store/user-slice';
import { UserType } from '@/types/forms';
import { statusBadgeColor } from '@/types/ui-props';
import { exportTable } from '@/utils/file-exports';
import Tippy from '@tippyjs/react';
import { sortBy } from 'lodash';
import { Pencil, Plus, Trash2 } from 'lucide-react';
import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import { useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import ConfirmationButtonModal from '@/components/organisms/common-modals/confirmation-modal';
import CommonSheet from '@/components/organisms/common-sheet/common-sheet';

const col = ['_id', 'email', 'firstName', 'lastName', 'isDelete', 'createdBy', 'updatedBy'];

const UserTable = () => {
    const isRtl = useSelector((state: IRootState) => state.themeConfigReducer.rtlClass) === 'rtl' ? true : false;
    const isEdit = useSelector((state: IRootState) => state.userReducer?.isEdit);

    const { showToast } = useAppContext();
    const queryClient = useQueryClient();
    const dispatch = useDispatch();

    const {
        isLoading: usersLoading,
        data: usersData,
        refetch: usersRefetch,
    } = useQuery(QueryKeyConstants.GET_ALL_AUTHORIZED_USERS_KEY, UserServices.fetchAuthorizedUsers, {
        onError: () => {},
    });

    const { mutate: deleteMutate } = useMutation(UserServices.deleteUserById, {
        onSuccess: async () => {
            showToast({ message: 'User deleted successfully!', icon: 'success', position: 'top-end' });
            await queryClient.invalidateQueries(QueryKeyConstants.GET_VALIDATE_TOKEN_KEY);
            usersRefetch();
            setIsSheetOpen(false);
        },
        onError: (error: Error) => {
            showToast({ message: error.message, icon: 'error', position: 'top-end' });
        },
    });

    const [page, setPage] = useState(1);
    const PAGE_SIZES = [10, 20, 30, 50, 100];
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [rowData, setRowData] = useState<UserType[]>([]);
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
        if (usersData && usersData.length > 0) {
            setRowData(usersData);
        } else {
            setRowData([]); // Make sure to set the state even if usersData is not available
        }
    }, [usersData]);

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
                    item.email.toString().toLowerCase().includes(search.toLowerCase()) ||
                    item.firstName.toString().toLowerCase().includes(search.toLowerCase()) ||
                    item.lastName.toString().toLowerCase().includes(search.toLowerCase())
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

    const handleDelete = async (userId: string) => {
        deleteMutate(userId);
    };

    return (
        <>
            <div className="panel mt-6">
                <div className="mb-4.5 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                    {/* Search input container */}
                    <div className="flex items-center gap-x-2">
                        <input type="text" className="form-input w-auto" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
                    </div>

                    {/* Create button container */}
                    <div>
                        <button type="button" className="btn btn-primary" onClick={() => setIsSheetOpen(!isSheetOpen)}>
                            <Plus className="ltr:mr-2 rtl:ml-2" size={16} />
                            CREATE
                        </button>
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
                                            onConfirm={() => handleDelete(record?._id)}
                                            onCancel={() => console.log('Action cancelled')}
                                            buttonIcon={<Trash2 color="red" size={18} />}
                                            buttonVariant="none"
                                            tipTool="Delete"
                                        />
                                    </div>
                                ),
                            },
                            { accessor: 'email', title: 'E-mail', sortable: true },
                            {
                                accessor: '',
                                title: 'Full Name',
                                sortable: true,
                                render: (record: any) => <div className="mx-auto flex">{record?.firstName && <span className="gap-x-2">{record?.firstName + ' ' + record?.lastName}</span>}</div>,
                            },
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
                        title={isEdit && editData ? 'UPDATE USER' : 'CREATE USER'}
                        description="You can manage Users and assign Roles to them"
                    >
                        <UserForm isSheetOpen={isSheetOpen} setIsSheetOpen={setIsSheetOpen} editData={isEdit && JSON.stringify(editData)} />
                    </CommonSheet>
                </div>
            </div>
        </>
    );
};

export default UserTable;
