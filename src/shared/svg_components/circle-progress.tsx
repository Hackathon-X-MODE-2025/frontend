export const CircleProgress: React.FC<{ progress: number }> = ({ progress }) => {
    const radius = 20;
    const stroke = 4;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (progress / 100) * circumference;

    return (
        <svg className="w-12 h-12">
            <circle
                cx="24"
                cy="24"
                r={radius}
                stroke="gray"
                strokeWidth={stroke}
                fill="none"
                className="opacity-20"
            />
            <circle
                cx="24"
                cy="24"
                r={radius}
                stroke="url(#gradient)"
                strokeWidth={stroke}
                fill="none"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                strokeLinecap="round"
                className="transition-all duration-300"
            />
            <text
                x="50%"
                y="50%"
                dominantBaseline="middle"
                textAnchor="middle"
                className="text-xs fill-white"
            >
                {progress}%
            </text>
            <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#6a5acd" />
                    <stop offset="100%" stopColor="#00bfff" />
                </linearGradient>
            </defs>
        </svg>
    );
};
