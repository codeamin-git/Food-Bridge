import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Error from "./Error";
import { GrUpdate } from "react-icons/gr";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Swal from 'sweetalert2';
import Loading from "./Loading";
import { Helmet } from "react-helmet-async";



const form = () => {

    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const [currentFood, setCurrentFood] = useState(null);

    const {
        register,
        reset,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        data.foodQuantity = parseInt(data.foodQuantity);
        const updatedFood = { ...data };

        try {
            await axiosSecure.put(`/update/${currentFood._id}`, updatedFood);
            toast.success('Food Updated Successfully!');
            refetch();
        } catch (error) {
            toast.error('Failed to update food');
        } finally {
            setCurrentFood(null);
        }
    };

    const fetchDonatedFoods = async () => {
        const { data } = await axiosSecure.get(`/manageMyFoods/${user?.email}`);
        return data;
    };

    const { data: myDonatedFoods = [], isLoading, isError, error, refetch } = useQuery({
        queryFn: fetchDonatedFoods,
        queryKey: ['myDonatedFoods', user?.email],
        enabled: !!user?.email,
    });

    const handleDelete = async (id) => {
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
                    await axiosSecure.delete(`/food/${id}`);
                    toast.success('Deleted Successfully');
                    refetch();
                } catch (err) {
                    toast.error('Failed to delete food');
                }
            }
        });
    };

    const handleUpdateClick = (food) => {
        reset(food);
        setCurrentFood(food);
        document.getElementById('update_modal').showModal();
    };

    if (isLoading) return <Loading />;
    if (isError || error) return <Error />;

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                        {/* food name & food image */}
                        <div className="flex flex-col md:flex-row gap-4 w-full">
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text font-medium">Food Name</span>
                                </label>
                                <input
                                    {...register("foodName", { required: true })}
                                    type="text" placeholder="food name" className="input input-bordered" />
                                {errors.foodName && <span className="text-red-500">This field is required</span>}
                            </div>
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text font-medium">Food Image</span>
                                </label>
                                <input
                                    {...register("foodImage", { required: true })}
                                    type="text" placeholder="food image URL" className="input input-bordered" />
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
                                    type="number" placeholder="food amount" className="input input-bordered" />
                                {errors.foodQuantity && <span className="text-red-500">This field is required</span>}
                            </div>
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text font-medium">Pickup Location</span>
                                </label>
                                <input
                                    {...register("pickupLocation", { required: true })}
                                    type="text" placeholder="type pickup location" className="input input-bordered" />
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
                                    type="date" placeholder="expired date" className="input input-bordered" />
                                {errors.expiredDate && <span className="text-red-500">This field is required</span>}
                            </div>
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text font-medium">Additional Notes</span>
                                </label>
                                <input
                                    {...register("additionalNotes", { required: true })}
                                    type="text" placeholder="type additional notes here" className="input input-bordered" />
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
                                    {...register("donatorName", { required: true })}
                                    type="text" placeholder="donator name" className="input input-bordered" />
                            </div>
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text font-medium">Donator Image</span>
                                </label>
                                <input
                                    {...register("donatorImage", { required: true })}
                                    type="text" placeholder="donator image URL" className="input input-bordered" />
                            </div>
                        </div>

                        {/* donator email & food status */}
                        <div className="flex flex-col md:flex-row gap-4 w-full">
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text font-medium">Donator Email</span>
                                </label>
                                <input
                                    {...register("donatorEmail", { required: true })}
                                    type="text" placeholder="donator email" className="input input-bordered" />
                            </div>
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text font-medium">Food Status</span>
                                </label>
                                <input
                                    {...register("foodStatus")}
                                    type="text" placeholder="food status" className="input input-bordered" />
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="form-control mt-6">
                            <input type="submit" value="Update" className="btn btn-success" />
                        </div>
                    </form>
        </div>
    );
};

export default form;