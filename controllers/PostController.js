import Role from "../Models/Role.js";
import PostSerivce from "../Services/PostService.js";

class PostController {
  async create(req, res) {
    try {
      console.log(req.body)
      const anime = await PostSerivce.create(req.body);
      
      return res.json(anime);
    } catch (e) {
      console.log(e)
      return res.status(500).json(e);
    }
  }
  async getAll(req, res) {
    try {
      const userRole = new Role()
      const adminRole = new Role({value:"ADMIN"})
      await userRole.save()
      await adminRole.save()
      const animes = await PostSerivce.getAll();
      
      return res.json(animes);
    } catch (e) {
      return res.status(500).json(e);
    }
  }
  async getOne(req, res) {
    try {
      const { id } = req.params;
      if (!id) {
        res.status(400).json({ message: "Id не указан" });
      }
      const anime = await PostSerivce.getOne(id);
      return res.json(anime);
    } catch (e) {
      return res.status(500).json(e);
    }
  }
  async update(req, res) {
    try {
      const updatedAnime =  PostSerivce.update(req.body);
      return res.json(updatedAnime);
    } catch (e) {
      return res.status(500).json(e);
    }
  }

  async delete(req, res) {
    try {
      const anime = await PostSerivce.create(req.params.id);
      return res.json(anime);
    } catch (e) {
      return res.status(500).json(e);
    }
  }

  async delete(req, res) {
    try {
      const anime = await PostSerivce.create(req.params.id);
      return res.json(anime);
    } catch (e) {
      return res.status(500).json(e);
    }
  }

  async getAllbyGenre(req, res) {
    try {
      // console.log(req.params.genre)
      const animes = await PostSerivce.getAll();
      console.log(animes)
      return res.json(animes);
    } catch (e) {
      console.log('Привет')
      return res.status(500).json(e);
    }
  }
  // Жанры 
  async getAllGenres(req, res) {
    try {
      const genres = await PostSerivce.getAllGenres();
      
      return res.json(genres);
    } catch (e) {
      return res.status(500).json(e);
    }
  }
  
  async createGenre(req, res) {
    try {
      
      const genre = await PostSerivce.createGenre(req.body);
      return res.json(genre);
    } catch (e) {
      return res.status(500).json(e);
    }
  }

  async getIdGenre(req,res){
    try {
      const { genre } = req.params;
      if (!genre) {
        res.status(400).json({ message: "Параметр жанра не указан" });
      }
      const id = PostSerivce.findByParam(genre);
      return res.json(id);
    } catch (e) {
      return res.status(500).json(e);
    }
  }
  async getIdGenreByName(req,res){
    try {
      const { genreName } = req.params;
      if (!genreName) {
        res.status(400).json({ message: "Параметр жанра не указан" });
      }
      const id = PostSerivce.findIdByName(genreName);
      return res.json(id);
    } catch (e) {
      return res.status(500).json(e);
    }
  }
  
  //
  //Сортировка
  async getAllwithSort(req,res){
    try {
      const {sort, search, genre} = req.query
      let genreId
      const sortedArr = await PostSerivce.getAllwithSort(sort)
      if(genre){
        genreId = await PostSerivce.findByParam(genre)
       
      }
      let result = sortedArr
      
      if(search){
        result = await PostSerivce.getSearch(search, sortedArr)
       
      }
      
      if(genre){
      
        result = await PostSerivce.getAllbyGenre(genreId,result)
       
      }
      
      return res.json(result);
      
    } catch (e) {
      
      return res.status(500).json(e);
    }
  }
  //Поиск
  // async getSearch(req,res){
  //   try {
      
  //     const { sort, search } = req.params;
  //     console.log(req.params)
  //     const sortedArr = await PostSerivce.getAllwithSort(sort, search)
  //     const result = await PostSerivce.getSearch(search, sortedArr)
      
  //     return res.json(result);
  //   } catch (e) {
  //     return res.status(500).json(e);
  //   }
  // }

}

export default new PostController();
