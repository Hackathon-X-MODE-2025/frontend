import Editor from "@monaco-editor/react"
import { useEffect, useState } from "react";
import { PencilIco } from "../../../shared/svg_components/pencil-ico";

export const CodeEditor: React.FC<any> = ({ code, language, onSave, title, param, isTabs = false }) => {

    const [value, setValue] = useState(isTabs ? '' : code);
    const [isEditing, setIsEditing] = useState(false);

    const [tabIndex, setTabIndex] = useState(0)

    const handleSave = () => {
        if (isTabs) {
            const result = [...code];
            result[tabIndex] = { ddl: value };

            console.log(result);
            console.log(value, 'aaa');
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


    console.log(code, 'DATA BACK')

    // const normalizeIndent = (code: string, tabSize = 1) => {
    //     return code
    //         .replace(/\t/g, " ".repeat(tabSize))
    //         .replace(/ {2,}/g, " ");
    // };
    return (
        <div className="h-[38vh] 2xl:h-[40vh] border border-gray-700 rounded-xl overflow-hidden flex flex-col">
            <div className="flex justify-between items-center bg-[#2c2c3a] px-4 py-2 text-white">
                {
                    isTabs && <div className="max-w-[200px] flex gap-2">
                        {
                            isTabs && code?.length > 0 && (
                                code.map((_: any, index: any) => (
                                    <div onClick={() => setTabIndex(index)} className="cursor-pointer text-white ">
                                        ddl {index}
                                    </div>
                                ))
                            )
                        }
                    </div>
                }
                {!isTabs && <span className="font-raleway text-start">{title}</span>}
                <div className="flex gap-3">
                    {!isEditing ? (
                        <button onClick={() => setIsEditing(true)} className="hover:text-blue-400">
                            <PencilIco />
                        </button>
                    ) : (
                        <>
                            <button onClick={handleSave} className="hover:text-green-400">
                                Сохранить
                            </button>
                            <button onClick={handleCancel} className="hover:text-red-400">
                                Отменить
                            </button>
                        </>
                    )}
                </div>
            </div>

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
                    readOnly: !isEditing, // 🔥 главный момент
                }}
            />
        </div>
    );
}
