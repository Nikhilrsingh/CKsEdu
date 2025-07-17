const DEV_MODE = import.meta.env.VITE_APP_MODE;
console.log(DEV_MODE)
let BACKEND_URL;

if (DEV_MODE === "DEV") {
  BACKEND_URL = "http://localhost:2590";
} else if (DEV_MODE === "PROD") {
  BACKEND_URL = "https://cksedu-backend.vercel.app";
}

export default BACKEND_URL;
