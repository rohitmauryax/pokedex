import React from "react";
import { Grid } from "@mui/material";

const cards = ({ loading, pokemon }) => {
  //   console.log(pokemon);
  return (
    <>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        pokemon.map((item, index) => {
          return (
            <Grid xs key={index} className="card">
              <h2>{item.id}</h2>
              {item.name}
              <img src={item.sprites.front_default} />
            </Grid>
          );
        })
      )}
    </>
  );
};

export default cards;
