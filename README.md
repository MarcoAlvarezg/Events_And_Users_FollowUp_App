
## IBM Developer Advocates Team
[![IBM Cloud powered][img-ibmcloud-powered]][url-ibmcloud]

# Functions de IBM Cloud 
[Functions](#Functions)
Plataforma de IBM cloud de programacion poliglota FaaS (Functions-as-a-Service) para desarrollo de codigo ligero que escala dependiendo de la demanda.

GitHub de Serverless para desplegar con githubpages: [![Serverless][img-cloud-serverless]][url-githubserverless]

Para mayor informacion: [![Functions][img-cloud-functions]][url-ibmcloud-Functions]

# IBM Cloud App ID 
[AppId](#Appid)
Servicio de IBM cloud que de manera sencilla agrega autentificacion, asegura backends y APIs, y gestiona datos de usuarios especificos en una aplicacion web y movil.

Para mayor informacion: [![App-id][img-cloud-appid]][url-ibmcloud-appid]

# IBM Cloudant
Es una base de datos completamente administrable para aplicaciones multinube hibrida con una completa compatibilidad de API.

Para mayor informacion: [![Cloudant][img-cloud-cloudant]][url-ibmcloud-cloudant]
## Prework:
* Cuenta de [IBM Cloud][url-IBMCLOUD]
* Instalar [CLI de IBM Cloud][url-CLI-IBMCLOUD] (para descargar la versión “STANDALONE” [**aquí**](https://cloud.ibm.com/docs/cli?topic=cloud-cli-install-ibmcloud-cli))
* Cuenta en [GitHub][url-github-join]
* Instalar [CLI de GitHub][url-github-cli] o instalar [GitHub Desktop][url-githubdesktop]
* Instalar [NodeJS][url-node]
* Utilizar safari, chrome, firefox, edge

## Cupones para profesores y estudiantes:

* Acceder al portal de [IBM Academic Initiative][url-academic] y seleccionar la opción "Register now" si aun no tienes cuenta.
* Realizar el registro correspondiente utilizando la cuenta de correo académica y confirma tu cuenta.
* Despues de confirmar tu cuenta, y con la sesion iniciada en IBM Academic Initiative, en la parte de "Most Popular Topics covered", encontraremos **IBM Cloud** y damos click en "Learn more".
* Bajamos de la pagina hasta encontrar "Software". Le damos click, nos dara un apartado que se llama "Request Feature Code".
* Nos dara nuestro codigo. Lo copiamos y lo llevamos a **IBM Cloud**.

## Cargar créditos en IBM Cloud:

* En la parte superior derecha, buscaremos la parte de "MANAGE"/"GESTIONAR", nos desplegara una lista y seleccionaremos "Account"/"Cuenta".
* De lado izquierdo, tendremos una opción "Account settings"/"Configuracion de cuenta".
* Bajamos un poco hasta encontrar "Subscription and feature codes"/"Codigos de suscripción y carateristicas".
* Da click en "Apply code"/"Aplicar codigo".
* Ingresamos el codigo y click en "Apply"/"Aplicar".

[url-academic]: https://my15.digitalexperience.ibm.com/b73a5759-c6a6-4033-ab6b-d9d4f9a6d65b/dxsites/151914d1-03d2-48fe-97d9-d21166848e65/home/
[url-onthehub]: https://onthehub.com/ibm/?utm_sourc=ibm-ai-productpage&utm_medium=onthehubproductpage&utm_campaign=IBM
[url-IBMCLOUD]: https://cloud.ibm.com/registration
[url-CLI-IBMCLOUD]: https://cloud.ibm.com/docs/cli/reference/ibmcloud?topic=cloud-cli-install-ibmcloud-cli
[url-github-join]: https://github.com/join
[url-github-cli]: https://git-scm.com/book/en/v2/Getting-Started-Installing-Git
[url-githubdesktop]: https://desktop.github.com/
[url-node]: https://nodejs.org/es/download/

## Contenido

`app.js`  Usa Express para establecer rutas.

`public/index.html`  La pagina de destino de la aplicacion. Hacer click en **Iniciar sesion** para iniciar.

`protected/protected.html`  La pagina protegida de la aplicacion. Despues de hacer click en el boton de **Iniciar sesion**, el usuario es redrigido aqui. Aqui es donde se revisa si el usuario esta autorizado o no. En el caso en el que el usuario no este autorizado, se envia una solicitud al servidor de autenticacion para iniciar el flow de el OAuth. Si el usuario esta autorizado, se muestra la pagina y la informacion protegida.


# Cloudant
En esta seccion iniciaremos un servicio de Base de Datos no relacional.
1. Buscaremos en nuestro catalogo **Cloudant**.
2. Seleccionaremos el Plan **Lite**, le asignamos un nombre y en los metodos de autentificacion seleccionamos **Use both legacy credentials and IAM** y creamos el servicio.
3. Ya que el servicio este suministrado, ingresamos al servicio y guardamos las credenciales del servicio para usarlas mas tarde. Estas se encuentran en la parte izquierda en la pestaña credenciales del servicio.
4. Damos click en **Launch Cloudant Dashboard** en la pestaña de gestionar para que nos abra una pestaña nueva donde podremos ver nuestra base de datos, podemos tener mas de una base de datos con difernete nombre dentro del servicio.
5. Crearemos una base de datos nueva en el apartado superior derecho **Create Database**, crearemos 3 que son:
    1. guestbook: Donde guardaremos los comentarios en vivo
    2. institucion: Donde cargaremos una lista que es parte de el Registro de Actividades
    3. teach_adv: Donde se guardaran las actividades

# Functions

## Configuración de Functions
**Comentarios en Vivo**
![LIVEFEED](/docs/LIVEFEED.png)
En esta sección configuraremos nuestra plataforma de IBM Cloud Functions.
1. Secuencia de acciones para escribir a la base de datos
	1. Vamos al catálogo y buscamos Cloud Functions
 	2. Una vez dentro seleccionamos Actions
	3. Damos click en Create
	4. Damos click en Create action
	5. Ponemos el nombre prepare-entry-for-save y seleccionamos Node.js 10 como el Runtime, damos click en Create
	6. Cambiamos el código por el siguiente:
		``` js
		function main(params) {
		 if (!params.nombre || !params.comentario) {
		  return Promise.reject({ error: 'no nombre o comentario'});
		  }
		 return {
		  doc: {
		   createdAt: new Date(),
		   nombre: params.nombre,
		   correo: params.correo,
		   comentario: params.comentario
		  }
		 };
	 	}
		```
	7. Lo salvamos
	8. Para añadir nuestra acción a una secuencia primero nos vamos al tab “Enclosing Secuences” y damos click en “Add to Sequence”
 	9.	Para el nombre de la secuencia ponemos save-guestbook-entry-sequence y posteriormente damos click en Create and Add
	10.	Una vez que esta creada nuestra secuencia le damos click y damos click en Add posteriormente
 	11.	Damos click en Use Public y seleccionamos Cloudant
 	12.	Seleccionamos la acción "creare-document", damos click en New Binding, en "name" ponemos de nombre de nuestro paquete binding-for-guestbook y en Cloudant Instance seleccionamos Input Your Own Credentials
 	13.	 Para llenar todos los datos posteriores copiamos y pegamos lo que teníamos en el servicio de Cloudant que seria "Username", "Password", "Host", y llenamos "Database" con el nombre que tiene nuestra base de datos "guestbook" y damos click en Add, luego en Save
 	14.	Para probar que esté funcionando, damos click en change input e ingresamos nuestro siguiente JSON y damos click en Apply y luego en Invoke
	 ``` json
		{
		"nombre": "John Smith",
		"correo": "john@smith.com",
		"comentario": "Este es mi comentario"
		}
	```
	Una vez hecho esto debemos verlo escrito en nuestra base de datos de Cloudant en la sección Documents
 
2. Secuencia de acciones para obtener las entradas de la base de datos
Esta secuencia la usaremos para tomar las entradas de cada usuario y sus respectivos comentarios
	1.	En nuestra tab de functions creamos una acción Node.js 10 y le ponemos el nombre set-read-input, siguiendo el mismo proceso que en la acción anterior
	2.	Reemplazamos el código que viene, esta acción pasa los parámetros apropiados a nuestra siguiente acción
		``` js
		function main(params) {
		 return {
		  params: {
		   include_docs: true
		   }
		 };
		}
		```
	3. Damos click en Save 
	4. Damos click en Enclosing Sequences, Add to Sequence y Create New con el nombre read-guestbook-entries-sequence damos click en Create and Add
	5. Damos click en Actions y  damos click en read-guestbook-entries-sequence
 	6. Damos click en Add para crear una segunda acción en la secuencia
	7. Seleccionamos Public y Cloudant
 	8.	Seleccionamos list-documents en actions y seleccionamos el binding binding-for-guestbook y posteriormente damos click en Add
 	9.	Damos click en Add para añadir una acción más a la secuencia, esta es la que va a dar el formato de los documentos cuando regresen de Cloudant
	10.	La nombraremos format-entries y posteriormente damos click en Create and add 
	11.	Damos click en format-entries y reemplazamos el código con:
		``` js
		const md5 = require('spark-md5');
			
		function main(params) {
		 return {
		  entries: params.rows.map((row) => { return {
		   nombre: row.doc.nombre,
		   correo: row.doc.correo,
		   comentario: row.doc.comentario,
		   createdAt: row.doc.createdAt,
		   icon: (row.doc.correo ? `https://secure.gravatar.com/avatar/${md5.hash(row.doc.correo.trim().toLowerCase())}?s=64` : null)
		  }})
		 };
		}
		```
	12.	Salvamos y damos click en invoke, debe sacar lo que tenemos en esa base de datos.
 
3. Configurar el API
    1.	Dentro de nuestras acciones seleccionamos ambas secuencias y en la tab de Endpoints damos click en Enable Web Action y damos click en Save
    
    2.	Nos vamos a Functions y damos click en API
    
    3.	Damos click en Create Managed API
    4.	En el API name ponemos guestbook y en el path ponemos /guestbook y damos click en create operation
    
    5.	Creamos un path que sea /entries ponemos el verbo a GET y seleccionamos la secuencia read-guestbook-entries-sequence y damos click en Create
    
    6.	Realizamos la misma acción pero ahora con un POST y la secuencia save-guestbook-entries-sequence y damos click en Create
    7.	Salvamos y exponemos la API
    8. Copiamos el link expuesto y lo cambiamo en ./protected/javascript/guestbook.js
        ``` js
        const apiUrl = '<url-api-functions>';
        ```
        en la linea 4
        ![link](/docs/ApiGuestbook.png)

**Para el registro de Actividades**
![LIVEFEED](/docs/Actividades.png)
1. Secuencia de acciones para escribir a la base de datos
	1. Regresamos a IBM Cloud Functions
 	2. Seleccionamos Actions
    3. Damos click en Create
	4. Damos click en Create action
	5. Ponemos el nombre prepare-entry y seleccionamos Node.js 10 como el Runtime, damos click en Create
	6. Cambiamos el código por el siguiente:
		``` js
		function main(params) {
            console.log(params)
            return {
                doc: {
                    createdAt: new Date(),
                    user: params.user,
                    activityType: params.actType,
                    hours: parseInt(params.hours),
                    location: params.loc,
                    students: params.students,
                    institucion: params.ins,
                    rating: params.rating,
                    comments: params.comment
                }
            };
        }
		```
	7. Lo salvamos
	8. Añadimos nuestra acción a una secuencia con la tab “Enclosing Secuences” y damos click en “Add to Sequence”
 	9.	Para el nombre de la secuencia ponemos save-entry y posteriormente damos click en Create and Add
	10.	Una vez que esta creada nuestra secuencia le damos click y damos click en Add posteriormente
 	11.	Damos click en Use Public y seleccionamos Cloudant
 	12.	Seleccionamos la acción "creare-document", damos click en New Binding, en "name" ponemos de nombre de nuestro paquete binding-for-Activities y en Cloudant Instance seleccionamos Input Your Own Credentials
 	13.	 Para llenar todos los datos posteriores copiamos y pegamos lo que teníamos en el servicio de Cloudant que seria "Username", "Password", "Host", y llenamos "Database" con el nombre que tiene nuestra base de datos "teach_adv" y damos click en Add, luego en Save
 	14.	Para probar que esté funcionando, damos click en change input e ingresamos nuestro siguiente JSON y damos click en Apply y luego en Invoke
	 ``` json
		{
		"user": "john@smith.com",
        "actType": "Taller o Workshop",
        "hours": "3",
        "loc": "pach",
        "students": "10",
        "ins": "Universidad",
        "rating": "4",
        "comment": "Todo bien"
		}
	```
	Una vez hecho esto debemos verlo escrito en nuestra base de datos de Cloudant en la sección Documents
 
2. Secuencia de acciones para obtener las entradas de la base de datos
Esta secuencia la usaremos para tomar las entradas de cada usuario y sus respectivos comentarios
	1.	En nuestra tab de functions creamos una acción Node.js 10 y le ponemos el nombre set-read, siguiendo el mismo proceso que en la acción anterior
	2.	Reemplazamos el código que viene, esta acción pasa los parámetros apropiados a nuestra siguiente acción
		``` js
		function main(params) {
		 return {
		  params: {
		   include_docs: true
		   }
		 };
		}
		```
	3. Damos click en Save 
	4. Damos click en Enclosing Sequences, Add to Sequence y Create New con el nombre read-guestbook-entries-sequence damos click en Create and Add
	5. Damos click en Actions y  damos click en read-entries
 	6. Damos click en Add para crear una segunda acción en la secuencia
	7. Seleccionamos Public y Cloudant
 	8.	Seleccionamos list-documents en actions y seleccionamos el binding binding-for-Activities y posteriormente damos click en Add
 	9.	Damos click en Add para añadir una acción más a la secuencia, esta es la que va a dar el formato de los documentos cuando regresen de Cloudant
	10.	La nombraremos format y posteriormente damos click en Create and add 
	11.	Damos click en format y reemplazamos el código con:
		``` js
		const md5 = require('spark-md5');
			
		function main(params) {
		 return {
		  entries: params.rows.map((row) => { return {
            name: row.doc.user,
            hours: row.doc.hours,
            institucion: row.doc.institucion,}})
		 };
		}
		```
	12.	Salvamos y damos click en invoke, debe sacar lo que tenemos en esa base de datos.
 
3. Configurar el API
    1.	Dentro de nuestras acciones seleccionamos ambas secuencias y en la tab de Endpoints damos click en Enable Web Action y damos click en Save
    
    2.	Nos vamos a Functions y damos click en API
    
    3.	Damos click en Create Managed API
    4.	En el API name ponemos teachADV y en el path ponemos /entries y damos click en create operation
    
    5.	Creamos un path que sea /entries ponemos el verbo a GET y seleccionamos la secuencia read-entries y damos click en Create
    
    6.	Realizamos la misma acción pero ahora con un POST y la secuencia save-entries y damos click en Create
    7.	Salvamos y exponemos la API
    8. Copiamos el link expuesto y lo cambiamo en ./protected/javascript/cloudant.js
        ``` js
        const apiUrl = '<url-api-functions>';
        ```
        en la linea 4


    

# AppId

## Tabla de Contenidos
* [Contenido](#Contenido)
* [Configuracion del Servicio](#Configuracion-del-Servicio)
* [Ejecucion local](#Ejecucion-local)
* [Ejecucion en IBM Cloud](#Ejecucion-en-IBM-cloud)
* [Licencia](#Licencia)

<!-- (falta agregar configuraciones de appid en esta parte) -->

## Configuracion del Servicio

1. En IBM Cloud en el catalogo buscamos **App ID** y le damos click.
2. Asignamos la Region mas cercana, nombre del servicio, etiquetas y la version **Lite**, le damos click a crear.

![](/docs/Region-plan.png)

![](/docs/name-create.png)

3. Nos llevará a la pagina principal del Servicio, donde encontraremos de lado derecho la lista de opciones del servicio.
	Nos dirigiremos a "Manage Authentication" y en el apartado de "Identity Providers" para asignar como los usuarios pueden crear su cuenta. Se puede elegir entre las siguientes:

	![](/docs/cuentas.png)

4. En la otra pestaña "Authentification Settings" podemos agregar URL para la redireccion de nuestra aplicacion. Los tokns de seguridad para mantenerse con la sesion iniciada, con el codigo de acceso y el codigo de la cuenta anonima si es que esta activo. 

	![](/docs/token.png)

5. En "Cloud Directory" debajo de "Manage Authentication" encontraremos diversas opciones, seleccionaremos "Workflow Templates" en "Email Verification" se puede cambiar el correo que llega para la verificación del mismo y permitir si los usuarios pueden ingresar a la parte protegida o no si la cuenta ya esta verificada.

	![](/docs/email.png)

6. En la opcion de "Login Customization" podemos cambiar ligeramente la pantalla en donde se inicia sesion, se puede modificar el logo que puede ser png o jpg no mayor a 100kb, el color del encabezado, y tenemos una vista previa en web y movil.

	![](/docs/login.png)

7. En la pestaña de "Applications" podremos agregar nuestra aplicacion con el boton **Add application** donde nos arrojara una ventana para asignar nombre, tipo, y por si queremos agregar un "Scope". Asiganmos nombre y lo dejaremos como **Regular web application**.

	![](/docs/conection.png)

8. Eso nos dara unas credenciales que usaremos en nuestra aplicacion. Las cambiaremos en el archivo llamado "**localdev-congfig.json**" 

	![](/docs/credentials.png)	



# Ejecucion local

Primero regresamos a "Authentification Settings" donde ingresamos en el punto 4 de la configuración, para agregar la URL "http://localhost:3000/*

Ejecuta los siguientes comandos en la terminal, en la carpeta clonada:
``` bash
npm install
node app
```
Usa el link http://localhost:3000 para cargar la aplicacion web en el navegador.

# Ejecucion en IBM Cloud

**IMPORTANTE:** Antes de desplegarlo de manera global, quite "http://localhost:3000/*" de la lista de URLs de redirección WEB en "Manage Authentication" en la pestaña "Authentication Settings".

1. Iniciar sesión en IBM Cloud CLI.
	``` bash
	ibmcloud login 
	```

	1. Elegimos la Region, que sea la mas cercana, como us-south o us-east.

	![](/docs/Region.png)

2. Seleccionar una organización y un espacio de Cloud Foundry en el cual tengas acceso de desarrollador:
	<br>Utiliza:

	``` bash
	ibmcloud target --cf
	```

	para seleccionar la org/space interactivamente de Cloud Foundry.

	1. Revisar que tengamos tambien seleccionado el grupo de recursos, si no, utilizaremos:
		``` bash
		ibmcloud resource groups
		```

		para que nos muestre los que tenemos disponibles y seleccionamos uno con:

		``` bash
		ibmcloud target -g {{el nombre del recurso}}
		```
	
3. Enlazamos la app a la instancia de App ID:

	``` bash
	ibmcloud resource service-alias-create "{{El nombre Alias de la instancia}}" --instance-name "{{El nombre del servicio ya creada en IBM Cloud}}" -s {{space}}
	```

	Nos creara una instancia de Cloud Foundry conectada a nuestro servicio de AppID.

	![](/docs/Servicio.png)

4. Cambiaremos el nombre del Alias de la instancia en el archivo manifest.yml

   ```
   applications:
        - name: [el nombre de la app]
        memory: 256M
        services:
        - {{El nombre Alias de la instancia}}
   ```

5.  Desplegamos la aplicacion directamente en IBM Cloud, desde la carpeta de la app ejecutamos:

  ```bash
  ibmcloud app push
  ```

 Nos entregara algo como esto:

 ![](/docs/Ruta.png)

Cambiamos las rutas que se encuentran en  ./protected/javascript/cloudant.js en las lineas 5 y 6, por: `https://{la ruta que copiamos}/protected/api/idPayload` y `https://{la ruta que copiamos}/protected/api/inst`.

