export async function handleSearchButton(e: SubmitEvent, selectRef) {
    e.preventDefault();
    console.log(e);
    const gameName_tag = (e.target as HTMLFormElement).gameName_tag.value.split("#");
    const region_select = document.getElementById("region-choice") as HTMLSelectElement;
    let region: string = "";
    if (region_select != null) {
        let index = region_select.selectedIndex;
        region = region_select.options[index].text;
    }
    window.location.href = `/profile?gameName=${gameName_tag[0]}&tag=${gameName_tag[1]}&region=${region}`;
}