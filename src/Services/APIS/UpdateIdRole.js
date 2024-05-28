const apiUrl = "http://localhost:5000";

export const updateIdRoleApi = async (idMember, newRole) => {
    try {
      const response = await fetch(`${apiUrl}/api/v1/members/${idMember}/idRole`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          idRole: newRole
        }),
      });
      return response.json();
  
    } catch (error) {
      console.log(error);
    }
  };