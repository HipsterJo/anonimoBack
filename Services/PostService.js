import Anime from "../Models/Anime.js";
import Genre from "../Models/Genre.js"

class PostService {
  async create(anime) {
    const genres = []
    
    for (let genre of anime.genre){
      genre = await this.findByParam(genre)
      
      genres.push({_id:genre._id.toString()})
    }
    anime.genre = genres
    console.log(anime)
    
    const createdAnime = await Anime.create(anime);
    return createdAnime;
  }
  async findById(id){
    const anime = await Anime.findById(id);
    return anime;
  }

  async getAll() {
    const animes = await Anime.find();
  
    return animes;
  }
  async getOne(id) {
    if (!id) {
      throw new Error("не указан ID");
    }
   
    const anime = await Anime.findById(id);
    
    const genresAnime =  await Promise.all(anime.genre.map(
        async (obj) =>{
          
          const result = await this.findNameById(obj)
          
          return result
        }
    ))
    
    anime.genre.length=0; 
    anime.genre.push(...genresAnime)
    
    return anime;
  }

  async update(anime) {
    if (!anime._id) {
      throw new Error("не указан ID");
    }
    const updatedAnime = await Anime.findByIdAndUpdate(anime._id, anime, {
      new: true,
    });
    return updatedAnime;
  }

  async delete(id) {
    if (!id) {
      throw new Error("не указан ID");
    }
    const anime = await Anime.findByIdAndDelete(id);
    return anime;
  }

  // async getAllbyGenre(allAnimes, genre){
  //   if (!animes){
  //     throw new Error("Нет аниме")
  //   }
  //   const animesByGenre = allAnimes.map(
  //     (value)=>{
  //       if (value.genre.includes(genre)){
  //           return value
  //       }
  //     }
  //   )
  //   if(!animesByGenre){
  //     throw new Error("Нет аниме такого жанра")
  //   }
  //   return animesByGenre
    
  // }


  //Жанры
  async createGenre(genre) {
    const createdGenre= await Genre.create(genre);
    return createdGenre;
  }
  async getAllGenres() {
    const genres = await Genre.find();
  
    return genres;
  }
  async findByParam(genre){
    console.log(genre)
    const obj = await Genre.find({param: genre.toLowerCase().trim() })
    
    if (!obj){
      throw new Error("Жанр не найден!");      
    }
    
    const id = obj[0]._id
  
    return id
  }
  async findIdByName(genre){
    const obj = await Genre.find({name: genre})
    
    if (!obj){
      throw new Error("Жанр не найден!");      
    }
    
    const id = obj[0]._id
  
    return id
  }
  async findNameById(_id){
    const genre = await Genre.findById(_id)
    if (!genre ){
      throw new Error("Жанр не найден!");      
    }
    
    const result = genre.name +"_"+ genre.param
    return result
  }
  //
  //Сортировка
  async getAllwithSort(sort){
    switch(sort){
      case "dataPublish":
        return await Anime.find().sort({dataPublish: 1})
      case "dataRealese":
        return await Anime.find().sort({dataRealese: 1})
      case "rating":
        const sortAr = await Anime.find().sort({rating: -1})
        return sortAr
      case "name":
        return await Anime.find().sort({name: 1})
      default: 
        return Anime.find().sort({name: 1})
    }
  }
  //Search
  getSearch(search, sortedArr){
    
    const result = sortedArr.filter(
      (obj)=>{
        if (obj.name.toLowerCase().includes(search.toLowerCase())){
         
          return true
        }
        return false
      }
    )
    
    return  result
  }
  getAllbyGenre(genreId, sortedArr){
    const result = sortedArr.filter(
      (obj)=>{
        if (obj.genre.includes(genreId)){
         
          return true
        }
        return false
      }
    )
    return result
  }
}

export default new PostService();
