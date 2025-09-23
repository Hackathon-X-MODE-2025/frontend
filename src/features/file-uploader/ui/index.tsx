import React, { useRef } from "react";
import { useAppSelector } from "../../../app/hooks";
import { useUploadFilesMutation } from "../../../entities/hdfs/hdfs-api";
import { UploadIco } from "../../../shared/svg_components/upload-ico";
import { CircleProgress } from "../../../shared/svg_components/circle-progress";
import { toast } from "react-toastify";


export const FileUploader: React.FC<any> = ({ s3Path, handleRefetch }) => {
    const [uploadFiles] = useUploadFilesMutation();
    const progress = useAppSelector((s) => s.uploadSlice.files);

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;
        const files = Array.from(e.target.files);
        const targetPath = s3Path.split('').slice(1).join('')
        uploadFiles({ files, path: targetPath })
            .unwrap()
            .then(() => {
                handleRefetch()
            })
            .catch(() => {
                toast.error('Не удалось загрузить файлы')
            })

        e.target.value = "";

    };

    const inputRef = useRef<HTMLInputElement | null>(null);

    const triggerFileInput = () => {
        inputRef.current?.click();
    };

    return (
        <div className="mt-[25px] flex items-center border-2 border-secondary rounded-[10px] p-[20px] gap-4">
            {/* Кнопка загрузки */}
            <button
                type="button"
                onClick={triggerFileInput}
                className="flex items-center gap-[16px] bg-secondary hover:bg-[#403F56] transition ease-in-out py-[20px] px-[47px] rounded-[10px] cursor-pointer"
            >
                <UploadIco />
                <span className="text-default">Загрузить файл</span>
            </button>

            {/* Скрытый инпут */}
            <input
                ref={inputRef}
                type="file"
                multiple
                onChange={handleUpload}
                className="hidden"
            />

            <div className="flex flex-col gap-4 ">
                {Object.entries(progress).map(([name, p]) => (
                    <div key={name} className="flex items-center gap-4">
                        <CircleProgress progress={p} />
                        <span className="text-gray-200 text-sm">
                            {name}
                        </span>
                    </div>
                ))}
            </div>

        </div>
    );
}