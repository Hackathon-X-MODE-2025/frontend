import Editor from "@monaco-editor/react"
import { useEffect, useState } from "react";
import { PencilIco } from "../../../shared/svg_components/pencil-ico";
import { SaveIco } from "../../../shared/svg_components/save-ico";
import { CrossIco } from "../../../shared/svg_components/cross-ico";

export const CodeEditor: React.FC<any> = ({ code, language, onSave, title, param, isTabs = false }) => {

    const [value, setValue] = useState(isTabs ? '' : code);
    const [isEditing, setIsEditing] = useState(false);

    const [tabIndex, setTabIndex] = useState(0)

    const handleSave = () => {
        if (isTabs) {
            const result = [...code];
            result[tabIndex] = { ddl: value };

            if (onSave) onSave(result, param)
        } else {
            if (onSave) onSave(value, param);
        }
        setIsEditing(false);
    };

    const handleCancel = () => {
        if (isTabs) {
            setValue(code[tabIndex]?.ddl);
        } else {
            setValue(code)
        }
        setIsEditing(false);
    };

    useEffect(() => {
        if (!isTabs) return
        setValue(code[tabIndex]?.ddl || '')
    }, [tabIndex])


    // const normalizeIndent = (code: string, tabSize = 1) => {
    //     return code
    //         .replace(/\t/g, " ".repeat(tabSize))
    //         .replace(/ {2,}/g, " ");
    // };
    return (
        <div className={`h-[38vh] 2xl:h-[40vh] border border-gray-700 ${isTabs && 'border-t-0'} rounded-xl overflow-hidden flex flex-col`}>
            {!isTabs && <div className="flex justify-between items-center bg-[#2c2c3a] px-4 py-2 text-white">

                {!isTabs && <span className="font-raleway text-start">{title}</span>}
                <div className="flex gap-3">
                    {!isEditing ? (
                        <button onClick={() => setIsEditing(true)} className="hover:text-blue-400">
                            <PencilIco />
                        </button>
                    ) : (
                        <>
                            <button onClick={handleSave} className="hover:text-green-400 cursor-pointer">
                                <SaveIco />
                            </button>
                            <button onClick={handleCancel} className="hover:text-red-400 cursor-pointer">
                                <CrossIco />
                            </button>
                        </>
                    )}
                </div>
            </div>}

            {isTabs && (
                <div className="flex gap-2 overflow-x-auto shrink-0">
                    {
                        isTabs && code?.length > 0 && (
                            code.map((el: any, index: any) => (
                                <TabsEnhacer
                                    setTabIndex={setTabIndex}
                                    index={index}
                                    el={el}
                                    tabIndex={tabIndex}
                                    isEditing={isEditing}
                                    handleCancel={handleCancel}
                                    handleSave={handleSave}
                                    setIsEditing={setIsEditing}
                                />
                            ))
                        )
                    }
                </div>
            )}


            {/* Сам редактор */}
            <Editor
                height="100%"
                language={language}
                value={value}
                theme="vs-dark"
                onChange={(val) => setValue(val ?? "")}
                options={{
                    minimap: { enabled: false },
                    fontSize: 12,
                    lineNumbers: "on",
                    tabSize: 2,
                    insertSpaces: true,
                    detectIndentation: false,
                    readOnly: !isEditing,
                }}
            />
        </div>
    );
}

export const TabsEnhacer: React.FC<any> = ({ setTabIndex, index, isEditing, handleCancel, handleSave, setIsEditing, tabIndex, el }) => {
    return (
        <div onClick={() => setTabIndex(index)} className="bg-secondary rounded-tr-[10px] rounded-tl-[10px] cursor-pointer text-white px-4 py-2 flex gap-2 items-center">
            <div className="text-xsmall">
                {el?.table_name}
            </div>
            {index === tabIndex && <div className="flex gap-3">
                {!isEditing ? (
                    <button onClick={() => setIsEditing(true)} className="hover:text-blue-400">
                        <PencilIco />
                    </button>
                ) : (
                    <>
                        <button onClick={handleSave} className="hover:text-green-400 cursor-pointer">
                            <SaveIco />
                        </button>
                        <button onClick={handleCancel} className="hover:text-red-400 cursor-pointer">
                            <CrossIco />
                        </button>
                    </>
                )}
            </div>}

        </div>
    )
}
