import { Router } from "express";
import userManager from "../managers/userManagerMongo.js";

const uManager = new userManager();
const router = Router();

router

// Endpoint Login view
  .get("/login", (req, res) => {
    res.render("login", req);
  })
  // Endpoint Register view
  .get("/register", (req, res) => {
    res.render("register", req);
  })

  // Endpoint to register
  .post("/register", async (req, res) => {
    try {
      const { username, email, passw } = req.body;
        await uManager.createUser({ username, email, password: passw });
      res.status(200).redirect("/api/sessions/login");
    } catch (error) {
      res.status(500).send({ Message: error.message });
    }
  })
  
  // Endpoint to Login
  .post("/login", async (req, res) => {
    try {
      const { email, passw } = req.body;

      if(email === 'adminCoder@coder.com' && passw === 'adminCod3r123'){
        req.session.username = 'adminCoder'
        req.session.role = 'admin'
        res.status(200).redirect("/api/products")
      }
      let user = await uManager.getUsers({ email, password: passw });
      user = user[0];

      if (!user) return res.status(400).render("error");

      req.session.username = user.username;
      req.session.role = user.role;

      res.status(200).redirect("/api/products");
    } catch (error) {
      res.status(500).render("error");
    }
  })

  // Endpoint to Logout
  .post("/logout", (req, res) => {
    req.session.destroy();
    res.status(204).redirect("/api/sessions/login");
  });

export default router;
