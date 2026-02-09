import { logInUser } from "./logInUser";

export async function handleLoginEvent(event: SubmitEvent) {
    try {
        event.preventDefault();
        const email = (event.target as HTMLFormElement).email.value;
        const password = (event.target as HTMLFormElement).password.value;
    
        await logInUser(email, password);
    }
    catch(err) {
        console.error(err);
    }   
    window.location.href = '/';
}