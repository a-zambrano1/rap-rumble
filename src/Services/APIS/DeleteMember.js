const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:5000/api/v1"

export const deleteMemberApi = async (idMember) => {
  try {
    const response = await fetch(`${apiUrl}/members/${idMember}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.json();

  } catch (error) {
    console.log(error);
  }
};