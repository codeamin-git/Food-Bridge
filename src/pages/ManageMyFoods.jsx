import { useMutation, useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Error from "./Error";
import { GrUpdate } from "react-icons/gr";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Swal from 'sweetalert2'
import Loading from "./Loading";
import { Helmet } from "react-helmet-async";

const ManageMyFoods = () => {
    const axiosSecure = useAxiosSecure()
    const { user } = useAuth()

    const {
        register,
        setValue,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const {mutateAsync} = useMutation({
        mutationFn: async ({updatedFood, id})=>{
            const {data} = await axiosSecure.put(`/update/${id}`, updatedFood)
            return data
        },
        onSuccess: ()=>{
            toast.success('Food Updated Successfully!')
            refetch()
        }
    })

    const onSubmit = async (data, id) =>{
        data.foodQuantity = parseInt(data.foodQuantity)
        
        const updatedFood = {...data}
        console.log(updatedFood);
                await mutateAsync({ updatedFood, id});
                refetch()
    }

    const fetchDonatedFoods = async () => {
        const {data} = await axiosSecure.get(`/manageMyFoods/${user?.email}`);
        return data;
    };

    const { data: myDonatedFoods = [], isLoading, isError, error, refetch } = useQuery({
        queryFn: () => fetchDonatedFoods(),
        queryKey: ['myDonatedFoods', user?.email],
        enabled: !!user?.email,
    });




    const handleDelete = async id => {
        // Show SweetAlert confirmation dialog
        Swal.fire({
            title: 'Are you sure?',
            text: 'You will not be able to recover this food item!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const { data } = await axiosSecure.delete(`/food/${id}`);
                    console.log(data);
                    toast.success('Deleted Successfully');
                    refetch();
                } catch (err) {
                    console.log(err.message);
                    toast.error(err.message);
                }
            }
        });
    };

    if (isLoading) return <Loading></Loading>;
    if (isError || error) return <Error></Error>;

    return (
        <div>
            <Helmet>
                <title>Food Bridge | Manage My Food</title>
            </Helmet>
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
                            <form onSubmit={handleSubmit((data)=>onSubmit(data, food._id))} className="card-body">
                {/* food name & food image */}
                <div className="flex flex-col md:flex-row gap-4 w-full">
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text font-medium">Food Name</span>
                        </label>
                        <input
                            {...register("foodName", { required: true })}
                            type="text" placeholder="food name" className="input input-bordered" required defaultValue={food.foodName} onChange={(e) => setValue("foodName", e.target.value)}/>
                        {errors.foodName && <span className="text-red-500">This field is required</span>}
                    </div>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text font-medium">Food Image</span>
                        </label>
                        <input
                            {...register("foodImage", { required: true })}
                            type="text" placeholder="food image URL" className="input input-bordered" required defaultValue={food.foodImage} onChange={(e) => setValue("foodImage", e.target.value)}/>
                        {errors.foodImage && <span className="text-red-500">This field is required</span>}
                    </div>
                </div>

                {/* food quantity & pickup location */}
                <div className="flex flex-col md:flex-row gap-4 w-full">
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text font-medium">Food Quantity</span>
                        </label>
                        <input
                            {...register("foodQuantity", { required: true, min: 1 })}
                            type="number" placeholder="food amount" className="input input-bordered" required defaultValue={food.foodQuantity} onChange={(e) => setValue("foodQuantity", e.target.value)}/>
                        {errors.foodQuantity && <span className="text-red-500">This field is required</span>}
                    </div>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text font-medium">Pickup Location</span>
                        </label>
                        <input
                            {...register("pickupLocation", { required: true })}
                            type="text" placeholder="type pickup location" className="input input-bordered" required defaultValue={food.pickupLocation} onChange={(e) => setValue("pickupLocation", e.target.value)}/>
                        {errors.pickupLocation && <span className="text-red-500">This field is required</span>}
                    </div>
                </div>

                {/* expired date & additional notes */}
                <div className="flex flex-col md:flex-row gap-4 w-full">
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text font-medium">Expired Date</span>
                        </label>
                        <input
                            {...register("expiredDate", { required: true })}
                            type="date" placeholder="food name" className="input input-bordered" required defaultValue={food.expiredDate} onChange={(e) => setValue("expiredDate", e.target.value)}/>
                        {errors.expiredDate && <span className="text-red-500">This field is required</span>}
                    </div>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text font-medium">Additional Notes</span>
                        </label>
                        <input
                            {...register("additionalNotes", { required: true })}
                            type="text" placeholder="type additional notes here" className="input input-bordered" required defaultValue={food.additionalNotes} onChange={(e) => setValue("additionalNotes", e.target.value)}/>
                        {errors.additionalNotes && <span className="text-red-500">This field is required</span>}
                    </div>
                </div>

                {/* donator name, image */}
                <div className="flex flex-col md:flex-row gap-4 w-full">
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text font-medium">Donator Name</span>
                        </label>
                        <input 
                            {...register("donatorName",{required: true})}
                            type="text" placeholder="food name" className="input input-bordered" required defaultValue={food.donatorName} onChange={(e) => setValue("donatorName", e.target.value)}/>
                             
                    
                    </div>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text font-medium">Donator Image</span>
                        </label>
                        <input
                        
                            {...register("donatorImage", { required: true })}
                            type="text" placeholder="" className="input input-bordered" defaultValue={food.donatorImage} required onChange={(e) => setValue("donatorImage", e.target.value)}/>
                            
                    
                    </div>
                </div>

                {/* donator email & food status */}
                <div className="flex flex-col md:flex-row gap-4 w-full">
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text font-medium">Donator Email</span>
                        </label>
                        <input 
                            {...register("donatorEmail", {required: true})}
                            type="text" placeholder="food name" className="input input-bordered" defaultValue={food.donatorEmail} required onChange={(e) => setValue("donatorEmail", e.target.value)}/>
                             
                       
                    </div>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text font-medium">Food Status</span>
                        </label>
                        <input
                            {...register("foodStatus")}
                            type="text" placeholder="" className="input input-bordered" defaultValue={food?.foodStatus || 'available'} onChange={(e) => setValue("foodStatus", e.target.value)}/>
                             
                        
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
                <button onClick={()=>handleDelete(food._id)} className="" ><RiDeleteBin6Line className="text-red-500 text-lg"/></button>
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