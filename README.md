# Vite React + Tauri Windows Application
This project integrates Vite, React, and Tauri to create a Windows desktop application.

# Application usecase
This application can be used as window or web to generate Invoice and store basic user Info

## 🚀 Setup

Please make sure that you configure the .env file using the .env.sample file.

## Vite Development & Build
Run the following commands:
```bash
npm run dev         # Start development server
npm run build       # Build the Vite project
```


## Tauri Development & Build
For developing and building the Tauri application:
```bash
npm run tauri:dev   # Start Tauri in development mode
npm run tauri:build # Build the Tauri application
```

## 🏗️ Output Files
After building the application, you can find the generated .msi or .exe files in:
src-tauri/target/release/bundle/



## 🔑 Usage
Before using the application:
- Mandatory to Add your user information to use the application.
- All the user data and data stored in the localstore/indexDB of the browser

