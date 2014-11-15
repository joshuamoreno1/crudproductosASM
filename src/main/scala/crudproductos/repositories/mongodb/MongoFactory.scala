package crudproductos.repositories.mongodb

import com.mongodb.casbah.Imports._

object MongoFactory {

  private val Server = "localhost"
  private val port = 27017
  private val DataBase = "crudproductos"
  private val Collection = "productos"
  private val Counters = "counters"

  def getConnection: MongoClient = {
    val server = new ServerAddress(Server, port)   
    MongoClient(server)
  }
  def getCollection(db: MongoClient): MongoCollection = db(DataBase)(Collection)  

  def getCounter(db: MongoClient): MongoCollection = db(DataBase)(Counters)

  def getNextSequence(counter: MongoCollection, name: String): Int = {  
    val newId = counter.findAndModify(MongoDBObject("_id" -> name), MongoDBObject(),  MongoDBObject(), false, $inc("seq" -> 1), true, true)
    newId match {
      case Some(newId) => newId.as[Int]("seq")
      case None => 0
    }
  }
  
  def closeConnection(conn: MongoClient) { conn.close }
}