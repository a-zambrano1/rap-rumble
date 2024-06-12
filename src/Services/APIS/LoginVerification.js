const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:5000/api/v1"

export const loginVerificationApi = async (email, password) => {
  try {
    const response = await fetch(`${apiUrl}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password
      }),
    });
    return response.json();

  } catch (error) {
    console.log(error);
  }
};