import {IoClose} from "react-icons/io5"

const CloseButton = ({onClose}) => {
    return <div className="absolute block right-0 top-0 z-10 m-2 p-1 rounded-lg hover:bg-red-500 transition duration-300 hover:text-white transition duration-300">
        <IoClose size={30}/>
    </div>
}

export default CloseButton;