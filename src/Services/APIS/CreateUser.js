import { notify } from '../../components/Utils/notify.js'

const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:5000/api/v1"

export const createUserApi = async (props) => {
    try {
        const response = await fetch(`${apiUrl}/users`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: props.username,
            password: props.password,
            email: props.email,
            aka: props.aka,
            profilePicture: "",
          }),
        })
        return response.json()
    
      } catch (error) {
        console.log(error)
        notify("error", "Error al iniciar sesión.")
      }
}