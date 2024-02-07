import { Link } from "react-router-dom";
import './HomePage.css';
import { useEffect, useState } from "react";
export default function HomePage() {
    const [places, setPlaces] = useState([]);

    const loadTweets = async () => {
        const data = await fetch("http://localhost:3000/places").then((response) =>
            response.json()
        );
        setPlaces(data);
    };

    useEffect(() => {
        loadTweets();
    }, []);

    return <div> 
        <div className="container">
            {places.map((t) => (
                <div key={t.id} className="place_box">
                    {t.name} {t.country} {t.description}
                </div>
            ))}
        </div>
    </div>

}