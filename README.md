# Telegramas Argentina Balotaje 2015

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
