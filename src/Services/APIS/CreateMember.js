const apiUrl = "http://localhost:5000";

export const createMemberApi = async (props) => {
    try {
        const response = await fetch(`${apiUrl}/api/v1/members`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            idUserMember: props.idUserMember,
            idCompetitionMember: props.idCompetitionMember,
            idRol: props.idRol,
            score: props.score,
            ptb: props.ptb,
          }),
        });
        return response.json();
    
      } catch (error) {
        console.log(error);
      }
    };