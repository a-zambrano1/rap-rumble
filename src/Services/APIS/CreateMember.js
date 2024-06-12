const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:5000/api/v1"

export const createMemberApi = async (arrayMember) => {
  try {
    const response = await fetch(`${apiUrl}/members`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        idUserMember:arrayMember[0],
        idCompetitionMember: arrayMember[1],
        idRole: arrayMember[2],
        score: arrayMember[3],
        ptb: arrayMember[4],
      }),
    });
    return response.json();

  } catch (error) {
    console.log(error);
  }
};