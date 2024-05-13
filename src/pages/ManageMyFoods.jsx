import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Error from "./Error";
import { GrUpdate } from "react-icons/gr";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";

const ManageMyFoods = () => {
    const axiosSecure = useAxiosSecure()
    const { user } = useAuth()

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const onSubmit = async (data, food) =>{
        data.foodQuantity = parseInt(data.foodQuantity)
        const updatedFood = {
            ...data 
        }
        try {
            const response = await axios.put(`${import.meta.env.VITE_API_URL}/update/${food._id}`, updatedFood , {
                withCredentials: true
            } 
            )
            console.log(response.data);
            toast.success('Updated This Food!')
            refetch()
           
        }
        catch(err){
            console.log(err);
        }
    }

    const fetchDonatedFoods = async () => {
        const response = await axiosSecure.get(`/manageMyFoods/${user?.email}`);
        return response.data;
    };

    const { data: myDonatedFoods, isLoading, isError, refetch } = useQuery({
        queryFn: fetchDonatedFoods, 
        queryKey: ['myDonatedFoods', user?.email],
        enabled: !!user?.email,
    });

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <Error></Error>;

    return (
        <div>
            <table className="table">
                <thead>
                    <tr>
                        <th>Food Name</th>
                        <th>Quantity</th>
                        <th>Expiration Date</th>
                        <th>Update/Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {myDonatedFoods.map((food) => (
                        <tr key={food._id}>
                            <td className="flex items-center gap-1"><img src={food.foodImage} alt="" className="w-12 rounded-lg"/>{food.foodName}</td>
                            <td>{food.foodQuantity}</td>
                            <td>{food.expiredDate}</td>
                            <td >
                               
                               
               <div className="flex items-center gap-4">
                 {/* Update Modal */}
               <div>
                    {/* Open the modal using document.getElementById('ID').showModal() method */}
                    <button className="" onClick={() => document.getElementById('my_modal_5').showModal()}>
                         <GrUpdate className="text-green-500 text-base"/>
                    </button>
                    <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                        <div className="modal-box">
                            {/* modal form */}
                            <form onSubmit={handleSubmit((data) =>onSubmit(data, food, refetch))} className="card-body">
                {/* food name & food image */}
                <div className="flex flex-col md:flex-row gap-4 w-full">
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text font-medium">Food Name</span>
                        </label>
                        <input defaultValue={food.foodName}
                            {...register("foodName", { required: true })}
                            type="text" placeholder="food name" className="input input-bordered" required />
                        {errors.foodName && <span className="text-red-500">This field is required</span>}
                    </div>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text font-medium">Food Image</span>
                        </label>
                        <input defaultValue={food.foodImage}
                            {...register("foodImage", { required: true })}
                            type="text" placeholder="food image URL" className="input input-bordered" required />
                        {errors.foodImage && <span className="text-red-500">This field is required</span>}
                    </div>
                </div>

                {/* food quantity & pickup location */}
                <div className="flex flex-col md:flex-row gap-4 w-full">
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text font-medium">Food Quantity</span>
                        </label>
                        <input defaultValue={food.foodQuantity}
                            {...register("foodQuantity", { required: true, min: 1 })}
                            type="number" placeholder="food amount" className="input input-bordered" required />
                        {errors.foodQuantity && <span className="text-red-500">This field is required</span>}
                    </div>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text font-medium">Pickup Location</span>
                        </label>
                        <input defaultValue={food.pickupLocation}
                            {...register("pickupLocation", { required: true })}
                            type="text" placeholder="type pickup location" className="input input-bordered" required />
                        {errors.pickupLocation && <span className="text-red-500">This field is required</span>}
                    </div>
                </div>

                {/* expired date & additional notes */}
                <div className="flex flex-col md:flex-row gap-4 w-full">
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text font-medium">Expired Date</span>
                        </label>
                        <input defaultValue={food.expiredDate}
                            {...register("expiredDate", { required: true })}
                            type="date" placeholder="food name" className="input input-bordered" required />
                        {errors.expiredDate && <span className="text-red-500">This field is required</span>}
                    </div>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text font-medium">Additional Notes</span>
                        </label>
                        <input
                        defaultValue={food.additionalNotes}
                            {...register("additionalNotes", { required: true })}
                            type="text" placeholder="type additional notes here" className="input input-bordered" required />
                        {errors.additionalNotes && <span className="text-red-500">This field is required</span>}
                    </div>
                </div>

                {/* donator name, image */}
                <div className="flex flex-col md:flex-row gap-4 w-full">
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text font-medium">Donator Name</span>
                        </label>
                        <input defaultValue={food.donatorName}
                            {...register("donatorName")}
                            type="text" placeholder="food name" className="input input-bordered" />
                             
                    
                    </div>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text font-medium">Donator Image</span>
                        </label>
                        <input
                        defaultValue={food.donatorImage}
                            {...register("donatorImage", { required: true })}
                            type="text" placeholder="" className="input input-bordered"/>
                            
                    
                    </div>
                </div>

                {/* donator email & food status */}
                <div className="flex flex-col md:flex-row gap-4 w-full">
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text font-medium">Donator Email</span>
                        </label>
                        <input defaultValue={food.donatorEmail}
                            {...register("donatorEmail")}
                            type="text" placeholder="food name" className="input input-bordered"/>
                             
                       
                    </div>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text font-medium">Food Status</span>
                        </label>
                        <input
                        defaultValue={food?.foodStatus || 'available'} readOnly
                            {...register("foodStatus")}
                            type="text" placeholder="" className="input input-bordered" />
                             
                        
                    </div>
                </div>


                <div className="form-control mt-6">
                    <input type="submit" value="Update" 
                    className="btn btn-success " />
                </div>
            </form>
                            <div className="flex justify-center">
                                <form method="dialog">
                                    {/* if there is a button in form, it will close the modal */}
                                    <button className="btn btn-error">Close</button>
                                </form>
                            </div>
                        </div>


                    </dialog>
                </div>

               {/* delete button */}
                <div>
                <button  className="" ><RiDeleteBin6Line className="text-red-500 text-lg"/></button>
                </div>
               </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ManageMyFoods;
