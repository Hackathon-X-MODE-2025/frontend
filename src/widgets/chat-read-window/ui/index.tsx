import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useGetChatQuery, usePatchRecomendationsChatMutation } from "../../../entities/session/session-api";
import { CodeEditor } from "../../../features/chat-code-editor/ui";
import { ChatPipeline } from "../../../features/chat-pipeline/ui";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

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
        { page: 0, id: id },
        { pollingInterval: 1000 }
    );

    const [patchRecomendationTrigger] = usePatchRecomendationsChatMutation()

    useEffect(() => {
        if (!chatSuccess || !chatData?.content) return;

        // setMessages((prev) => {
        //     const existingIds = new Set(prev.map((m) => m.id));
        //     const uniqueNew = chatData.content.filter((m) => !existingIds.has(m.id));

        //     if (page === 0) {
        //         return [...prev, ...uniqueNew];
        //     } else {
        //         return [...uniqueNew, ...prev];
        //     }
        // });

        setMessages(chatData.content)
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
            .unwrap()
            .then(() => {
                toast.success(`${param} отредактирован!`)
            })
            .catch(() => {
                toast.error('Системная ошибка!')
                setTimeout(() => {
                    location.reload()
                }, 2000)
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
                        <div className="flex flex-col  gap-5 w-full">
                            <div className="w-full flex gap-2">
                                <div className="w-6/12 2xl:block ">
                                    <CodeEditor onSave={handleSaveRecomendations} param='dag' title='dag' language={'python'} code={msg.dag} />
                                </div>
                                <div className="w-6/12 2xl:block ">
                                    <CodeEditor onSave={handleSaveRecomendations} param='ddl' title='ddl' language={'sql'} isTabs={true} code={msg.ddl} />
                                </div>
                            </div>


                            <div className="w-full">
                                <ChatPipeline nodes={msg.pipelineVisualization.nodes} edges={msg.pipelineVisualization.edges} />
                            </div>

                        </div>


                    </div>
                    {i !== messages.length - 1 && <hr className="border-t border-white/10 mt-2 mb-2" />}
                </>

            ))}

        </div >
    );
};
