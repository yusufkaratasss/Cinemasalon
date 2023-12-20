const express = require("express");
const router = express.Router();
const userService = require("../services/user-service.js");

// Giriş yapmak için

router.post("/login", userService.girisyapUser);

// Kayıt olmak için

router.post("/register", userService.kayıtolUser);

// Butonları oluşturmak  ıcın

router.get("/seats", userService.seatOperations);

// Bileti almak ıcın

router.put("/ticketbuy", userService.ticketbuy);

// Bileti satın almak ıcın

router.put("/ticketpayment", userService.ticketpayment);

// Bileti kim alıyor kontrol

router.post("/usercontrol", userService.usercontrol);

module.exports = router;