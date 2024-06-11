import React, { useRef } from "react"
import { updateDayApi, finishDayApi } from "../../Services/APIS/UpdateDay"
import { notify } from "./notify"

const ModalDays = ({ isOpen, onCancel, onConfirm, day, children }) => {
  const dropdownRef = useRef(null)

  if (!isOpen) {
    return null
  }

  const handleOuterClick = (e) => {
    if (e.target === e.currentTarget) {
      onCancel()
    }
  };

  const handleEditDay = () => {
    var newState = parseInt(dropdownRef.current.value)
    console.log(newState)
    if (newState === 1) {
      console.log("Activar")
      try {
        updateDayApi(day, 1)
      } catch (error) {
        console.log(error)
        notify(
          "error",
          "No se ha podido editar el estado del día. Inténtalo de nuevo."
        );
      }
    } else if (newState === 2) {
      console.log("Desactivar")
      try {
        updateDayApi(day, 0)
      } catch (error) {
        console.log(error)
        notify(
          "error",
          "No se ha podido editar el estado del día. Inténtalo de nuevo."
        );
      }
    } else if (newState === 3) {
      console.log("Terminar")
      try {
        finishDayApi(day)
        updateDayApi(day, 0)
      } catch (error) {
        console.log(error)
        notify(
          "error",
          "No se ha podido editar el estado del día. Inténtalo de nuevo."
        );
      }
    }
  };

  return (
    <div
      onClick={handleOuterClick}
      className="fixed z-10"
      style={{
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        className="flex flex-col items-center"
        style={{
          backgroundColor: "white",
          padding: "3em",
          maxWidth: "90%",
          maxHeight: "90%",
          overflow: "auto",
          borderRadius: "10%",
        }}
      >
        {children}
        <div className="flex flex-col items-center gap-5 text-[25px] text-[#3d405b]">
          día # {day}
          <div className="flex flex-col items-center w-full justify-around">
            <span>Nuevo rol</span>
            <select
              ref={dropdownRef}
              className="g-4 p-3 border-2 border-gray-500 "
            >
              <option value="" disabled selected>
                Cambiar Estado
              </option>
              <option value="1">Activar</option>
              <option value="2">Desactivar</option>
              <option value="3">Terminar</option>
            </select>
          </div>
          <div className="flex w-full gap-5">
            <button
              onClick={() => {
                handleEditDay()
                onConfirm()
              }}
              className="bg-verdesito hover:bg-verde text-white p-3 rounded-xl"
            >
              Confirmar
            </button>
            <button
              onClick={() => {
                onCancel()
              }}
              className="bg-red-500 hover:bg-red-700 text-white p-3 rounded-xl"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalDays;
