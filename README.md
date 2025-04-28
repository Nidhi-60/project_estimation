# 🚀 Estimation Project

### 💻 Requirements

Node.js **v20.12.2**

### 📌 GitHub Repository

> [GitHub Link Here](https://github.com/Nidhi-60/project_estimation.git)

### 📥 Installation

1. Clone the repository:

git clone <https://github.com/Nidhi-60/project_estimation.git>

2. Create a `.env` file in the root directory and add:

VITE_API_LINK=http://localhost:3000

3. Install dependencies:

npm install

4. Run the project:

npm run dev

5. Login to app

username : admin@gmail.com

password : admin

### 📂 Project Structure

```
/src
  ├── /assets       // Static assets (images, fonts, etc.)
  ├── /common       // Common reusable components or utils
  ├── /components   // Reusable UI Components
  ├── /config       // Configuration files (THEME setup)
  ├── /constants    // Constants and enums
  ├── /container    // Container components (connects state and presentation)
  ├── /helper       // Helper functions (custom hook helpert )
  ├── /redux        // Redux slices and store configuration
  ├── /router       // Routing (React Router setup)
  ├── /translate    // Translation files (i18n)
  ├── /utils        // Utility functions (e.g., date formatting, etc.)
.env
package.json
vite.config.ts
README.md


---

### ✨ Feature Implementation

- **Environment Based API Handling** (`VITE_API_LINK`)
- **RTK Query Integration** for API management
- **Ant Design (antd)** used for UI components
- ** multilanguage support (English , Gujrati)
- **Dynamic Cards / Dashboard**
- **Status-based Badge Color and Icon Management**
- **Modal Management using Ant Design**
- **Filtering Data using `json-server` API**
- **global Theme change **



### 🛠 JSON-Server Setup

Mock backend powered by **json-server**.

Start the server:

npx json-server --watch db.json --port 3000
```

- Example API endpoints:

  - `GET /projects`
  - `POST /projects`
  - `PATCH /projects/:id`
  - `DELETE /projects/:id`

  - `GET /estimations`
  - `POST /estimations`
  - `PATCH /estimations/:id`
  - `DELETE /estimations/:id`

---
