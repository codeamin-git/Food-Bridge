import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Error from "./Error";
import { Helmet } from "react-helmet-async";
import Loading from "./Loading";

const AvailableFoods = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [showGrid2Cols, setShowGrid2Cols] = useState(false);
    const [sortByExpiredDate, setSortByExpiredDate] = useState(false);

    const { data: foods, isLoading, isError, error, refetch } = useQuery({
        queryFn: () => axios(`${import.meta.env.VITE_API_URL}/availableFoods`),
        queryKey: ['availableFoods']
    });

    const filteredFoods = foods?.data?.filter(food =>
        food.foodName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const sortedFoods = filteredFoods?.sort((a, b) => {
        if (sortByExpiredDate) {
            return new Date(a.expiredDate) - new Date(b.expiredDate);
        }
        return 0; // No sorting
    });

    const handleToggleGrid = () => {
        setShowGrid2Cols(prev => !prev);
    };

    const handleSortByExpiredDate = () => {
        setSortByExpiredDate(true);
    };

    if (isLoading) return <Loading></Loading>
    if (isError) return <Error />;

    return (
        <div className="mt-6">
            <Helmet>
                <title>Food Bridge | Available Foods</title>
            </Helmet>
            <div className="flex flex-col md:flex-row items-center mb-4 justify-center gap-2">
                <input
                    type="text"
                    placeholder="Search by food name..."
                    className="input input-bordered mr-2"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button className="btn btn-outline mr-2" onClick={handleToggleGrid}>
                    {showGrid2Cols ? "Show 3 Columns" : "Show 2 Columns"}
                </button>
                <button className="btn btn-outline" onClick={handleSortByExpiredDate}>
                    Sort by Expired Date
                </button>
            </div>
            <div className={`grid ${showGrid2Cols ? 'grid-cols-2' : 'grid-cols-1 md:grid-cols-3'} gap-4`}>
                {sortedFoods?.map((food) => (
                    <div key={food._id} className="card card-compact bg-base-100 shadow-xl">
                        <div className="p-4">
                            <img src={food.foodImage} alt={food.foodName} className="w-full h-40 object-cover mb-4 rounded-xl" />
                            <h2 className="text-lg font-semibold mb-2">{food.foodName}</h2>
                            <div className="flex items-center mb-2">
                                <img src={food.donatorImage} alt={food.donatorName} className="w-8 h-8 rounded-full mr-2" />
                                <span>{food.donatorName}</span>
                            </div>
                            <p className="mb-2">Quantity: {food.foodQuantity}</p>
                            <p className="mb-2">Pickup Location: {food.pickupLocation}</p>
                            <p className="mb-2">Expired Date: {food.expiredDate}</p>
                            <p className="mb-2">Additional Notes: {food.additionalNotes}</p>
                            <Link to={`/food/${food._id}`} className="btn btn-accent">View Details</Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AvailableFoods;
