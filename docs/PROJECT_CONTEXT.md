ITLA Crush — Prompt Maestro del Proyecto

Voy a desarrollar una aplicación web llamada ITLA Crush, basada en los requerimientos del proyecto final de la asignatura Programacion Web del ITLA, pero agregando funcionalidades y una identidad visual propia para diferenciarla de las implementaciones tradicionales de la asignatura.

La aplicación debe cumplir primero con todos los requerimientos académicos obligatorios y, sobre esa base, incorporar una funcionalidad adicional inspirada en el concepto de Love Alarm.

1. Objetivo general
Voy a desarrollar una red social web para estudiantes de ITLA donde los usuarios puedan publicar declaraciones de amor o confesiones dirigidas a otros usuarios.

La aplicación permitirá:
Leer declaraciones públicas sin autenticarse.
Leer declaraciones privadas iniciando sesión.
Crear cuentas.
Iniciar sesión.
Crear declaraciones de amor.
Seleccionar un destinatario.
Elegir si la declaración es pública o privada.
Elegir si la declaración es anónima o identificada.
Personalizar visualmente cada declaración.

Incorporar un sistema experimental de proximidad inspirado en Love Alarm.

El proyecto debe ser desarrollado pensando en un MVP funcional, mantenible, escalable y visualmente atractivo, evitando implementar funcionalidades innecesariamente complejas que no aporten valor al objetivo académico.

2. Tecnologías obligatorias
La aplicación debe utilizar:
JavaScript ES6+
React
Firebase como backend
Firebase deberá utilizarse principalmente para:
Autenticación.
Base de datos.
Almacenamiento de información necesaria para la aplicación.
Reglas de seguridad.
Funciones backend cuando sean necesarias.
La aplicación debe estar estructurada de forma modular y preparada para futuras mejoras.
También utilizaré Antigravity IDE como entorno principal de desarrollo.
Utilizaré librerías adicionales de React cuando aporten valor real, especialmente para:
Animaciones.
Iconos.
Componentes UI.
Formularios.
Notificaciones.
Manejo de estados.
Experiencia responsive.
No voy a añadir dependencias innecesarias.

3. Requerimientos académicos obligatorios
3.1 Lectura de declaraciones públicas
Los usuarios no autenticados deben poder acceder a una sección donde puedan visualizar las declaraciones públicas.
No debe ser necesario crear una cuenta para consultar esta sección.
Las declaraciones deben mostrar únicamente la información permitida según su configuración de privacidad.

3.2 Lectura de declaraciones privadas
Las declaraciones privadas únicamente podrán visualizarse cuando el usuario haya iniciado sesión.
Una declaración privada no debe aparecer en la vista pública.
La lógica de seguridad debe implementarse también mediante las reglas de Firebase y no únicamente mediante restricciones visuales en React.

4. Registro de usuarios
Los usuarios deben poder crear una cuenta.
Como mínimo se almacenará:
Username
Contraseña
Nombre
Apellido
El username debe ser único.
Debe existir validación de:
Campos obligatorios.
Formato de los datos.
Longitud mínima/máxima.
Contraseña segura.
Username no repetido.
Las contraseñas nunca deben almacenarse manualmente como texto plano en la base de datos.
La autenticación debe utilizar el sistema de autenticación correspondiente de Firebase.

5. Inicio de sesión
Los usuarios registrados deben poder iniciar sesión.
La aplicación debe manejar correctamente:
Credenciales incorrectas.
Usuario inexistente.
Campos vacíos.
Estados de carga.
Sesión activa.
Cierre de sesión.
Persistencia de sesión.
La interfaz debe actualizarse automáticamente dependiendo de si existe un usuario autenticado.

6. Sistema de declaraciones
Los usuarios autenticados podrán crear una declaración de amor.
Cada declaración tendrá como mínimo:
Autor.
Destinatario.
Cuerpo.
Estado público/privado.
Estado anónimo/no anónimo.
Fecha de creación.
Configuración visual de la publicación.

7. Autor de la declaración
El usuario podrá decidir si su declaración es:
Anónima
El destinatario podrá recibir la declaración y el resto de usuarios podrán verla según las reglas de privacidad, pero nunca se mostrará públicamente el username del autor.
No anónima
Se mostrará el username del usuario que realizó la declaración.
La anonimidad y la privacidad deben considerarse conceptos independientes.
Ejemplos:
Pública + anónima.
Pública + identificada.
Privada + anónima.
Privada + identificada.

