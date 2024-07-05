export const fetchLocationData = async () => {
  try {
    const response = await fetch("https://ipinfo.io?token=45c29362c555dc");
    if (!response.ok) {
      throw new Error("Failed to fetch location data");
    }
    const data = await response.json();
    return data;
  } catch (err: any) {
    console.log(err?.message as any);
  } finally {
    console.log("just finished");
  }
};
