export async function registerUser(event: SubmitEvent) {
    try {
        console.log("????");
        event.preventDefault();
        const username = (event.target as HTMLFormElement).username.value;
        const email = (event.target as HTMLFormElement).email.value;
        const password = (event.target as HTMLFormElement).password.value;
        console.log(username);
        console.log(email);
        console.log(password);
        const request = await fetch("https://localhost:3000/api/users", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                email: email, 
                password: password
            })
        });
        if (request.status == 401) {
            window.location.href = "/login";
            //
        }
        const response = await request.json();
        console.log(response);
    }
    catch(err) {
        window.
        console.error(err);
    }
};