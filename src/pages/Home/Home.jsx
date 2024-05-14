import { useEffect, useState } from "react";
import Banner from "./Banner/Banner";
import FeaturedFoods from "./FeaturedFoods";
import axios from "axios";
import ImpactSection from "./ImpactSection";
import EventsSection from "./EventsSection";
import { Helmet } from "react-helmet-async"
import Marquee from 'react-fast-marquee';
import { FaUtensils } from 'react-icons/fa';

const Home = () => {
    const [foods, setFoods] = useState([])
    useEffect(() => {
        const getData = async () => {
            const { data } = await axios(`${import.meta.env.VITE_API_URL}/featured`);
            setFoods(data)
        }
        getData()
    }, [foods])
    return (
        <div className="">
            <Helmet>
                <title>Food Bridge | Home</title>
            </Helmet>
            <div className="bg-red-200 p-4">
                <Marquee speed={150} gradient={false}>
                    <div className="flex items-center justify-center space-x-4">
                        <FaUtensils className="text-3xl text-ef5350" />
                        <h1 className="text-center text-xl font-bold">
                            <span className="text-white">Food Bridge:</span> Nourishing Communities, One Meal at a Time
                        </h1>
                        <FaUtensils className="text-3xl text-ef5350" />
                    </div>
                </Marquee>
            </div>

            <Banner></Banner>
            <div>
                <h2 className="text-center my-6 text-2xl underline">Our Featured Section: Highlighted Foods in Abundance</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 mt-6 mx-auto gap-6">
                    {
                        foods.map(food =>
                            <FeaturedFoods key={food._id}
                                food={food}
                            ></FeaturedFoods>
                        )
                    }
                </div>
            </div>
            <ImpactSection></ImpactSection>
            <EventsSection></EventsSection>
        </div>
    );
};

export default Home;