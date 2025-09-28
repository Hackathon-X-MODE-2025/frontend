import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useGetChatQuery } from "../../../entities/session/session-api";
import { CodeEditor } from "../../../features/chat-code-editor/ui";
import { ChatPipeline } from "../../../features/chat-pipeline/ui";

export const ChatReadWindow = () => {
    const [page, setPage] = useState(0);
    const [messages, setMessages] = useState<any[]>([]);
    const [editedSql, setEditedSql] = useState('')
    const [editedDag, setEditedDag] = useState('')
    const scrollRef = useRef<HTMLDivElement | null>(null);

    console.log(editedDag, editedSql)

    const {
        data: chatData,
        isSuccess: chatSuccess,
        isFetching: chatFetching,
    } = useGetChatQuery(
        { page: page },
        { pollingInterval: 1000 }
    );

    useEffect(() => {
        if (!chatSuccess || !chatData?.content) return;

        setMessages((prev) => {
            const existingIds = new Set(prev.map((m) => m.id));
            const uniqueNew = chatData.content.filter((m) => !existingIds.has(m.id));

            if (page === 0) {
                return [...prev, ...uniqueNew];
            } else {
                return [...uniqueNew, ...prev];
            }
        });
    }, [chatData, chatSuccess, page]);

    useEffect(() => {
        const el = scrollRef.current;
        if (!el) return;

        const handleScroll = () => {
            if (el.scrollTop < 50 && !chatFetching) {
                setPage((prev) => prev + 1);
            }
        };

        el.addEventListener("scroll", handleScroll);
        return () => el.removeEventListener("scroll", handleScroll);
    }, [chatFetching]);

    useLayoutEffect(() => {
        const el = scrollRef.current;
        if (!el || !chatSuccess || !chatData?.content?.length) return;

        if (page === 0) {
            requestAnimationFrame(() => {
                el.scrollTop = el.scrollHeight;
            });
        }
    }, [chatSuccess, chatData, page]);

    return (
        <div
            ref={scrollRef}
            className="h-[85%] overflow-y-auto overflow-x-hidden p-10 whitespace-pre-wrap "
        >
            {messages.map((msg, i) => (
                <>
                    <div key={msg.id} className="flex items-center gap-5">
                        <div className="self-end border-red-300 border">X MODE </div>
                        <div className="flex flex-col gap-5 w-1/2">
                            <CodeEditor language={'python'} code={msg.dag} onChange={(value: any) => setEditedDag(value ?? '')} />
                            <CodeEditor language={'sql'} code={msg.ddl} onChange={(value: any) => setEditedSql(value ?? '')} />
                        </div>
                        <div className="w-1/2 self-start">
                            <ChatPipeline />
                        </div>

                    </div>
                    {i !== messages.length - 1 && <hr className="border-t border-white/10 mt-2 mb-2" />}

                </>

            ))}


        </div >
    );
};
