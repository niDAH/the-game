import { v4 as uuid } from 'uuid';

interface ModalProps {
    cancelAction?: () => void
    cancelLabel?: string
    checked?: boolean
    children: React.ReactNode
    id: string
    noPrimary?: boolean
    primaryAction?: () => void
    primaryLabel?: string
    routingInUse?: boolean
    title: string
}

function Modal({
    cancelAction = () => {},
    cancelLabel = 'Cancel',
    checked = false,
    children,
    id = uuid(),
    noPrimary = false,
    primaryAction = () => {},
    primaryLabel = 'Ok',
    routingInUse = true,
    title,
}: ModalProps): JSX.Element {
    function cancel(): void {
        if (routingInUse) {
            window.history.back();
        } else {
            document.getElementById(id)?.click();
        }
        if (cancelAction) cancelAction();
    }

    return (
        <>
            <input
                defaultChecked={checked}
                className="modal-toggle"
                id={id}
                type="checkbox"
            />

            <div className="modal">
                <div className="modal-box">
                    {title && <h3 className="font-bold text-lg">{title}</h3>}

                    {children}

                    <div className="modal-action">
                        <label
                            className="btn btn-sm btn-secondary"
                            onClick={() => { cancel(); }}
                        >
                            {cancelLabel}
                        </label>

                        {!noPrimary && (
                            <label
                                className="btn btn-primary btn-sm"
                                onClick={() => { primaryAction(); }}
                            >
                                {primaryLabel}
                            </label>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Modal;
