SupplyChainAI
=============

**SupplyChainAI** is a full-stack application designed to optimize and manage supply chain logistics through AI-powered insights and real-time tracking. The project integrates Google's Generative AI for intelligent chat assistance and Google Maps for visualizing delivery routes.


  <p align="center">
  <img src="frontend/public/h2ssnapshor2.png" width="47%" alt="Dashboard Overview" />
  <img src="frontend/public/h2ssnapshot1.png" width="47%" alt="Route Mapping" />
</p>




🚀 Key Features
---------------

*   **AI Chat Assistant**: Integrated with Google Gemini (GenAI) to provide supply chain support and logistics insights.
    
*   **Order Management**: View and track status for multiple orders.
    
*   **Real-time Route Mapping**: Visualization of delivery paths using the Google Maps API.
    
*   **Inventory Dashboard**: Overview of stock levels and warehouse status.
    
*   **Responsive UI**: Modern, component-based frontend built with React.

    https://github.com/user-attachments/assets/34cb457d-b5be-4877-8052-575b37e3454a


🛠️ Tech Stack
--------------

### Backend

*   **Runtime**: Node.js
    
*   **Framework**: Express.js
    
*   **AI SDK**: `@google/genai` (Google Gemini API)

*   **Environment**: `dotenv` for secure credential management

### Frontend

*   **Library**: React.js
    
*   **Maps API**: Google Maps JavaScript API (@react-google-maps/api)
    
*   **Styling**: Modern CSS/React Components
    

⚙️ Installation & Setup
-----------------------

### Prerequisites

*   Node.js and npm installed.
    
*   A Google Cloud Project for AI and Maps API keys.
    

### 1\. Backend Setup

1.  Navigate to the directory: `cd backend`
    
2.  Install dependencies: `npm install`
    
3.  Create a `.env` file and add your credentials:
    `
      PORT = 5000\
      GOOGLE_GENAI_API_KEY=your_gemini_api_key
    `
    
5.  Start the server: `node server.js`
    

### 2\. Frontend Setup

1.  Navigate to the directory: `cd frontend`
    
2.  Install dependencies: `npm install`
    
3.  Configure your Google Maps API Key in `src/components/RoutesPage.jsx` within the tag.
    
4.  Start the app:  `npm run dev`
    

🐳 Docker Support
-----------------

You can run the backend in a containerized environment:

📁 Project Structure
--------------------

```
  jha-2022/supplychainai/
├── backend/                        # Node.js/Express Server[cite: 1]
│   ├── node_modules/               # Backend dependencies[cite: 1]
│   ├── .env                        # Environment variables (API Keys)[cite: 1]
│   ├── Dockerfile                  # Containerization configuration[cite: 1]
│   ├── package-lock.json           # Locked dependency versions[cite: 1]
│   ├── package.json                # Project dependencies and scripts[cite: 1]
│   └── server.js                   # Express server entry point[cite: 1]
└── frontend/                       # React/Vite Client-side Application
    ├── node_modules/               # Frontend dependencies
    ├── public/                     # Static assets
    ├── src/                        # Source code
    │   ├── components/             # Reusable UI Components
    │   │   ├── Chat.jsx            # AI Logistics Assistant interface
    │   │   ├── Dashboard.jsx       # Inventory & status overview
    │   │   ├── OrdersPage.jsx      # Order management table
    │   │   └── RoutesPage.jsx      # Google Maps route visualization
    │   ├── App.css                 # Global styles
    │   ├── App.jsx                 # Main application component
    │   ├── index.css               # Base styles
    │   └── main.jsx                # React application entry point
    ├── .gitignore                  # Git exclusion rules
    ├── index.html                  # HTML template
    ├── package-lock.json           # Locked dependency versions
    ├── package.json                # Project dependencies and scripts
    └── vite.config.js              # Vite build configuration
  ```
