import { useEffect } from 'react';
import { Outlet } from 'react-router';

import { themeChange } from 'theme-change';

export default function Layout() {
    useEffect(() => {
        themeChange(false);
    }, []);

    return (
        <div className="flex flex-col h-screen justify-between">
            <header className="h-12 p-4 bg-primary">
                <h1 className="text-2xl text-base-100">
                    site name
                </h1>
            </header>

            <main className="mb-auto mt-4 mr-4 ml-4">
                <Outlet />
            </main>

            <footer className="bg-neutral p-6 flex justify-center h-20 gap-10 align-middle">
                <select className="select select-xs" data-choose-theme data-key="the-game-theme">
                    <option value="light">Default (light)</option>
                    <option value="dark">Dark</option>
                    <option value="emerald">Emerald</option>
                    <option value="forest">Forest</option>
                    <option value="garden">Garden</option>
                    <option value="pastel">Pastel</option>
                </select>
                <p className="text-sm text-neutral-content">dAh @{new Date().getFullYear()}</p>
            </footer>
        </div>
    );
}
