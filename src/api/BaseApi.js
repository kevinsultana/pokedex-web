import React from "react";
import axios from "axios";

export const BaseApi = axios.create({
  baseURL: "https://pokeapi.co/api/v2/",
});
