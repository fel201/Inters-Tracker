export async function handleSearchButton(e: SubmitEvent) {
    e.preventDefault();
    const gameName_tag = (e.target as HTMLFormElement).gameName_tag.value.split("#");
    console.log(gameName_tag);
    window.location.href = `/profile?gameName=${gameName_tag[0]}&tag=${gameName_tag[1]}`; 
}