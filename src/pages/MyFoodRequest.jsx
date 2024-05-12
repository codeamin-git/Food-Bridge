import { useEffect, useState } from 'react';
import useAuth from "../../hooks/useAuth";
import axios from 'axios';

const MyFoodRequest = () => {
    const { user } = useAuth();
    const [requestedFoods, setRequestedFoods] = useState([]);

    useEffect(() => {

        const fetchRequestedFoods = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/myFoodReq/${user?.email}`);
                setRequestedFoods(response.data);
            } catch (error) {
                console.error('Error fetching requested foods:', error);
            }
        };

        fetchRequestedFoods();
    }, [user]);

    return (
        <div className="overflow-x-auto">
            <table className="table">
                {/* head */}
                <thead>
                    <tr>
                        <th></th>
                        <th>Donor Name</th>
                        <th>Pickup Location</th>
                        <th>Expire Date</th>
                        <th>Request Date</th>
                        <th>Your Donation Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Render rows dynamically */}
                    {requestedFoods.map((food, index) => (
                        <tr key={index} className="hover">
                            <th>{index + 1}</th>
                            <td>{food.donatorName}</td>
                            <td>{food.pickupLocation}</td>
                            <td>{food.expiredDate}</td>
                            <td>{food.requestDate}</td>
                            <td>{food.foodQuantity}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default MyFoodRequest;
