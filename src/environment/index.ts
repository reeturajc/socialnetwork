import { DevEnvironment } from "./dev.env";
// import { ProdEnvironment } from "./prod.env";

export interface Environment {
    appName : string;
    baseUrl : string;
}

export function getEnvVariable(): Environment {
    return DevEnvironment;
    // return ProdEnvironment;
}