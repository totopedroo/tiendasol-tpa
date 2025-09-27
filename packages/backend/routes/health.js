import express from "express";

const pathHealth = "/health";

export default function healthRoute() {
  const router = express.Router();

  router.get(pathHealth, (req, res) => {
    res.status(200).send("OK");
  });

  return router;
}
