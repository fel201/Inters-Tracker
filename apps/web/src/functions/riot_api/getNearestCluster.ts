export function getNearestCluster(region: string) {
  if (region == "BR" || region == "NA") {
    return "americas";
  }
  else if (region == "EUW") {
    return "europe";
  }
}