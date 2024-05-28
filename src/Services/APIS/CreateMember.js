const apiUrl = "http://localhost:5000";

export const createMemberApi = async (arrayMember) => {
  try {
    const response = await fetch(`${apiUrl}/api/v1/members`, {
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