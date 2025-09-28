import Editor from "@monaco-editor/react"

export const CodeEditor: React.FC<any> = ({ code, language, onChange }) => {
    return (
        <div className="h-[50vh] border border-gray-700 rounded-xl overflow-hidden">
            <Editor
                height="100%"
                language={language}
                value={code}
                theme="vs-dark"
                onChange={onChange}
                options={{
                    minimap: { enabled: false },
                    fontSize: 14,
                    lineNumbers: "on",
                }}
            />
        </div>
    )
}
