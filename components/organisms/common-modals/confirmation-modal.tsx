import Tippy from '@tippyjs/react';
import { Trash } from 'lucide-react';
import React from 'react';
import Swal from 'sweetalert2';

type ConfirmationModalProps = {
    type: number; // You can customize the types further or make it more dynamic
    title?: string;
    text?: string;
    confirmButtonText?: string;
    cancelButtonText?: string;
    icon?: 'warning' | 'success' | 'error' | 'info';
    onConfirm?: () => void;
    onCancel?: () => void;
    buttonLabel?: string;
    buttonIcon?: React.ReactNode;
    buttonVariant?: string;
    tipTool?: string;
};

const ConfirmationButtonModal: React.FC<ConfirmationModalProps> = ({
    type,
    title = 'Are you sure?',
    text = "You won't be able to revert this!",
    confirmButtonText = 'Yes, delete it!',
    cancelButtonText = 'No, cancel!',
    icon = 'warning',
    onConfirm,
    onCancel,
    buttonLabel = 'Click Me',
    buttonIcon = <Trash />,
    buttonVariant = 'btn btn-danger',
    tipTool = 'Delete',
}) => {
    const showAlert = async () => {
        if (type === 11) {
            const swalWithBootstrapButtons = Swal.mixin({
                customClass: {
                    confirmButton: 'btn btn-danger',
                    cancelButton: 'btn btn-dark ltr:mr-3 rtl:ml-3',
                    popup: 'sweet-alerts',
                },
                buttonsStyling: false,
            });
            swalWithBootstrapButtons
                .fire({
                    title,
                    text,
                    icon,
                    showCancelButton: true,
                    confirmButtonText,
                    cancelButtonText,
                    reverseButtons: true,
                    padding: '2em',
                })
                .then((result) => {
                    if (result.isConfirmed) {
                        swalWithBootstrapButtons.fire('Deleted!', 'Your data has been deleted.', 'success');
                        if (onConfirm) onConfirm();
                    } else if (result.dismiss === Swal.DismissReason.cancel) {
                        swalWithBootstrapButtons.fire('Cancelled', 'Your data is safe :)', 'error');
                        if (onCancel) onCancel();
                    }
                });
        }
    };

    return (
        <div className="mb-5">
            <div className="flex items-center justify-center gap-x-2">
                <Tippy content={tipTool} placement="bottom">
                    <button type="button" className={buttonVariant} onClick={showAlert}>
                        {buttonIcon && <span className="mr-2">{buttonIcon}</span>} {buttonLabel}
                    </button>
                </Tippy>
            </div>
        </div>
    );
};

export default ConfirmationButtonModal;
