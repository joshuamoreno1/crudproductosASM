package crudproductos.core.actors


import akka.actor.Actor
import crudproductos.dto.ProductDTO
import crudproductos.domain.Product
import akka.actor.actorRef2Scala

object ProductActor {
  case class GetAll()
  case class Add(productDTO: ProductDTO)
  case class Update(productDTO: ProductDTO)
  case class Get(id: String)
  case class Delete(id: String)
}

class ProductActor extends Actor {
  import ProductActor._

  def receive: Receive = {
    case GetAll => sender ! Product.getAll   
    case Add(productDTO: ProductDTO) => sender ! Product.add(productDTO: ProductDTO)
    case Update(productDTO: ProductDTO) => sender ! Product.update(productDTO: ProductDTO)
    case Get(id: String) => sender ! Product.get(id)
    case Delete(id: String) => sender ! Product.delete(id)
  }
}