const Button = ({ children }) => {
    return (
        <button className="bg-baseColors text-white px-6 py-3 rounded-full font-bold transition-colors duration-300 drop-shadow-[3px_5px_0px_rgba(0,0,0,1)] w-full">
            {children}
        </button>
    );
};

export default Button;