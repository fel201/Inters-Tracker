import { apiConfig } from "../../../api/config";
export async function logInUser(email: string, password: string) {
    const URL = apiConfig.domain + "/api/session"
    console.log("logInUser activated")
    try {
        const request = await fetch(URL, {
            method: "POST",
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email, 
                password: password
            })
        });
        if (request.status == 401) {
            return new Error("Wrong credentials");
        }
        alert(document.cookie);
    }
    catch(err) {
        console.error("an error has occured while trying to log in: " + err);
    }
}