const apiUrl = "http://localhost:5000";

export const getUserMemberApi = async (idUser) => {
    try {
        const response = await fetch(`${apiUrl}/api/v1/members/${idUser}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        return response.json();

    } catch (error) {
        console.log(error);
    }
}