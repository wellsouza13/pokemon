import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";

const Card = styled.div`
  width: 150px;
  padding: 10px;
  margin: 10px;
  border-radius: 10px;
  background-color: #f0f0f0;
  text-align: center;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
    cursor: pointer;
  }
`;

const CardImage = styled.img`
  width: 100px;
  height: 100px;
`;

const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

type Pokemon = {
  name: string;
  url: string;
};

const PokemonList: React.FC = () => {

  const fetchPokemonList = async () => {
    const results = await axios.get(
      "https://pokeapi.co/api/v2/pokemon?limit=151"
    );

    return results.data.results;
  };

  const { data: posts, isLoading, error } = useQuery({
    queryKey: ["posts"],
    queryFn: () => fetchPokemonList(),
})


  if (isLoading) {
    return <div>Carregando...</div>;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Lista de Pokémon</h1>
      <CardContainer>
        {posts.map((pokemon: Pokemon, index: number) => {
          const pokemonId = pokemon.url.split("/").filter(Boolean).pop();

          return (
            <Link
              to={`/pokemon/${pokemonId}`}
              key={index}
              style={{ textDecoration: "none", color: "black" }}
            >
              <Card>
                <CardImage
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`}
                  alt={pokemon.name}
                />
                <h3>{pokemon.name}</h3>
              </Card>
            </Link>
          );
        })}
      </CardContainer>
    </div>
  );
};

export default PokemonList;
