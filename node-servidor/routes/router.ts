
import { Router, Request, Response } from 'express';
import Server from '../classes/server';
import { usuariosConectados } from '../sockets/socket';
import { GraficaData } from '../classes/grafica';

const router = Router();

const grafica = new GraficaData();

// consulta inicial de la grafica
router.get('/grafica', ( req: Request, res: Response  ) => {

    res.json(grafica.getDataGrafica());

});

router.post('/grafica', ( req: Request, res: Response  ) => {
    // esta seccion es por si queremos un enpoint donde desde otra fuente, enviemos un mensajes a todos los usuarios conectados, el mensaje llegara a la sala
    const mes   = req.body.mes;
    const valor = Number(req.body.valor);
    grafica.incrementarValor(mes,valor);
    // al llamanar a la clase server el y el metodo instance, nos esta retornando la misma instancia de la clase
    const server = Server.instance;
    server.io.emit('cambio-grafica',grafica.getDataGrafica() );
    res.json(grafica.getDataGrafica());
});



router.post('/mensajes', ( req: Request, res: Response  ) => {
    // esta seccion es por si queremos un enpoint donde desde otra fuente, enviemos un mensajes a todos los usuarios conectados, el mensaje llegara a la sala
    const cuerpo = req.body.cuerpo;
    const de     = req.body.de;
    // al llamanar a la clase server el y el metodo instance, nos esta retornando la misma instancia de la clase
    const server = Server.instance;
    const payload = {
        de,
        cuerpo
    };
    server.io.emit('mensaje-nuevo',payload);
    res.json({
        ok: true,
        cuerpo,
        de
    });

});


router.post('/mensajes/:id', ( req: Request, res: Response  ) => {

    const cuerpo = req.body.cuerpo;
    const de     = req.body.de;
    const id     = req.params.id;
    // al llamanar a la clase server el y el metodo instance, nos esta retornando la misma instancia de la clase
    const server = Server.instance;
    // cada persona tiene una sala asignada, la cual tiene como nombre su id de socket
    const payload = {
        de,
        cuerpo
    };
    console.log({id});
    // con in envia el mensaje solo a una persona, el id es el de la persona que recibira el mensaje
    server.io.in(id).emit('mensaje-privado',payload);

    res.json({
        ok: true,
        cuerpo,
        de,
        id
    });

});

// para saber todos los usuarios que estan conectados esto es para una api rest, para enpoint, no socket
router.get('/usuarios', ( req: Request, res: Response  ) => {
    // al llamanar a la clase server el y el metodo instance, nos esta retornando la misma instancia de la clase
    const server = Server.instance;
    server.io.allSockets().then((clientes)=>{
        res.json({
            ok:true,
           // clientes
            clientes: Array.from(clientes)
        });
    }).catch((err)=>{
        res.json({
            ok:false,
            err
        })
    });

});


// obtener usuarios y sus nombres

router.get('/usuarios/detalle', ( req: Request, res: Response  ) => {
    // usuariosConectados --> en el archivo socket creamos export una nueva instancia de la clase usuario lista, usaremos esa misma clase para obtener el nombre del usuario, la sala y demas
    // para mi gusto si estuvieramos trabajando con token, esto no seria necesario
    usuariosConectados.getLista();
    res.json({
        ok:true,
        clientes: usuariosConectados.getLista()
    })
    
});

export default router;


