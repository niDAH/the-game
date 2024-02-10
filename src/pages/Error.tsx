import { useRouteError } from 'react-router-dom';

export default function Error() {
    const error = useRouteError() as {
        data?: string;
        statusText?: string;
    };

    console.error(error);

    return (
        <div id="error-page" className="flex flex-col justify-center items-center h-screen">
            <h1 className="text-5xl font-proza-libre font-bold text-primary">Oops!</h1>

            <p className="mt-4 mb-2">Sorry, an unexpected error has occurred.</p>
            <p>
                <i>{error.data || error.statusText}</i>
            </p>

            <p className="mt-6"><a href="/" className="link link-primary hover:link-secondary">Home</a></p>
        </div>
    );
}