8. Destinatario
Cada declaración debe tener obligatoriamente un destinatario.
El usuario debe poder seleccionarlo mediante un combobox/select que muestre los usuarios registrados.
Debe existir una última opción:
OTRO
Cuando el usuario seleccione OTRO, deberá aparecer un campo adicional para introducir manualmente el nombre de la persona.
El destinatario siempre será obligatorio.
Si se selecciona un usuario registrado, la declaración deberá guardar una referencia al usuario destinatario.
Si se selecciona OTRO, se guardará el nombre introducido manualmente, pero no deberá crearse automáticamente un usuario.

9. Declaración pública
Debe existir un checkbox denominado, por ejemplo:
"Hacer declaración pública"
Debe estar marcado por defecto.
Si está marcado:
La declaración podrá aparecer en el feed público.
Si está desmarcado:
La declaración será privada.
Solo usuarios autenticados podrán acceder a ella según las reglas definidas.
La seguridad no debe depender únicamente del frontend.

10. Cuerpo de la declaración
El cuerpo de la declaración será obligatorio.
Debe existir:
Límite mínimo/máximo de caracteres.
Validación de contenido vacío.
Contador de caracteres.
Estado de error.
Estado de carga al publicar.
El diseño debe sentirse como escribir una carta o nota romántica.

11. Personalización de la declaración
Cada usuario podrá personalizar visualmente su declaración antes de publicarla.
Fuentes
Debe poder elegir entre:
Arial
Comic Sans MS
Times New Roman
La fuente seleccionada debe aplicarse únicamente a la declaración correspondiente.

12. Fondos disponibles
El usuario podrá elegir entre cuatro estilos de publicación:
Estilo 1 — Hoja de cuaderno
Debe parecer una hoja de cuaderno clásica:
Fondo blanco.
Líneas horizontales azules.
Márgenes visuales.
Agujeros en el lateral izquierdo.
El texto debe alinearse visualmente con las líneas.
Estilo 2 — Post normal
Fondo blanco.
Diseño limpio.
Apariencia similar a una publicación tradicional.
Estilo 3 — Post-it
Debe parecer una nota adhesiva amarilla:
Fondo amarillo.
Sombra ligera.
Ligera rotación.
Tachuela roja en la parte superior.
Estilo 4 — Corazón
Debe parecer una hoja de papel con forma de corazón.
Color rojo.
Texto centrado.
Diseño romántico.
Mantener legibilidad.
Estos estilos deben implementarse como componentes reutilizables, no como cuatro páginas completamente independientes.

13. Concepto principal: ITLA Love Alarm
La funcionalidad diferenciadora del proyecto estará inspirada conceptualmente en el K-drama Love Alarm.
La idea es la siguiente:
Un usuario puede escribir una declaración anónima dirigida a otra persona registrada en la plataforma.
Ejemplo:
"Desde que te vi en el laboratorio no dejo de pensar en ti..."
El usuario puede seleccionar a la persona destinataria sin revelar públicamente que él/ella escribió la declaración.
Si posteriormente ambos usuarios se encuentran cerca dentro del campus y ambos tienen habilitada la funcionalidad de ubicación, el sistema podrá generar una alerta para el destinatario.
La alerta debe ser deliberadamente misteriosa.
Ejemplo:
❤️ Tu enamoranonimo está más cerca de lo que crees jiji.
No debe revelar:
Nombre del admirador.
Distancia exacta.
Coordenadas.
Ubicación exacta.
Dirección.
Historial de movimientos.
La finalidad es generar una experiencia divertida y misteriosa, no realizar seguimiento de usuarios.

14. Sistema de proximidad
Para el MVP, la detección de proximidad debe mantenerse simple.
Un usuario será considerado "cerca" cuando ambos dispositivos estén dentro de un radio configurable.
El radio deberá mantenerse como una constante/configuración del sistema para poder modificarlo posteriormente sin reescribir toda la lógica.
IMPORTANTE:
Una aplicación web no puede garantizar un rastreo GPS continuo cuando el navegador está completamente cerrado o el sistema operativo suspende la aplicación.
Por lo tanto, para el MVP:
La detección de proximidad funcionará mientras la aplicación web tenga acceso a la ubicación del usuario.
El navegador deberá solicitar permiso de ubicación.
El usuario debe poder activar/desactivar la funcionalidad.
No se debe almacenar un historial permanente de ubicaciones.
No se deben mostrar coordenadas exactas al usuario.
La ubicación debe utilizarse únicamente para calcular la proximidad necesaria para esta funcionalidad.
La arquitectura debe quedar preparada para que posteriormente pueda evolucionar a una aplicación móvil si se desea implementar una detección más persistente.

15. Alertas de proximidad
El sistema debe evitar enviar múltiples alertas repetidas continuamente.
Debe existir algún mecanismo de cooldown/deduplicación.
Ejemplo:
Si el admirador y el destinatario permanecen cerca durante 20 minutos, no se deben enviar decenas de correos.
Debe generarse una alerta controlada y posteriormente respetar un período de espera antes de volver a notificar sobre la misma relación.
La lógica de esta funcionalidad debe ejecutarse preferiblemente en backend y no depender únicamente del frontend.

