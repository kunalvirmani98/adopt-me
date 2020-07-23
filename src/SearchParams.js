import React, { useState, useEffect, useContext } from 'react';
import pet, { ANIMALS } from '@frontendmasters/pet';
import Results from './Results';
import useDropdown from './useDropdown';
import ThemeContext from './ThemeContext';

export default function SearchParams(props) {
    const [location, setLocation] = useState("Seattle, WA");
    const [animal, AnimalDropdown, setAnimal] = useDropdown("animal", "dog", ANIMALS);
    const [breeds, setBreeds] = useState([]);
    const [breed, BreedDropdown, setBreed] = useDropdown("breed", "", breeds);
    const [theme, setTheme] = useContext(ThemeContext);

    const [pets, setPets] = useState([]);

    useEffect(() => {
        setBreeds([]);
        setBreed("");

        pet.breeds(animal).then(({ breeds }) => {
            const breedStrings = breeds.map(({ name }) => name);
            setBreeds(breedStrings);
        }, console.error);
    }, [animal, setBreeds, setBreed]);

    async function getPets() {
        const { animals } = await pet.animals({
            location,
            breed,
            type: animal
        });

        setPets(animals || []);

    }

    return (
        <div className="search-params">
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    getPets();
                }}>

                <label htmlFor="location">
                    location
                    <input
                        id="location"
                        value={location}
                        placeholder="location"
                        onChange={(e) => setLocation(e.target.value)} />
                </label>

                <AnimalDropdown />
                <BreedDropdown />

                <label htmlFor="theme">
                    <select
                        id="theme"
                        value={theme}
                        onChange={(e) => setTheme(e.target.value)} >
                        <option value="peru">Peru</option>
                        <option value="darkblue">Dark Blue</option>
                        <option value="mediumorchid">Medium Orchid</option>
                        <option value="chartreuse">Chartreuse</option>
                    </select>
                </label>

                <button style={{ backgroundColor: theme }}>Submit</button>
            </form>

            <Results pets={pets} />
        </div>
    )
}