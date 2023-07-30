import Card from "./components/cards";
import React, { useState } from "react";
import { useEffect } from "react";
import "./App.css";
import { Button, Grid } from "@mui/material";
const frontPageUrl = (count) => {
  const url = `https://pokeapi.co/api/v2/pokemon?limit=${count}`;
  return url;
};

export default function App() {
  const [val, setVal] = useState("");
  const [allPokemon, setAllPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(20);
  // const [url, setUrl] = useState(
  //   "https://pokeapi.co/api/v2/pokemon?limit=${count}"
  // );

  const poke = async () => {
    const resp = await fetch(frontPageUrl(count));
    const res = await resp.json();
    // console.log(res);
    singlePoke(res.results);
    setLoading(false);
  };

  const singlePoke = async (res) => {
    res.map(async (single) => {
      const resp = await fetch(single.url);
      const result = await resp.json();
      const specificData = {
        id: result.id,
        sprites: result.sprites,
        name: result.name,
        types: result.types,
        stats: result.stats,
      };
      // console.log(specificData);
      setAllPokemon((prev) => {
        return [...prev, specificData];
      });
    });
  };
  useEffect(() => {
    poke();
  }, [count]);

  const handleChange = (e) => {
    setVal(e.target.value);
  };
  const handleSubmit = () => {};
  const handleClick = () => {
    setCount(count + 10);
    console.log(count);
  };
  return (
    <>
      <div>
        <h1>POKEDEX</h1>
      </div>
      <div>
        <input
          type="text"
          placeholder="search"
          className="input"
          value={val}
          onChange={handleChange}
        />
        <Button
          size="small"
          variant="outlined"
          type="submit"
          onClick={handleSubmit}
        >
          search
        </Button>
      </div>
      <Grid container columns={5} className="cards">
        <Card loading={loading} pokemon={allPokemon} />
      </Grid>
      <div>
        <Button size="medium" variant="contained" onClick={handleClick}>
          Load More
        </Button>
      </div>
    </>
  );
}