16. Notificaciones
Como primera implementación del MVP, se puede utilizar correo electrónico como mecanismo de notificación.
Ejemplo:
Asunto:
"💌 ITLA Crush tiene algo que decirte"
Mensaje:
Tu enamoranonimo está más cerca de lo que crees jiji. ❤️
Nunca incluir:
Nombre del admirador.
Distancia exacta.
Coordenadas.
Ubicación.
Información que permita identificar directamente al usuario.
La arquitectura debe permitir añadir posteriormente otros tipos de notificación.

17. Privacidad y seguridad
La privacidad es especialmente importante debido al uso de ubicación.
Implementar:
Reglas de seguridad de Firebase.
Validación de permisos.
Acceso restringido a datos privados.
No almacenar historiales innecesarios de ubicación.
No exponer coordenadas al frontend si no son necesarias.
No permitir que un usuario consulte arbitrariamente las coordenadas de otro.
Separar los datos públicos de los datos privados.
Validar todas las operaciones importantes en backend.
Nunca confiar únicamente en validaciones realizadas en React.

18. Diseño visual
La identidad visual estará inspirada en:
Cuadernos.
Cartas.
Notas escritas a mano.
Confesiones románticas.
Cultura universitaria.
La interfaz general debe combinar un estilo:
Minimalista + Bento Box + Cuaderno escolar + Romance
Debe sentirse moderna pero tener personalidad.

19. Colores
La paleta principal debe inspirarse en los colores institucionales de ITLA:
Azul.
Rojo.
Blanco.
Los colores deben utilizarse de forma equilibrada.
No quiero que toda la interfaz sea excesivamente roja o azul.
El diseño debe mantener suficiente espacio en blanco.

20. Layout
La interfaz principal debe utilizar una estructura tipo Bento Box.
El dashboard puede contener módulos como:
Feed de declaraciones.
Estadísticas personales.
Acceso rápido a crear declaración.
Estado de Love Alarm.
Últimas declaraciones.
Perfil.
Información relacionada con el sistema.
Los componentes deben ser responsive y funcionar correctamente en:
Desktop.
Tablet.
Mobile.

21. Animaciones
Se pueden utilizar librerías de React para crear animaciones sutiles.
Las animaciones pueden utilizarse en:
Entrada de declaraciones.
Hover.
Modal de creación.
Notificaciones.
Corazones.
Cambio de estados.
Transiciones entre vistas.
Las animaciones no deben perjudicar:
Rendimiento.
Accesibilidad.
Legibilidad.
Usabilidad.
Evitar sobrecargar la interfaz.

22. Experiencia de usuario
La aplicación debe incluir:
Loading states.
Empty states.
Error states.
Mensajes de éxito.
Toast notifications.
Confirmaciones cuando sean necesarias.
Formularios con validaciones claras.
Diseño responsive.
Navegación intuitiva.
Ejemplos de estados vacíos:
"Todavía nadie se ha atrevido a confesar su crush 👀"
"Tu buzón está vacío... por ahora. 💌"
La aplicación debe tener personalidad sin sacrificar claridad.

23. Arquitectura
Quiero una arquitectura organizada y modular.
Separar adecuadamente:
Componentes.
Páginas/vistas.
Servicios de Firebase.
Autenticación.
Hooks.
Modelos/tipos.
Utilidades.
Lógica de declaraciones.
Lógica de proximidad.
Sistema de notificaciones.
Estilos.
Evitar colocar toda la lógica dentro de un único componente.
Los componentes visuales deben ser reutilizables.

24. Modelo de datos
Antes de implementar Firebase, diseñar el modelo de datos necesario.
Como mínimo considerar entidades equivalentes a:
Users
id
username
firstName
lastName
email
createdAt
locationEnabled
notificationEnabled
Declarations
id
authorId
recipientId
recipientName
isPublic
isAnonymous
body
font
backgroundStyle
createdAt
Proximity Alerts
id
admirerId
recipientId
declarationId
createdAt
lastNotificationAt
El modelo puede modificarse si Firebase/Firestore requiere una estructura diferente.
No crear campos innecesarios.

25. Git Flow
Quiero utilizar Git Flow durante todo el desarrollo.
Debemos trabajar con:
main
develop
qa
Y ramas feature/ y hotfix/ cuando corresponda.
No quiero hacer todo directamente sobre main.
Cada funcionalidad importante deberá desarrollarse en su propia rama.
Ejemplos:
feature/project-setup
feature/firebase-auth
feature/user-registration
feature/declaration-crud
feature/declaration-privacy
feature/declaration-customization
feature/feed
feature/love-alarm
feature/proximity-notifications
feature/responsive-ui
Los nombres pueden ajustarse según el progreso real del proyecto.

