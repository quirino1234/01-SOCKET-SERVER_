import { Socket } from "socket.io";
import socketIO from 'socket.io';

export const desconectar = ( cliente: Socket) =>{
    cliente.on('disconnect', ()=>
    {
        console.log('Cliente Desconectado');
    })
}
export const mensaje = (cliente:Socket, io: socketIO.Server)=>{
    cliente.on('mensaje', (payload:{de: string, cuerpo:string}) => {
       
        console.log('Mensaje',payload);

        io.emit('mensaje-nuevo', payload);

    })
}

export const configurarUsuario = (cliente:Socket, io: socketIO.Server)=>{
    cliente.on('configurar-usuario', (payload:{nombre: string}) => {
       
        console.log('Bienvenido usuario',payload.nombre);

       

    })
}