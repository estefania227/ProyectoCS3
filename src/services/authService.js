//URL   
const API_URL = "http://127.0.0.1:8000";

export async function loginAPI(username, password) {
    const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({username,password}),
    });

    const data = await response.json();

    if (!response.ok){
        throw new Error(data.message || "Error en Login");

    }
    return data;
}

//logout
export async function logoutAPI(token) {
    const response = await fetch(`${API_URL}/logout/`, {
        method: "POST",
        headers: {
            "Content-Type" : "application/json",
            "Authorization": `Bearer ${token}`,
        }
    });
     const data = await response.json();

    if (!response.ok){
        throw new Error(data.message || "Error en Logout");

    }
    return data;

}

//obteber datos user

export async function getMeAPI(token){
     const response = await fetch(`${API_URL}/me?token=${token}`, {
        method: "GET",
        headers: {
            "Content-Type" : "application/json",
             },
});

         const data = await response.json();

    if (!response.ok){
        throw new Error(data.message || "Error en Logout");

    }
    return data;



}

