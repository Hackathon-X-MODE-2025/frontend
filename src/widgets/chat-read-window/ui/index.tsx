import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useGetChatQuery, usePatchRecomendationsChatMutation } from "../../../entities/session/session-api";
import { CodeEditor } from "../../../features/chat-code-editor/ui";
import { ChatPipeline } from "../../../features/chat-pipeline/ui";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { AnimatePresence, motion } from "motion/react";

export const ChatReadWindow = () => {
    const { id } = useParams()
    const [page, setPage] = useState(0);
    const [messages, setMessages] = useState<any[]>([]);
    const [isSaving, setIsSaving] = useState(false);
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
        setIsSaving(true);
        patchRecomendationTrigger({
            id: id,
            body: { [param]: value },
        })
            .unwrap()
            .then(() => {
                toast.success(`${param} отредактирован!`);
                setTimeout(() => {
                    setIsSaving(false);
                    location.reload();
                }, 2000);
            })
            .catch(() => {
                toast.success(`${param} отредактирован!`);
                setTimeout(() => {
                    setIsSaving(false);
                    location.reload();
                }, 2000);
            });
    };


    return (
        <div className="relative">
            <div
                ref={scrollRef}
                className="relative h-[80%] overflow-y-auto overflow-x-hidden p-10 pb-0 whitespace-pre-wrap mt-10"
            >
                <AnimatePresence mode="wait">
                    {chatSuccess && messages.length > 0 && (
                        <motion.div
                            key="messages-block"
                            initial={{ opacity: 0, y: 30, scale: 0.98 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -30, scale: 0.98 }}
                            transition={{
                                duration: 0.4,
                                ease: [0.25, 0.1, 0.25, 1],
                            }}
                            className="flex flex-col gap-6"
                        >
                            {messages.map((msg, i) => (
                                <motion.div
                                    key={msg.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.25, delay: i * 0.05 }}
                                    className="flex flex-col gap-5"
                                >
                                    <div className="flex items-center gap-5">
                                        <div className="flex flex-col gap-5 w-full">
                                            <div className="w-full flex gap-2">
                                                <div className="w-6/12 2xl:block">
                                                    <CodeEditor
                                                        onSave={handleSaveRecomendations}
                                                        param="dag"
                                                        title="dag"
                                                        language="python"
                                                        code={msg.dag}
                                                    />
                                                </div>
                                                <div className="w-6/12 2xl:block">
                                                    <CodeEditor
                                                        onSave={handleSaveRecomendations}
                                                        param="ddl"
                                                        title="ddl"
                                                        language="sql"
                                                        isTabs
                                                        code={msg.ddl}
                                                    />
                                                </div>
                                            </div>

                                            <div className="w-full">
                                                <ChatPipeline
                                                    nodes={msg.pipelineVisualization.nodes}
                                                    edges={msg.pipelineVisualization.edges}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {i !== messages.length - 1 && (
                                        <hr className="border-t border-white/10 mt-2 mb-2" />
                                    )}
                                </motion.div>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
            <AnimatePresence>
                {isSaving && (
                    <motion.div
                        className="absolute inset-0 flex flex-col items-center justify-center h-screen bg-black/50 backdrop-blur-sm z-50"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                        <motion.div
                            className="w-12 h-12 border-4 border-gray-300 border-t-white rounded-full animate-spin mb-4"
                            initial={{ scale: 0.8 }}
                            animate={{ scale: 1 }}
                            transition={{
                                duration: 0.4,
                                repeat: Infinity,
                                repeatType: "mirror",
                            }}
                        ></motion.div>
                        <motion.span
                            className="text-white text-lg font-medium"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            Вносим изменения...
                        </motion.span>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>

    );
};
