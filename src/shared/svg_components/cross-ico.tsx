export const CrossIco = ({ className = "" }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="15"
        height="15"
        viewBox="0 0 15 15"
        fill="none"
        className={`transition-all duration-500 ease-in-out opacity-70 group-hover:opacity-100 group-hover:rotate-[180deg] ${className}`}
    >
        <line
            x1="0.49687"
            y1="0.453569"
            x2="14.6523"
            y2="14.609"
            stroke="white"
            strokeWidth="0.979993"
        />
        <line
            x1="0.348833"
            y1="14.6091"
            x2="14.5043"
            y2="0.453633"
            stroke="white"
            strokeWidth="0.979993"
        />
    </svg>
);
