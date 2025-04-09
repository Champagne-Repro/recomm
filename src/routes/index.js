import { RouterProvider, createBrowserRouter, Navigate } from "react-router-dom";
import routes from "./routes";

import Home from "../views/Home.js";
import Layout from '../components/Layout.js';
import Switch from "../views/Switch.js";
import Onduleur from "../views/Onduleur.js";
import Ecran from "../views/Ecran.js";
import Clavier from "../views/Clavier.js";
import Souris from "../views/Souris.js";

const Routes = ({onChangeTheme, theme}) => {
    const routesForPublic = [
        {
            path: routes.ALL,
            element: <Layout onChangeTheme={onChangeTheme} theme={theme}/>,
            children: [
                { index: true, element: <Navigate to={routes.HOME} replace /> },
                {
                    path: routes.HOME,
                    element: <Home />,
                },
                {
                    path: routes.SWITCH,
                    element: <Switch />
                },
                {
                    path: routes.ONDULEUR,
                    element: <Onduleur />
                },
                {
                    path: routes.ECRAN,
                    element: <Ecran />
                },
                {
                    path: routes.SOURIS,
                    element: <Souris />
                },
                {
                    path: routes.CLAVIER,
                    element: <Clavier />
                }
            ],
        },
    ];

    // Combine and conditionally include routes based on authentication status
    const router = createBrowserRouter([
        ...routesForPublic
    ]);

    // Provide the router configuration using RouterProvider
    return <RouterProvider router={router} />;
};

export default Routes;