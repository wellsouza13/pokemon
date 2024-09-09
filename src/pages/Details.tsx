import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

const PokemonDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const fetchPokemonDetails = async () => {
    const results = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);

    return results.data;
  };

  const {
    data: details,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["posts-details", id],
    queryFn: () => fetchPokemonDetails(),
  });

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <div style={{ textAlign: "center" }}>
      <h1>{details.name}</h1>
      <img
        src={details.sprites.front_default}
        alt={details.name}
        style={{ width: "150px", height: "150px" }}
      />
      <p>Altura: {details.height / 10} m</p>
      <p>Peso: {details.weight / 10} kg</p>
      <p>Tipo: {details.types.map((type: any) => type.type.name).join(", ")}</p>
    </div>
  );
};

export default PokemonDetails;
