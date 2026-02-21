export function getNearestCluster(region: string) {
  if (region == "BR" || region == "NA") {
    console.log("america")
    return "americas";
  }
  else if (region == "EUW") {
    console.log("europa");
    return "europe";
  }
}