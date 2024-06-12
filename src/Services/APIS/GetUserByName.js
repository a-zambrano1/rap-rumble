const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:5000/api/v1"

export const getUserByNameApi = async (username) => {
  try {
    const response = await fetch(`${apiUrl}/users/searchBy/username/${username}`, {
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