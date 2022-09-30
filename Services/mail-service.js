import User from "../Models/user-model.js";
import Token from "../Models/token-models.js"
import nodemailer from "nodemailer"
class mailService {

  constructor(){
    this.transporter = nodemailer.createTransport({
      service: 'gamil',
      host: "smtp.gmail.com",
      secure:false,
      auth:{
        user: "atapinyt@gmail.com",
        pass: "maehbzxuchlrmems"
      }
    })
  }


  async sendActivationMail(userEmail, link) {
   
    try{
     
    await this.transporter.sendMail({
      from: "atapinyt@gmail.com",
      to: userEmail,
      subject: "Активация аккаунта",
      text:"Hi" ,
      html:
      `<div>
          <h1>Для активации перейдите по ссылке: </h1>
          <a href=${link}}> ${link}</a>
      </div>`
    })}
    catch(err){
      console.log(err)
    }

  }
}

export default new mailService();



// ИГраемся с токенами

// Language: javascript

// Path: Services\mail-service.js

