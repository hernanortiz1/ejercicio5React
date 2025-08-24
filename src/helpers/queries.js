const urlTareas = import.meta.env.VITE_API_TAREA

export const leerTareas = async () => {
    try{
        const respuesta = await fetch(urlTareas)
        return respuesta
    }catch(error){
        console.error(error);
        return null
    }
};

export const obtenerTareaPorID = async (id) => {
    try{
        const respuesta = await fetch(urlTareas+ `/${id}`)
        return respuesta
    }catch(error){
        console.error(error);
        return null
    }
};

export const crearTarea = async (tareaNueva) => {
    try{
        const respuesta = await fetch(urlTareas,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(tareaNueva)
        })
        return respuesta
    }catch(error){
        console.error(error);
        return null
    }
};

export const editarTarea = async (tareaEditada, id) => {
    try{
        const respuesta = await fetch(urlTareas+ `/${id}`,{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(tareaEditada)
        })
        return respuesta
    }catch(error){
        console.error(error);
        return null
    }
};
export const borrarTareaPorID = async (id) => {
    try{
        const respuesta = await fetch(urlTareas+ `/${id}`,{
            method: 'DELETE',
        })
        return respuesta
    }catch(error){
        console.error(error);
        return null
    }
};