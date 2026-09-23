# Fullstack MERN Application (`fullstackmearn`)

> Migrated and enhanced from [gokulm25csc-cmyk/laddu](https://github.com/gokulm25csc-cmyk/laddu) into a clean, complete, and production-ready MERN stack architecture.

---

## 🚀 Overview

This repository transforms the initial JavaScript demo code from the `laddu` repository into a full-featured MERN (MongoDB, Express, React, Node.js) web application.

### Key Transferred Features:
- **JavaScript Variables & Scopes (`variable.js`)**:
  - `var name = "gokul"` (Function/Global scope & hoisting)
  - `{ let age = 19; console.log(age) }` (Block scoping isolation)
  - `const country = "india"` (Constant binding & immutability)
- **JavaScript Operators (`opreators.js` -> `operators.js`)**:
  - **Arithmetic Operators** (`+`, `-`, `*`, `/`, `**`, `%`) with default baseline (`a=30, b=38`)
  - **Assignment Operators** (`+=`, `-=`, `*=`, `/=`) with default baseline (`a=20, b=39`)
  - **Comparison Operators** (`==`, `<=`, `>=`, `!=`, `===`, `!==`) with default baseline (`a=20, b=40`)
- **Interactive UI**:
  - Real-time parameter tweaking and evaluation
  - Live console logs mimicking native browser console behavior
  - Source code vs. target architecture difference explorer
- **Backend API & Database**:
  - Express REST APIs for arithmetic, assignment, comparison, variables, and scope simulations
  - Mongoose models (`VariableRecord`, `CalculationHistory`) with seamless in-memory fallback when MongoDB is offline

---

## 📁 Project Structure

```text
fullstackmearn/
├── .env.example                # Root environment variables template
├── .gitignore                  # Git ignore rules for node_modules, build artifacts, etc.
├── package.json                # Root orchestration scripts (dev, start, install-all)
├── README.md                   # Project documentation
├── backend/                    # Node.js + Express API server
│   ├── .env.example            # Backend env template (PORT, MONGODB_URI)
│   ├── package.json            # Backend dependencies (express, mongoose, cors, dotenv)
│   ├── src/
│   │   ├── server.js           # Server bootstrap and middleware configuration
│   │   ├── config/
│   │   │   └── db.js           # MongoDB connection with safe in-memory fallback
│   │   ├── models/
│   │   │   ├── CalculationHistory.js # Mongoose model for calculations
│   │   │   └── VariableRecord.js     # Mongoose model for variable snapshots
│   │   ├── controllers/
│   │   │   ├── operators.controller.js # Calculations and batch demo controller
│   │   │   └── variables.controller.js # Variables and scope controller
│   │   └── routes/
│   │       ├── operators.routes.js     # /api/operators endpoints
│   │       └── variables.routes.js     # /api/variables endpoints
│   └── tests/
│       └── api.test.js         # Automated backend test suite
└── frontend/                   # React + Vite Single Page Application
    ├── index.html              # HTML5 entry template (fixed viewport)
    ├── package.json            # Frontend dependencies (react, lucide-react, vite)
    ├── vite.config.js          # Vite config with /api proxy to backend
    ├── public/
    │   └── legacy/             # Preserved standalone original scripts
    │       ├── index.html
    │       ├── operators.js
    │       └── variable.js
    └── src/
        ├── main.jsx            # React root mount
        ├── App.jsx             # Main application shell & tab navigation
        ├── index.css           # Glassmorphism dark mode styles
        └── components/
            ├── VariablesDemo.jsx    # Interactive variable & scope tester
            ├── OperatorsDemo.jsx    # Interactive arithmetic, assignment, comparison lab
            ├── ConsoleOutput.jsx    # Emulated JavaScript execution console
            └── SourceCodeViewer.jsx # Traceability & diff inspection
```

---

## 🛠️ Getting Started

### Prerequisites
- **Node.js**: `v18+` (Tested on `v24.20.0`)
- **npm**: `v9+`
- **MongoDB** *(Optional)*: If running locally or via MongoDB Atlas. (The application runs with built-in in-memory storage fallback if MongoDB is not present).

---

### Installation

Install dependencies for all workspaces:

```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

Or from the root directory:
```bash
npm run install-all
```

---

### Running the Application

#### Option 1: Run Fullstack Together (Concurrent)
```bash
npm run dev
```

#### Option 2: Run Backend and Frontend Separately

1. **Start Backend**:
   ```bash
   cd backend
   npm start
   # Server runs on http://localhost:5000
   ```

2. **Start Frontend**:
   ```bash
   cd frontend
   npm run dev
   # Client runs on http://localhost:5173
   ```

---

## 🔌 API Endpoints Reference

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health` | Service health status and database connection info |
| `GET` | `/api/operators/demo` | Runs full baseline source tests (`opreators.js`) |
| `GET` | `/api/operators/arithmetic?a=30&b=38` | Evaluates `+`, `-`, `*`, `/`, `**`, `%` |
| `GET` | `/api/operators/assignment?a=20&b=39` | Evaluates `+=`, `-=`, `*=`, `/=` |
| `GET` | `/api/operators/comparison?a=20&b=40` | Evaluates `==`, `<=`, `>=`, `!=`, `===`, `!==` |
| `GET` | `/api/operators/history` | Retrieves calculation history |
| `POST` | `/api/operators/history` | Saves calculation entry |
| `GET` | `/api/variables` | Returns current variable state & scoping rules |
| `POST` | `/api/variables` | Updates variable state |
| `GET` | `/api/variables/scope-test` | Runs block-scope and constant immutability test |

---

## 🧪 Testing

Run the automated backend test suite:
```bash
cd backend
npm test
```

---

## 🔒 Security & Environment
- Passwords and secret credentials are never committed.
- Copy `.env.example` to `.env` in the root or `backend/` directory to configure environment overrides.

---

## 📜 License
MIT License