const apiUrl = "http://localhost:5000";

export const deleteMemberApi = async (idMember) => {
  try {
    const response = await fetch(`${apiUrl}/api/v1/members/${idMember}`, {
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