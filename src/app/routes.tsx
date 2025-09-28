import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { WorkSpace } from "../pages/workspace/ui";
import { Session } from "../pages/session/ui";
import { Chat } from "../pages/chat/ui";

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
            }
        ]
    }
])