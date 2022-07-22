import { Router, Request, Response } from "express";
import Server from '../classes/server';
import { Socket } from "socket.io/dist/socket";
import { usuariosConectados } from '../sockets/sockets';


const router = Router();
const sockets: any = null;
router.get('/mensajes',(req: Request, res: Response) =>
{
    res.json(
        {
        ok:true,
        mensaje: 'Todo esta bien :D'
    });
})

router.post('/mensajes',(req: Request, res: Response) => {
    const cuerpo = req.body.cuerpo
    const de = req.body.de

    const payload = { cuerpo, de };

    const server = Server.instance;
    server.io.emit('mensaje-nuevo', payload);
    
    res.json(
        {
            ok:true,
            cuerpo,
            de
        }
    )
})




router.post('/mensajes/:para',(req: Request, res: Response) => {
    const cuerpo = req.body.cuerpo
    const de = req.body.de
    const para = req.params.para;
    const payload= {
      de,
      cuerpo
    }
    const server = Server.instance;
   server.io.in(para).emit('mensaje-privado', payload);
    res.json(
        {
            ok:true,
            cuerpo,
            de,
            para
        }
    )
})

//servicio para obtener los IDs de los usuarios
router.get('/usuarios',(req: Request, res: Response) => {
    
    const server = Server.instance;
    server.io.fetchSockets().then((sockets) => 
    {
        const clients: Object[] = []
        sockets.forEach(socket => clients.push(socket.id));
        res.json({ok: true, clients});}).catch(error =>
        res.json({ok: true, error,}));
});
   

export default router;
