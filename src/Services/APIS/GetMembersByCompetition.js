const apiUrl = "http://localhost:5000";

export const getMembersByCompetitionApi = async (competition) => {
  try {
    const response = await fetch(`${apiUrl}/api/v1/competitions/${competition}/members/aka/roleId/roleName/userId/memberId`, {
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