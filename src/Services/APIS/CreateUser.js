import { notify } from '../../components/Utils/notify.js'

const apiUrl = "http://localhost:5000"

export const createUserApi = async (props) => {
    try {
        const response = await fetch(`${apiUrl}/api/v1/users`, {
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