6. Ahora configuraremos la URL de redirection de OAuth en nuestro servicio de AppID en para que pueda aprobar el acceso. Copiamos la routa que nos dio el paso anterio en la parte `routes: *********.mybluemix.net`. 

Nos dirigimos a nuestro servicio de AppID. En **Manage Authentication** despues en **Authenticaiton Settings** veremos un boton que dice de + que es que nos permitira agregar una URL nueva, que sera la siguiente:

![](/docs/RutaNueva.png)

   `https://{la ruta que copiamos}/ibm/cloud/appid/callback`
   
   Ahora podemos encontrar nuestra app en **Cloud Foundre Apps** en la pagina inicial de IBM Cloud: `https://cloud.ibm.com/resources`

7. Al entrar veremos un botón que nos permitira visitar la URL de la app.

![](/docs/visita.png)

## Puedes ver mas en:
#### Protegiendo applicaciones Web Node.js con IBM Cloud App ID

https://www.youtube.com/watch?v=6roa1ZOvwtw


[img-ibmcloud-powered]: https://img.shields.io/badge/IBM%20cloud-powered-blue.svg
[url-ibmcloud-Functions]: https://www.ibm.com/cloud/functions
[url-ibmcloud-object]: https://www.ibm.com/cloud/object-storage
[img-cloud-functions]: https://img.shields.io/badge/IBM%20cloud-Functions-red.svg
[img-cloud-object]: https://img.shields.io/badge/IBM%20cloud-Object_Storage-red.svg
[img-cloud-serverless]: https://img.shields.io/badge/IBM%20cloud-Serverless-green.svg
[img-cloud-appid]: https://img.shields.io/badge/IBM%20cloud-AppID-red.svg
[img-cloud-cloudant]: https://img.shields.io/badge/IBM%20cloud-Cloudant-red.svg
[url-ibmcloud-appid]: https://www.ibm.com/cloud/app-id
[url-ibmcloud-cloudant]: https://www.ibm.com/cloud/cloudant
[url-ibmcloud]: https://www.ibm.com/cloud/
[url-githubserverless]: https://github.com/ibmdevelopermx/Serverless_Cloudant
[url-IBMCLOUD]: https://cloud.ibm.com/registration
[url-CLI-IBMCLOUD]: https://cloud.ibm.com/docs/cli/reference/ibmcloud?topic=cloud-cli-install-ibmcloud-cli
[url-github-join]: https://github.com/join
[url-github-cli]: https://git-scm.com/book/en/v2/Getting-Started-Installing-Git
[url-githubdesktop]: https://desktop.github.com/
[url-node]: https://nodejs.org/es/download/