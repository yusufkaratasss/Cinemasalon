const cors = require("cors");
const {
    connect
} = require("mongo");
const {
    MongoClient,
    ObjectId
} = require("mongodb");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
    response
} = require("express");
const { toArray } = require("lodash");

// Kayıt olmak için
exports.kayıtolUser = async (username, password, birthdate, tc) => {

    const url = 'mongodb://localhost:27017';
    const databs = 'sinemaveriler';
    try {

        const client = new MongoClient(url);

        await client.connect();

        console.log('MongoDB ye başarıyla bağlandı');

        const db = client.db(databs);

        const users = db.collection('users');

        const currentuser = await users.findOne({

            username
        });

        if (currentuser) {

            await client.close();
            return {

                message: "Bu kullanıcı adı zaten kullanılıyor"
            };
        }

        const hash = await bcrypt.hash(password, 10);

        const data = {
            username: username,
            password: hash,
            birthdate: birthdate,
            tc: tc
        };

        const result = await users.insertOne(data);

        if (result.insertedCount === 1) {
            await client.close();
            return {
                message: "Veri başarıyla kaydedildi"
            };
        } else {
            await client.close();
            return {
                message: "Veri kaydedilirken bir hata oluştu"
            };
        }
    } catch (error) {
        console.error("Hata oluştu:", error);
        return {
            message: "Bir hata oluştu"
        };
    }
};

// Giriş yapmak için
exports.girisUser = async (username, password) => {

    const url = 'mongodb://localhost:27017';

    const databs = 'sinemaveriler';

    try {

        const client = new MongoClient(url);

        await client.connect();

        const db = client.db(databs);

        const users = db.collection("users");

        const user = await users.findOne({

            username
        });

        if (!user) {

            await client.close();
            return {
                success: false
            };
        }

        const compare = await bcrypt.compare(password, user.password);

        if (!compare) {

            await client.close();
            return {
                success: false
            };
        }

        await client.close();

        return {
            success: true
        };
    } catch (error) {

        console.error("Bir hata oluştu:", error);
        return {
            success: false
        };
    }
};

exports.seatId = async () => {
    const url = 'mongodb://localhost:27017';
    const databs = 'sinemaveriler';

    try {
        const client = new MongoClient(url);
        await client.connect();

        const db = client.db(databs);

        const seatlisting = db.collection('seatlisting');

        const result = await seatlisting.find().toArray();
 
        await client.close();

        return result; 
    } catch (error) {
        console.error("Bir hata oluştu:", error);
        throw error;
    }
};


exports.buy = async (seatIds) => {
    const url = 'mongodb://localhost:27017';
    const dbName = 'sinemaveriler';
  
    try {
      const client = new MongoClient(url);
      await client.connect();
  
      const db = client.db(dbName);
      const seatlisting = db.collection('seatlisting');
  
      const seatObjectIds = seatIds.map(seatsId => new ObjectId(seatsId));
     
      const result2 = await seatlisting.find().toArray();
        
      const result = await seatlisting.updateMany(
        { 'seats._id': { $in: seatObjectIds } },
        { $set: { 'seats.$[seat].selected': true } }, 
        { arrayFilters: [{ 'seat._id': { $in: seatObjectIds } }] } 
      );
      
      console.log('tıklanan:',result);
  
      await client.close();
  
      return result;
    } catch (error) {
      console.error("Bir hata oluştu:", error);
    }
};

exports.payment = async (seatId2) => {
    const url = 'mongodb://localhost:27017';
    const dbName = 'sinemaveriler';
  
    try {
      const client = new MongoClient(url);
      await client.connect();
  
      const db = client.db(dbName);
      const seatlisting = db.collection('seatlisting');
      
      const seatObjectIds = seatId2.map(seatsIdd => new ObjectId(seatsIdd));
                    
      const result = await seatlisting.updateMany(
        { 'seats._id': { $in: seatObjectIds } },
        { $set: { 'seats.$[seat].purchased': true } }, 
        { arrayFilters: [{ 'seat._id': { $in: seatObjectIds } }] } 
      );

      console.log('ödeme:', result);
      
      if (!result) {
        const rollbackResult = await seatlisting.updateMany(
          { 'seats._id': { $in: seatObjectIds } },
          { $set: { 'seats.$[seat].selected': false } }, 
          { arrayFilters: [{ 'seat._id': { $in: seatObjectIds } }] } 
        );
        console.log('Ödeme başarısız, seçimler geri çevrildi:', rollbackResult);
      }
  
      await client.close();
  
      return result;
    } catch (error) {
      console.error("Bir hata oluştu:", error);
      throw error;
    }
};
  
exports.control = async (seatId) => {
    const url = 'mongodb://localhost:27017';
    const databs = 'sinemaveriler';

    try {
        const client = new MongoClient(url);
        await client.connect();

        const db = client.db(databs);
        const users = db.collection('users');

        const seat = await users.findOne({ 'users._id': new ObjectId(seatId) });
        console.log(seat)
        await client.close();
        
        return "seat";
    } catch (error) {
        console.error("Bir hata oluştu:", error);
    }
};