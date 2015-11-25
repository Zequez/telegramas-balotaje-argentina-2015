# Telegramas Argentina Balotaje 2015

[Hagan sus propias queries en SQL acá!](http://zequez.com/telegramas-balotaje-argentina-2015/)

El app usa [sql.js](https://github.com/kripken/sql.js/) y descarga la misma base de datos que ven acá para usar en el cliente.

Ejemplos:

-  [Lugares donde Cambiemos obtuvo 0 votos y el FPV no](http://zequez.com/telegramas-balotaje-argentina-2015/?query=select%0A%20%20*%0AFROM%20telegramas%20AS%20t%0AWHERE%0A%20%20votos_fpv%20!=%200%0A%20%20AND%20votos_cambiemos%20=%200%0AORDER%20BY%20votos_fpv%20DESC%0ALIMIT%20100) [Link para compartir](https://github.com/Zequez/telegramas-balotaje-argentina-2015/blob/master/cambiemos_0.md)
- [Lugares donde el FPV obtuvo 0 votos y Cambiemos no](http://zequez.com/telegramas-balotaje-argentina-2015/?query=select%0A%20%20*%0AFROM%20telegramas%20AS%20t%0AWHERE%0A%20%20votos_cambiemos%20!=%200%0A%20%20AND%20votos_fpv%20=%200%0AORDER%20BY%20votos_cambiemos%20DESC%0ALIMIT%20100) [Link para compartir](https://github.com/Zequez/telegramas-balotaje-argentina-2015/blob/master/fpv_0.md)
- [Lugares donde faltan los telegramas](http://zequez.com/telegramas-balotaje-argentina-2015/?query=SELECT%20*%0AFROM%20telegramas%20AS%20t%0AWHERE%20votos_nulos%20IS%20NULL%0AORDER%20BY%20distrito%20ASC,%20seccion%20ASC) [Link para compartir](https://github.com/Zequez/telegramas-balotaje-argentina-2015/blob/master/mesas_perdidas.md)

Hay fraudalentos de los dos lados! *Boooh*

En total son 92074 telegramas. De estos 536 no cargan
la página. Podés revisarlos, están en la base de datos pero
el único dato es la URL.

Podés encontrar los datos en los siguientes formatos:

- `telegramas.json`
- `telegramas.min.json`
- `telegramas.sqlite3`

El formato de los telegramas es el siguiente (con ejemplo):

```json
{
  "id": 5742,
  "url": "http://www.resultados.gob.ar/bltgetelegr/02/038/0302/020380302_0048.htm",
  "distrito": "02",
  "seccion": "038",
  "circuito": "0302",
  "mesa": "0048",
  "estado": "Grabada",
  "pdf": "http://www.resultados.gob.ar/bltgetelegr/02/038/0302/020380302_0048.pdf",
  "votos_nulos": null,
  "votos_blancos": 4,
  "votos_recurridos": 0,
  "votos_impugnados": 0,
  "votos_fpv": 180,
  "votos_cambiemos": 111,
  "distrito_nombre": "Buenos Aires",
  "seccion_nombre": "Florencio Varela"
}
```

Los PDF no fueron descargados porque pesaban aproximadamente 105KB c/u, y con 92mil
telegramas, eso nos lleva a aproximadamente 9GB de PDFs. Estás invitado a descargarlos y
hostearlos en algún otro lado, porque Github no los va a aceptar.

Los datos fueron obtenidos utilizando el script en [Zequez/telegramas-balotaje-argentina-2015-script](https://github.com/Zequez/telegramas-balotaje-argentina-2015-script).