26. Commits
Los commits deben ser pequeños, descriptivos y relacionados con un solo cambio lógico.
Utilizar Conventional Commits cuando sea apropiado:
feat:
fix:
refactor:
style:
chore:
docs:
test:
Ejemplos:
feat: add Firebase authentication
feat: create declaration form
feat: add anonymous declaration support
feat: add declaration background themes
fix: prevent duplicate proximity alerts
style: improve notebook declaration layout

27. Pull Requests
Cada feature importante debe seguir el flujo:
feature → develop → qa → main
Antes de realizar un merge:
Verificar que compile.
Ejecutar la aplicación.
Probar la funcionalidad.
Revisar errores de consola.
Revisar responsive design.
Revisar reglas de Firebase cuando aplique.
No crear Pull Requests artificiales únicamente para aumentar el número de PRs.
Cada PR debe representar un cambio lógico real.

28. Desarrollo por etapas
No quiero implementar todo de una vez.
Quiero desarrollar el proyecto por fases.
Fase 1 — Planificación
Analizar requerimientos.
Definir arquitectura.
Definir modelo de datos.
Definir estructura del proyecto.
Definir Git Flow.
Fase 2 — Configuración
Crear proyecto React.
Configurar Firebase.
Configurar variables de entorno.
Configurar herramientas necesarias.
Configurar estructura inicial.
Fase 3 — Autenticación
Registro.
Login.
Logout.
Persistencia de sesión.
Validaciones.
Fase 4 — Declaraciones
Crear.
Leer.
Editar si se considera necesario.
Eliminar si se considera necesario.
Público/privado.
Anónimo/no anónimo.
Destinatarios.
Fase 5 — Personalización
Fuentes.
Hoja de cuaderno.
Post.
Post-it.
Corazón.
Fase 6 — Feed
Feed público.
Feed privado para usuarios autenticados.
Filtros necesarios.
Estados vacíos.
Responsive.
Fase 7 — Love Alarm
Permisos de ubicación.
Configuración de proximidad.
Detección.
Asociación admirador/destinatario.
Cooldown.
Notificaciones.
Fase 8 — UI/UX
Bento Box.
Animaciones.
Responsive.
Microinteracciones.
Estados de carga/error.
Pulido visual.
Fase 9 — QA
Pruebas funcionales.
Pruebas de autenticación.
Pruebas de privacidad.
Pruebas de Firebase.
Pruebas responsive.
Pruebas del sistema de proximidad.
Fase 10 — Entrega
Limpieza del código.
README.
Documentación.
Variables de entorno documentadas.
Revisión de seguridad.
Merge final a main.

29. Regla importante para trabajar conmigo
No quiero que implementes todo el proyecto automáticamente.
Quiero avanzar paso a paso.
Antes de cada etapa:
Explica brevemente qué vamos a hacer.
Indica qué archivos/componentes se crearán o modificarán.
Indica qué rama Git debemos utilizar.
Propón los commits correspondientes.
Si la implementación puede realizarse mejor utilizando un prompt para Antigravity, escríbeme el prompt completo y listo para copiar y pegar.
Después de que yo implemente el cambio, ayúdame a verificarlo antes de pasar a la siguiente etapa.
Si detectas que estoy intentando implementar algo que puede generar problemas técnicos, de seguridad, privacidad o alcance, detente y explícame el problema antes de continuar.
No quiero sobreingeniería.
El objetivo es construir un MVP académico funcional, bonito, demostrable y técnicamente sólido, pero dejando una arquitectura que permita evolucionarlo posteriormente.

30. Prioridad del proyecto
La prioridad debe ser:
Cumplir todos los requerimientos obligatorios de la asignación.
Tener autenticación y seguridad correctamente implementadas.
Tener un CRUD funcional para las declaraciones.
Tener una experiencia de usuario pulida.
Implementar la personalización visual.
Implementar Love Alarm como funcionalidad diferenciadora.
Mantener el código organizado y documentado.
Mantener Git Flow durante todo el desarrollo.
No sacrificar funcionalidades académicas obligatorias por implementar funcionalidades adicionales.

Resultado esperado
El resultado final debe sentirse como una pequeña red social universitaria donde los estudiantes puedan dejar confesiones románticas, pero con una identidad visual basada en cuadernos y cartas.
La característica que diferencia el proyecto será ITLA Love Alarm:
"Quizás tu crush no sabe quién eres... pero ITLA Crush sabe que está cerca. ❤️"
Quiero que el proyecto sea técnicamente realista, visualmente memorable y suficientemente diferente como para que no parezca simplemente una implementación genérica de la asignación.
