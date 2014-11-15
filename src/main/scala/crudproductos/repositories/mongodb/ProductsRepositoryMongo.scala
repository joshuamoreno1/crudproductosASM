package crudproductos.repositories.mongodb

import com.mongodb.DBObject
import com.mongodb.WriteConcern
import com.mongodb.casbah.Imports._
import com.mongodb.casbah.commons.MongoDBObject
import crudproductos.dto.ProductDTO
import crudproductos.repositories.ProductsRepository
import crudproductos.services.response.Response
import crudproductos.services.response.ResponseProductDTO
import shapeless.ToInt
import org.joda.convert.ToString
import crudproductos.services.response.ResponseBoolean

class ProductsRepositoryMongo extends ProductsRepository {

  val conn = MongoFactory.getConnection

  def getAll(): List[ProductDTO] = {
    val cur = MongoFactory.getCollection(conn).find().sort(orderBy = MongoDBObject("-id" -> 1))
    def fillProduct(cursor: MongoCursor, list: List[ProductDTO]): List[ProductDTO] = {
      if (!cursor.hasNext) {
        MongoFactory.closeConnection(conn)
        list
      }
      else fillProduct(cursor, buildProductDTO(cursor.next) :: list)
    }
    fillProduct(cur, List())
  }

  def add(productoDto: ProductDTO): String = {
    val collection = MongoFactory.getCollection(conn)
    val counter = MongoFactory.getCounter(conn)
    val nextCode = MongoFactory.getNextSequence(counter, "code").toString
    val productoObj = buildMongoDbObject(productoDto, Map("code" -> nextCode))
    MongoFactory.getCollection(conn).save(productoObj)
    MongoFactory.closeConnection(conn)
    nextCode
  }

  def get(id: String): Option[ProductDTO] = {
    val q = MongoDBObject("code" -> id)
    val collection = MongoFactory.getCollection(conn)
    val result = collection findOne q
    MongoFactory.closeConnection(conn)
    if (!result.isEmpty) {
      val productResult = result.get
      Option(buildProductDTO(productResult))

    } else None
  }

  def update(productoDto: ProductDTO): Boolean = {
    val q = MongoDBObject("code" -> productoDto.code)
    val collection = MongoFactory.getCollection(conn)
    val result = collection findOne q
    if (!result.isEmpty) {
      val productResult = result.get
      val productObj = buildMongoDbObject(productoDto, Map())
      collection.update(productResult, productObj, false)
      MongoFactory.closeConnection(conn)
      true
    } else
      MongoFactory.closeConnection(conn)
    false
  }

  def delete(id: String): Boolean = {
    var q = MongoDBObject("code" -> id)
    val collection = MongoFactory.getCollection(conn)
    val result = collection findOne q
    if (!result.isEmpty) {
      val productResult = collection.remove(result.get, WriteConcern.NONE)
      MongoFactory.closeConnection(conn)
      true
    } else
      MongoFactory.closeConnection(conn)
    false
  }

  private def buildProductDTO(productObj: DBObject): ProductDTO = {
    val product = ProductDTO(code = productObj.as[String]("code"),  
      name = productObj.as[String]("name"),  
      cost = productObj.as[Int]("cost"),
      gain = productObj.as[Int]("gain"),
      value = productObj.as[Int]("value"),
      producer = productObj.as[String]("producer")
      )   
    product
  }

  private def buildMongoDbObject(productoDto: ProductDTO, addList: Map[String, Any]): MongoDBObject = {
    val builder = MongoDBObject.newBuilder
    builder += "code" -> addList.get("code").getOrElse(productoDto.code)    
    builder += "name" -> addList.get("name").getOrElse(productoDto.name)    
    builder += "cost" -> addList.get("cost").getOrElse(productoDto.cost)
    builder += "gain" -> addList.get("gain").getOrElse(productoDto.gain)
    builder += "value" -> addList.get("value").getOrElse(productoDto.value)
    builder += "producer" -> addList.get("producer").getOrElse(productoDto.producer) 
    builder.result
  }
}
