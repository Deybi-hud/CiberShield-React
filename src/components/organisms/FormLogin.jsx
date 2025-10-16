import React from "react";
import Image from "../atoms/Image";
import { Input } from "../atoms/Input";

const FormLogin = () => {
    
    return (
        <div className="box-visible">
            <form>
                <img src= "assets/img/Login/01.png" alt ="user-img"></img>
                <label for="username">Usuario</label>
                <Input type="text" id="username" placeholder="Nombre usuario" required></Input>
                <label for="password">Contraseña</label>
                <Input type="text" id="password" placeholder="Contraseña" required></Input>
                <div class="box-visible">
                        <Input type="checkbox" id="visible"></Input>
                <label for="visible">Mostrar contraseña</label>
                </div>
            </form>
        </div>
    );  
};

export default FormLogin;