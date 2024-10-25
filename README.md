# AI Interview Application

This project implements an AI-powered interview application built with a modern full-stack architecture. It utilizes Next.js for the interactive frontend and Flask for the robust backend API.

## Key Technologies

- **Frontend**: Next.js
- **Backend**: Flask
- **(Optional)** Python virtual environment (for managing dependencies)

---

## Table of Contents

- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
  - [Frontend (Next.js)](#frontend-nextjs)
  - [Backend (Flask)](#backend-flask)
- [Running the Application](#running-the-application)
  - [Starting the Backend](#starting-the-backend)
  - [Starting the Frontend](#starting-the-frontend)
- [API Endpoints](#api-endpoints-to-be-added)
- [Contributing](#contributing-optional)

---

## Getting Started

To get this AI interview application up and running, follow the steps for setting up both the frontend (Next.js) and backend (Flask) environments.

## Project Structure

```bash
project-root/
├── backend/
│   ├── main.py      # Main Flask app file
│   ├── requirements.txt  # Python dependencies
│   └── ...          # Other backend-related files
├── app/
├── components/
├── lib/
├── README.md       # Project documentation
├── package.json     # Next.js dependencies
└── ...
```

## Prerequisites

This project requires the following tools installed on your system:

- **Node.js** (v14 or later)
- **Python** (v3.7 or later)
- **virtualenv** (Optional): For managing Python environments and dependencies isolated from the system-wide installation.

---

## Installation

### 1. Clone the Repository

Begin by cloning the repository using Git:

```bash
git clone https://github.com/kvichave/AInterview.git
cd AInterview
```
### 2. Frontend (Next.js) Setup

Navigate to the project root directory and install the required Next.js dependencies:

```bash
npm install
```

### 3. Backend (Flask) Setup
Move to the backend folder and consider creating a virtual environment using virtualenv for dependency isolation:
```cd backend
virtualenv venv
source venv/bin/activate  # Activate the virtual environment (Windows: venv\Scripts\activate)
```
Next, install the Flask dependencies listed in requirements.txt:

```bash
pip install -r requirements.txt
```
## Running the Application
### 1. Starting the Backend
With the virtual environment activated in the backend folder, launch the Flask server:

You need to create a .env containing [Gemini API](https://aistudio.google.com/app/apikey) 
```
.env
GEMINI_API_KEY=<KEY>
```


```
python main.py
By default, the backend server runs on http://127.0.0.1:5000 (modify the port if needed).
```
### 2. Starting the Frontend
In the project root directory, run the Next.js development server:

```
npm run dev
```
The Next.js frontend typically starts on http://localhost:3000 (modify the port if needed).


## Screenshots

![user profile](/images/1.png)
![interview](/images/2.png)

