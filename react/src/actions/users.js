import api from "../api";
import { userLoggedIn } from "./auth";

export const signup = data => dispatch =>
  api.user.signup(data).then(user => {
    localStorage.bookwormJWT = user.token;
    dispatch(userLoggedIn(user));
});

/*
enregistre le nouvel utilisateur avec ses données
localStorage.bookwormJWT = user.token : conserve le token de l'utilisateur , 
quand on refresh la page l'user reste connecté jusqu'à ce qu'il clique sur logout
*/