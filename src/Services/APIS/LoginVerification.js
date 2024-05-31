const apiUrl = "http://localhost:5000";

export const loginVerificationApi = async (email, password) => {
  try {
    const response = await fetch(`${apiUrl}/api/v1/login`, {
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