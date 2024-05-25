const apiUrl = "http://localhost:5000";

export const getUserByEmailApi = async (email) => {
  try {
    const response = await fetch(`${apiUrl}/api/v1/users/searchBy/email/${email}`, {
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