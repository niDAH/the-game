import { v4 as uuid } from 'uuid';

interface ToastProps {
    buttons: JSX.Element[]
    children: JSX.Element[] | JSX.Element
    id: string
    position?: 'start' | 'top' | 'end' | 'bottom' | 'center' | 'middle'
    style?: 'info' | 'success' | 'warning' | 'danger'
    testId?: string
    title: string
}

function Toast({
    buttons,
    children,
    id = uuid(),
    position = 'top',
    style = 'info',
    testId = 'toast',
    title,
}: ToastProps): JSX.Element {
    return (
        <>
            <div
                className={`toast z-50 toast-${position}`}
                data-testid={testId ?? id}
                id={id}
            >
                <div className={`alert alert-${style} shadow-lg`}>
                    <div className="flex flex-col items-start">
                        <div className="alert-title font-bold">
                            {title}
                        </div>

                        {children}
                    </div>

                    {buttons.length > 0 && (
                        <div className="alert-buttons">
                            {buttons}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default Toast;
