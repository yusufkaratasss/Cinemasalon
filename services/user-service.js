const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const  jwt = require("jsonwebtoken");
const  cors = require("cors");
const { connect } = require("mongo");
const { MongoClient } = require("mongodb");
const userRepository = require("../repository/user-repository.js");
const _ = require("lodash");

// Kayıt olmak  için
exports.kayıtolUser = async (request, response) => {
    
    try {
    
        const { username, password, birthdate, tc, description } = request.body;

        const result = await userRepository.kayıtolUser(username, password, birthdate, tc, description);

        if (result && result.message === "Bu kullanıcı adı zaten kullanılıyor") {
        
            return response.status(400).json({
        
                message: "Bu kullanıcı adı zaten kullanılıyor"
            });
        } else {
        
            return response.status(200).json({
        
                message: "Başarılı bir şekilde kaydedildi"
            });
        }
       
    } catch (error) {
     
        console.error("Hata oluştu:", error);     
        return response.status(404).json({
     
            message: "Bir hata oluştu"
        });
    }
};

// Giriş yapmak için
exports.girisyapUser = async (request, response) => {
    
    try {

        const {  username, password, birthday, tc  } = request.body;

        const result = await userRepository.girisUser( username, password, birthday, tc );

        if (result.success) {
          
            const token = jwt.sign({ username }, "gizliAnahtar", { expiresIn: "30m" });
          
            return response.json({
     
                message: "Giriş başarılı!",
                token: token,
            });    
        } else {

            return response.status(404).json({
     
                message: "Kullanıcı adı veya şifre hatalı!"
            });
        }
    } catch (error) {
     
        console.error("Bir hata oluştu:", error);
        return response.status(404).json({
     
            message: "Sunucu hatası"
        });
    }
};

// Koltuklar için
exports.seatOperations = async (request, response) => {
    try {
        const {   } = request.body;

       let result= await userRepository.seatId();

        return response.status(200).json(result);
    } catch (error) {
        console.error("Bir hata oluştu:", error);
        return response.status(500).json({
            message: "Sunucu hatası"
        });
    }
};


exports.ticketbuy = async (request, response) => {
    try {
        const {seatIds} = request.body;        
      
        console.log(seatIds)
      
        let result = await userRepository.buy(seatIds);

        return response.status(200).json(result);
    } catch (error) {
        console.error("Bir hata oluştu:", error);
        return response.status(500).json({
            message: "Sunucu hatası"
        });
    }
};


exports.ticketpayment = async (request, response) => {
    try {
        const {seatId2} = request.body;        
      
        console.log('gelen id',seatId2)
        
        let result = await userRepository.payment(seatId2);

        return response.status(200).json(result);
        } catch (error) {
        console.error("Bir hata oluştu:", error);
        return response.status(500).json({
            message: "Sunucu hatası"
        });
    }
};

exports.usercontrol = async (request, response) => {
    try {
        const { seatId } = request.body;
        
        const selectedBy = await userRepository.control(seatId);
        
        return response.status(200).json({ selectedBy });
  
    } catch (error) {
        console.error("Bir hata oluştu:", error);
        return response.status(500).json({
            message: "Sunucu hatası"
        });
    }
};