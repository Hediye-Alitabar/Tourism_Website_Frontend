import { Link } from "react-router-dom";
import { GET } from '../../utils/httpClient'
import './HomePage.css';

import { useEffect, useState } from "react";

export default function HomePage() {
    const [places, setPlaces] = useState([]);

    const loadPlaces = async () => {
        // const data = await fetch("http://localhost:3000/places").then((response) =>
        //     response.json()
        // );
        const data = await GET('/places');
        setPlaces(data);
    };

    useEffect(() => {
        loadPlaces();
    }, []);

    return <div>
        <div className="search_container">
            <input type="text" placeholder="Search..." className="search_input" />
            <button >Search</button>
            <select name="filter" id="filter">
                <option value="country">Filter BY Country</option>
            </select>
        </div>
        <Link to="/login">login</Link>
        <div className="container">
            {places?.map((t) => (
                <div key={t.id} className="place_box">
                    {t.name} {t.country} {t.description}
                </div>
            ))}
        </div>
    </div>

}