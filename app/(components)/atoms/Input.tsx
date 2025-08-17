interface InputProps {
    type?: "text" | "email" | "password" | "date" | "datetime-local" | "number";
    placeholder?: string;
    value?: string;
    onChange: (value: string) => void;
    required?: boolean;
    className?: string;
}

export const Input = ({
    type = "text",
    placeholder,
    value,
    onChange,
    required = false,
    className = "",
}: InputProps) => {
    return (
        <input 
        type={type} 
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${className}`}
        />
    )
}