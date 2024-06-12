const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:5000/api/v1"

export const updateIdRoleApi = async (idMember, newRole) => {
    try {
      const response = await fetch(`${apiUrl}/members/${idMember}/idRole`, {
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