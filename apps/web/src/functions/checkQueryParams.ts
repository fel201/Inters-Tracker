export function checkQueryParams() {
  const urlParams = new URLSearchParams(window.location.search);
  const gameName: string | null = urlParams.get("gameName");
  const tag: string | null = urlParams.get("tag");
  return { gameName, tag };
}