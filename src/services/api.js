import axios from "axios";
import env from "../env";

const behance = axios.create({
        baseURL: env.apiURL
});

const commonHeaders = {
    headers: {
        'Content-Type': 'application/json'
    }
};

export function behanceGetUsers ({searchQuery}) {
    return behance.get(`/users${searchQuery}`, commonHeaders);
}