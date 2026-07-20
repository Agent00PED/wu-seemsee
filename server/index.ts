import express from "express";
import cors from "cors";
import fortuneRoutes from "./routes.js";

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.use("/api/fortunes", fortuneRoutes);

app.listen(PORT, () => {
  console.log(`WU SaimSee server รันที่ http://localhost:${PORT}`);
});
