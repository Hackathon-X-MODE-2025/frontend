import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { WorkSpace } from "../pages/workspace/ui";
import { Session } from "../pages/session/ui";
import { Chat } from "../pages/chat/ui";
import { TestPage } from "../pages/test/ui";
import { EtlFinish } from "../pages/etl-finish/ui";

export const routes = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                index: true,
                element: <WorkSpace />
            },
            {
                path: 's/:id',
                element: <Session />
            },
            {
                path: 's/:id/c',
                element: <Chat />
            },
            {
                path: '/s/:id/c/f',
                element: <EtlFinish />
            },
            {
                path: 's/:id/test/e',
                element: <TestPage />
            }
        ]
    }
])