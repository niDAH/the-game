import { RouteObject } from 'react-router';

import Editor from '@pages/Editor/Editor';
import Error from '@pages/Error';
import Game from '@pages/Game';
import Home from '@pages/Home';
import Layout from '@pages/Layout';

export interface IRoute {
    children?: IRoute[];
    default?: boolean;
    element: JSX.Element;
    errorElement?: JSX.Element;
    id: string;
    name: string;
    parent: string | undefined;
    path: string | null;
    topLevel?: boolean;
    visible?: boolean;
};

export const routes: IRoute[] = [
    {
        element: <Layout />,
        errorElement: <Error />,
        children: [
            {
                default: true,
                element: <Editor />,
                id: 'editor',
                name: 'Editor',
                parent: 'layout',
                path: '/editor',
                topLevel: true,
                visible: true,
            },
            {
                default: true,
                element: <Editor />,
                id: 'editorList',
                name: 'Editor List',
                parent: 'layout',
                path: '/editor/list',
                topLevel: false,
                visible: false,
            },
            {
                default: true,
                element: <Editor />,
                id: 'editorSave',
                name: 'Editor Save',
                parent: 'layout',
                path: '/editor/save',
                topLevel: false,
                visible: false,
            },
            {
                default: true,
                element: <Game />,
                id: 'game',
                name: 'Game',
                parent: 'layout',
                path: '/game',
                topLevel: true,
                visible: true,
            },
            {
                default: true,
                element: <Home />,
                id: 'start',
                name: 'Home',
                parent: 'layout',
                path: '/',
                topLevel: true,
                visible: true,
            },
        ],
        id: 'mainLayout',
        name: 'HomeWrapper',
        parent: undefined,
        path: '/',
        topLevel: true,
        visible: false,
    },
];

/**
 * Creates an array of RouteObjects that can be passed to createBrowserRouter
 *
 * @returns {RouteObject[]} An array of RouteObjects that can be passed to createBrowserRouter
 */
export function routesAsRouterArray(): RouteObject[] {
    const routesArray: RouteObject[] = [];

    routes.forEach((route) => {
        if (route.topLevel) {
            routesArray.push({
                children: route.children ?? undefined as any, // todo: fix this -- any is not allowed :|
                index: route.default ?? false,
                element: route.element,
                id: route.id,
                path: route.path as string,
            });
        }
    });

    return routesArray;
}
