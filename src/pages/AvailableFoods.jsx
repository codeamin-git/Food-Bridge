import React, { useState } from "react";
import { Link } from "react-router-dom";
// import { useQuery } from "react-query";
import axios from "axios";
import { Card, Badge } from "daisyui";

const AvailableFoods = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const { data: foods, isLoading } = useQuery("availableFoods", async () => {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/availableFoods`);
        return response.data;
    });

    const filteredFoods = foods?.filter(food =>
        food.foodName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const sortedFoods = filteredFoods?.sort((a, b) => new Date(a.expiredDate) - new Date(b.expiredDate));

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Search Section */}
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Search by food name..."
                    className="input input-bordered"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            
            {/* Foods Section */}
            {sortedFoods?.map((food) => (
                <Card key={food.id} className="shadow-lg">
                    <div className="p-4">
                        <img src={food.foodImage} alt={food.foodName} className="w-full h-40 object-cover mb-4" />
                        <h2 className="text-lg font-semibold mb-2">{food.foodName}</h2>
                        <div className="flex items-center mb-2">
                            <img src={food.donator.image} alt={food.donator.name} className="w-8 h-8 rounded-full mr-2" />
                            <span>{food.donator.name}</span>
                        </div>
                        <p className="mb-2">Quantity: {food.foodQuantity}</p>
                        <p className="mb-2">Pickup Location: {food.pickupLocation}</p>
                        <p className="mb-2">Expired Date: {food.expiredDate}</p>
                        <p className="mb-2">Additional Notes: {food.additionalNotes}</p>
                        <Link to={`/food-details/${food.id}`} className="btn btn-primary">View Details</Link>
                    </div>
                </Card>
            ))}
        </div>
    );
};

export default AvailableFoods;
