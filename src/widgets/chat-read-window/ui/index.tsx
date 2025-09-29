import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useGetChatQuery, usePatchRecomendationsChatMutation } from "../../../entities/session/session-api";
import { CodeEditor } from "../../../features/chat-code-editor/ui";
import { ChatPipeline } from "../../../features/chat-pipeline/ui";
import { useParams } from "react-router-dom";

export const ChatReadWindow = () => {
    const { id } = useParams()
    const [page, setPage] = useState(0);
    const [messages, setMessages] = useState<any[]>([]);
    const scrollRef = useRef<HTMLDivElement | null>(null);


    const {
        data: chatData,
        isSuccess: chatSuccess,
        isFetching: chatFetching,
    } = useGetChatQuery(
        { page: page, id: id },
        { pollingInterval: 1000 }
    );

    const [patchRecomendationTrigger] = usePatchRecomendationsChatMutation()

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

    const handleSaveRecomendations = (value: any, param: any) => {
        patchRecomendationTrigger({
            id: id, body: {
                [param]: value
            }
        })
    }

    return (
        <div
            ref={scrollRef}
            className="h-[80%] overflow-y-auto overflow-x-hidden p-10 pb-0 whitespace-pre-wrap mt-10"
        >
            {messages.map((msg, i) => (
                <>
                    <div key={msg.id} className="flex items-center gap-5">
                        <div className="self-end border-white border rounded-[50%] p-4 w-4 h-4 flex justify-center items-center">X</div>
                        <div className="flex  gap-5 w-full">
                            <div className="w-1/3">
                                <CodeEditor onSave={handleSaveRecomendations} param='dag' title='dag' language={'python'} code={msg.dag} />

                            </div>
                            <div className="w-1/3">
                                <CodeEditor onSave={handleSaveRecomendations} param='ddl' title='ddl' language={'sql'} code={msg.ddl} />

                            </div>
                            <div className="w-1/3">
                                <ChatPipeline />

                            </div>

                        </div>


                    </div>
                    {i !== messages.length - 1 && <hr className="border-t border-white/10 mt-2 mb-2" />}
                </>

            ))}


        </div >
    );
};
