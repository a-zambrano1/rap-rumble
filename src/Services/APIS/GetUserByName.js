const apiUrl = "http://localhost:5000";

export const getUserByNameApi = async (username) => {
  try {
    const response = await fetch(`${apiUrl}/api/v1/users/searchBy/username/${username}`, {
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