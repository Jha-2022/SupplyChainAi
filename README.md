## SupplyChainAI
**SupplyChainAI** is a full-stack application designed to optimize and manage supply chain logistics through AI-powered insights and real-time tracking.
The project integrates Google's Generative AI for intelligent chat assistance and Google Maps for visualizing delivery routes.

### 🚀 Key Features
**AI Chat Assistant:** Integrated with Google Gemini (GenAI) to provide supply chain support and logistics insights.

**Order Management:** View and track status for multiple orders.

**Real-time Route Mapping:** Visualization of delivery paths using the Google Maps API.

**Inventory Dashboard:** Overview of stock levels and warehouse status.

**Responsive UI:** Modern, component-based frontend built with React.



### 🛠️ Tech Stack
**Backend**
***Runtime:*** Node.js  

***Framework:*** Express.js  

***AI Integration:*** Google Generative AI (@google/genai)  

***Containerization:*** Docker


**Frontend**
***Library:*** React.js

***Maps API:*** Google Maps JavaScript API (@react-google-maps/api)

***Styling:*** Modern CSS/React Components


## ⚙️ Installation & Setup
**Prerequisites**
* Node.js and npm installed.

* A Google Cloud Project for AI and Maps API keys.

1. Backend Setup
Navigate to the directory: `cd backend`

  

2. Install dependencies: `npm install`

3. Create a `.env` file and add your credentials:
`
PORT=5000
GOOGLE_GENAI_API_KEY=your_gemini_api_key`

Start the server: `node server.js`

2. Frontend Setup
Navigate to the directory: cd frontend

Install dependencies: npm install

Configure your Google Maps API Key in src/components/RoutesPage.jsx within the <LoadScript> tag.

Start the app:  `npm run dev`

🐳 Docker Support
You can run the backend in a containerized environment:  

Build the image: docker build -t supplychain-backend ./backend

  

Run the container: docker run -p 5000:5000 supplychain-backend
