import { useEffect, useState } from "react";

export const useCheckAuth = (intervalMs = 1000) => {
    const [userInfo, setUserInfo] = useState(() => ({
        userName: localStorage.getItem("user_name"),
        userId: localStorage.getItem("user_id"),
        isLogged: !!localStorage.getItem("user_id"),
    }));

    useEffect(() => {
        const checkAuth = () => {
            const userId = localStorage.getItem("user_id");
            const userName = localStorage.getItem("user_name");

            setUserInfo((prev) => {
                if (prev.userId !== userId || prev.userName !== userName) {
                    return {
                        userName,
                        userId,
                        isLogged: !!userId,
                    };
                }
                return prev;
            });
        };

        checkAuth();
        const timer = setInterval(checkAuth, intervalMs);

        return () => clearInterval(timer);
    }, [intervalMs]);

    return { userInfo };
};
