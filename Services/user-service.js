import User from "../Models/user-model.js";
import Token from "../Models/token-models.js";
import bcrypt from "bcrypt";
import tokenService from "./token-service.js";
import mailService from "./mail-service.js";
import TokenService from "./token-service.js";
import { v4 as uuidv4 } from "uuid";
import apiError from "../exception/api-error.js";
import Role from "../Models/Role.js";

class UserService {
  async registration(email, password) {
    const candidate = await User.findOne({ email });

    if (candidate) {
      
      throw apiError.BadRequest("Пользователь с таким email существует")
    }

    const hashPassword = await bcrypt.hash(password, 3);
    const activateLink = uuidv4();

    await mailService.sendActivationMail(
      email,
      `${process.env.API_URL}/auth/activate/${activateLink}`
    );
    const userRole = await Role.findOne({value:"USER"})
    const user = await User.create({
      email,
      password: hashPassword,
      isActivated: false,
      activatedLink: activateLink,
      roles:[userRole.value]
    });
    

    const userDto = {
      email: user.email,
      id: user._id,
      isActivated: user.isActivated,
      roles: user.roles
    };

    const tokens = await TokenService.generateToken({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return {
      ...tokens,
      user: userDto,
    };
  }

  async activate(activateLink) {
    
    const user = await User.findOne({ activateLink });
  
    if (!user) {
      throw apiError.BadRequest("Неккоректная ссылка активация");
    }
    user.isActivated = true;
    await user.save();
    
  }

  async login (email, password) {
    const user = await User.findOne({ email });
    if (!user) {
      throw apiError.BadRequest("Пользователь с таким email не найден");
    }
    const isPassEquals = await bcrypt.compare(password, user.password);
    if (!isPassEquals) {
      throw apiError.BadRequest("Неверный пароль");
    }
    const userDto = {
      email: user.email,
      id: user._id,
      isActivated: user.isActivated,
      roles: user.roles
    };
    const tokens = await TokenService.generateToken({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);
    
    return {
      ...tokens,
      user: userDto,
    };
  }

  async logout(refreshToken) {
    const token = await tokenService.logout(refreshToken);
    return token;
  }

  async refresh(refreshToken) {
    if(!refreshToken){
      throw apiError.UnauthorizedError();
    }
    const userData = tokenService.validateRefreshToken(refreshToken);
    const tokenFromDb = await tokenService.findToken(refreshToken);
    console.log(tokenFromDb)
    if (!userData || !tokenFromDb) {
      throw apiError.UnauthorizatedError();
    }
    const user = await User.findById(userData.id);
    
    const userDto = {
      email: user.email,
      id: user._id,
      isActivated: user.isActivated,
      roles: user.roles
    };
    const tokens = await TokenService.generateToken({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return {
      ...tokens,
      user: userDto,
    };
  }

  async getAllUsers() {
    try{
      const users = await User.find();
      return users;
    }catch{
      next(e);
    }
  }
}

export default new UserService();
