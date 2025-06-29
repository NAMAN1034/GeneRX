GeneRX

A full-stack pharmacogenomics web application for personalized health insights based on SNP data. Built for the Congressional App Challenge.

Features

Upload .csv files with SNP data (rsid, chromosome, position, genotype).
Analyze pharmacogenomic and lifestyle SNPs using the PharmGKB API or mock data.
Generate reports with drug response and lifestyle recommendations.
Interactive visualizations (charts, tables).
Dark/light mode toggle.
Responsive design with six pages: Welcome, Upload, Report, Crash Course, Fun Facts, About Us.

Setup

Clone the repository.
Install frontend dependencies: npm install
Initialize TailwindCSS: npx tailwindcss init -p
Install backend dependencies:cd server
npm install
Create a .env file in server/ with your PharmGKB API key (optional):PHARMGKB_API_KEY=your_api_key_here
Run the backend:cd server && node server.js
Run the frontend:cd .. && npm start
Build for production:npm run build

Usage

Upload a .csv file with SNP data on the Upload page.
View your personalized report on the Report page.
Explore educational content on the Crash Course and Fun Facts pages.

Notes

Obtain a PharmGKB API key from https://www.pharmgkb.org/ for full functionality.
The app uses mock data if no API key is provided.
