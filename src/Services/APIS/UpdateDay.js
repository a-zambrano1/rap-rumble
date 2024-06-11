const apiUrl = "http://localhost:5000";

export const finishDayApi = async (day) => {
  try {
    const response = await fetch(`${apiUrl}/api/v1/days/${day}/finish`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        finish: 1,
      }),
    });
    return response.json();
  } catch (error) {
    console.log(error);
  }
};

export const updateDayApi = async (day, enable) => {
  try {
    const response = await fetch(`${apiUrl}/api/v1/days/${day}/enable`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        enable: enable,
      }),
    });
    return response.json();
  } catch (error) {
    console.log(error);
  }
};
