import { Router } from "express";
import PostController from "../controllers/PostController.js"
import checkRole from "../middleware/checkRole-middleware.js";

const router = new Router();

router.post("/animes", checkRole(['ADMIN']), PostController.create);
router.get("/animes", PostController.getAll);

router.get("/animes/sortBy/", PostController.getAllwithSort);


router.get("/animes/:id", PostController.getOne);
router.put("/animes", checkRole(['ADMIN']), PostController.update);
router.delete("/animes/:id", checkRole(['ADMIN']), PostController.delete);
router.get("/animesById/:genre", PostController.getAllbyGenre);

router.post("/genres", checkRole(['ADMIN']), PostController.createGenre);
router.get("/genres", PostController.getAllGenres);
router.get("/genres/:genre", PostController.getIdGenre);
router.get("/genreId/:name", PostController.getIdGenreByName);




export default router;
 