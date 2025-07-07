# ☑️ To do App

Una aplicación de lista de tareas (To-Do App) construida con **TypeScript** tanto en el frontend como en el backend. El backend utiliza **Node.js** con **Prisma ORM** y **PostgreSQL** como base de datos, mientras que el frontend está desarrollado con **React + Vite**.

---

## 📖 Introducción

Esta aplicación permite crear, marcar como importantes o completadas, editar y eliminar tareas. Está diseñada como un proyecto fullstack moderno y modular, ideal para uso personal o como base para proyectos más complejos.

Tecnologías utilizadas:

- **Frontend:** React + TypeScript + Vite + Ant Design
- **Backend:** Node.js + TypeScript + Express + Prisma
- **Base de datos:** PostgreSQL
- **Contenedores:** Docker + Docker Compose

---

## 🚀 Ejemplo de despliegue

El código de este proyecto de encuentra desplegado en el siguiente sitio:

- [To Do App](https://mvdevs.dynns.com/todo-app)

---

## ✅ Requisitos previos

Antes de comenzar, asegurate de tener instalado:

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)
- (Opcional) Node.js y npm si querés trabajar fuera de los contenedores

---

## ⚙️ Paso a paso

### 1. Clonar el repositorio

```bash
git clone https://github.com/ManuelVelasco99/todo-app.git
cd todo-app
```

### 2. Copiar archivos `.env`

- Copiar `.env` en la raíz del proyecto:

```bash
cp .env.example .env
```

- Copiar `.env` para el backend:

```bash
cp backend/.env.example backend/.env
```

- Copiar `.env` para el frontend:

```bash
cp frontend/.env.example frontend/.env
```

> Asegurate de revisar cada archivo `.env` para configurar tus variables de entorno si lo necesitás. (De no modificar nada, los .env.exmple se encuentran listos para funcionar)

---

### 3. Levantar los contenedores

Ubicándote en la raíz del proyecto, ejecutá:

```bash
docker compose up
```

Esto iniciará los servicios:

- Base de datos PostgreSQL
- Backend (Node.js + Express)
- Frontend (React)

---

### 4. Ejecutar migraciones de la base de datos

Con los contenedores corriendo, posicionate en la raíz del backend:

```bash
cd backend
```

Luego ejecutá las migraciones en el contenedor del backend:

```bash
docker exec -it todo-backend npx prisma migrate deploy
```

---

## ✅ Listo

La aplicación debería estar corriendo en:

- **Frontend:** [http://localhost:5173](http://localhost:5173)
- **Backend:** [http://localhost:4000](http://localhost:4000)

(Si no modificaste los puertos por defecto)

---

## 📦 Estructura del proyecto

```
todo-app/
│
├── backend/            # API REST en Node.js con Express y Prisma
├── frontend/           # Aplicación React con Vite
├── docker-compose.yml  # Orquestación de contenedores
├── .env                # Variables globales (puertos, etc.)
└── README.md           # Este archivo
```

---

## 🧑‍💻 Autor

Desarrollado por Velasco Manuel

