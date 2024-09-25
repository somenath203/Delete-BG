import { CgSpinner } from "react-icons/cg";

const Loader = () => {
    return (
      <>
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-20">
            
            <CgSpinner size={100} className="text-violet-500 transition-all animate-spin duration-1000" />
        
        </div>
      </>
    );
  };
  
  export default Loader;