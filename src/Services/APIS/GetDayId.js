const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:5000/api/v1"

export const getDayIdApi = async (competition, numberDay) => {
  try {
    const response = await fetch(`${apiUrl}/days/searchBy/${competition}/numberDay/${numberDay}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.json();

  } catch (error) {
    console.log(error);
  }
};