export function handleMenuButton() {
  let profile_wrapper = document.getElementById(
    "players-wrapper",
  ) as HTMLDivElement;
  if (profile_wrapper!.style.display == "block") {
    profile_wrapper!.style.display = "none";
  } else {
    profile_wrapper!.style.display = "block";
  }
}
