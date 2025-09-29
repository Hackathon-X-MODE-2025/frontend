import Editor from "@monaco-editor/react"
import { useState } from "react";
import { PencilIco } from "../../../shared/svg_components/pencil-ico";

export const CodeEditor: React.FC<any> = ({ code, language, onSave, title, param }) => {

    const [value, setValue] = useState(code);
    const [isEditing, setIsEditing] = useState(false);

    const handleSave = () => {
        setIsEditing(false);
        if (onSave) onSave(value, param);
    };

    const handleCancel = () => {
        setValue(code); // откат
        setIsEditing(false);
    };


    const normalizeIndent = (code: string, tabSize = 1) => {
        return code
            .replace(/\t/g, " ".repeat(tabSize))
            .replace(/ {2,}/g, " ");
    };
    return (
        <div className="h-[80vh] border border-gray-700 rounded-xl overflow-hidden flex flex-col">
            {/* Верхняя панель */}
            <div className="flex justify-between items-center bg-[#2c2c3a] px-4 py-2 text-white">
                <span className="font-raleway">{title}</span>
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
                value={normalizeIndent(value)}
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
