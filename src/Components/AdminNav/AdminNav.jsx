import { useNavigate } from "react-router-dom";

const AdminNav = ()=>{
    const navigate=useNavigate()


   return( <nav className="">
    <div className="justify-center m-2 mx-auto items-center mt-6 p-2 w-[90%]  flex gap-20 bg-gray-200 rounded-[2rem] shadow-2xl">

        <button className="justify-center m-1 py-1.5 px-10 border border-transparent hover:text-black rounded-md shadow-sm text-base font-medium text-white bg-gray-800 hover:bg-white focus:outline-none focus:ring-2 focus:ring-offset-2" 
                onClick={()=>navigate('/admindashboard/dataset')}>
                Dataset
        </button>
        <button className="justify-center m-1 py-1.5 px-10 border border-transparent hover:text-black rounded-md shadow-sm text-base font-medium text-white bg-gray-800 hover:bg-white focus:outline-none focus:ring-2 focus:ring-offset-2" 
                onClick={()=>navigate('/admindashboard/settings')}>
                AdminSettings
        </button>
        <button className="justify-center m-1 py-1.5 px-10 border border-transparent hover:text-black rounded-md shadow-sm text-base font-medium text-white bg-gray-800 hover:bg-white focus:outline-none focus:ring-2 focus:ring-offset-2" 
                onClick={()=>navigate('/admindashboard')}>
                Statistics
        </button>
        <button className="justify-center m-1 py-1.5 px-10 border border-transparent hover:text-black rounded-md shadow-sm text-base font-medium text-white bg-gray-800 hover:bg-white focus:outline-none focus:ring-2 focus:ring-offset-2" 
                onClick={()=>navigate('/admindashboard/users')}>
                Users
        </button>
    </div>
    </nav>)
}
export default AdminNav;