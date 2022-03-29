import { HiCheckCircle } from "react-icons/hi";

const CheckCircle = ({onToggle, isDone}) => {
    const toggleDoneHandler = () => {
        onToggle(!isDone)
    }

    return (  
        <span
        className="group w-6 cursor-pointer flex items-center pt-1"
        onClick={toggleDoneHandler}>
        <HiCheckCircle
            className={`${isDone
                ? "text-green-400 group-hover:text-gray-600 text-center"
                : "text-gray-400 group-hover:text-green-600"
                }`}
        />
    </span>
    );
}
 
export default CheckCircle;