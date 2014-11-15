package crudproductos.services

import scala.concurrent.ExecutionContext
import crudproductos.core.actors.ProductActor._
import crudproductos.dto.ProductDTO
import crudproductos.services.response.Response
import akka.actor.ActorRef
import akka.util.Timeout
import spray.routing.Directives
import crudproductos.services.response._
import crudproductos.services.utils.CrossLocationRouteDirectives
import crudproductos.services.utils.DefaultJsonFormats

class ProductService(productMaster: ActorRef)(implicit executionContext: ExecutionContext)
  extends Directives with DefaultJsonFormats with CrossLocationRouteDirectives {
  import akka.pattern.ask
  import scala.concurrent.duration._
  val origin = "*"
  implicit val timeout = Timeout(2.seconds)
  implicit val productFormat = jsonFormat6(ProductDTO)
  implicit val responseProductFormat = jsonFormat1(ResponseProductDTO)
  implicit val addFormat = jsonFormat1(Add)
  implicit val updateFormat = jsonFormat1(Update)
  implicit val responseStringFormat = jsonFormat3(ResponseString)
  implicit val responseBooleanFormat = jsonFormat3(ResponseBoolean)
  val route =
    pathPrefix("rest") {
      path("productos") {
        options {
          complete {
            fromObjectCross(origin) {
              new ResponseString(200, "Options", "200")
            }
          }
        } ~
          get {
            complete {
              fromObjectCross(origin) {
                (productMaster ? GetAll).mapTo[Either[List[ResponseBoolean], List[ResponseProductDTO]]]
              }
            }
          } ~
          post {
            entity(as[Add]) { Add =>
              complete {
                fromObjectCross(origin) {
                  (productMaster ? Add).mapTo[ResponseString]
                }
              }
            }
          }
      } ~
        path("productos" / Segment) { id =>
          options {
            complete {
              fromObjectCross(origin) {
                new ResponseString(200, "Options", "200")
              }
            }
          } ~
            get {
              complete {
                fromObjectCross(origin) {
                  (productMaster ? Get(id)).mapTo[Either[ResponseBoolean, ResponseProductDTO]]
                }
              }
            } ~
            put {
              entity(as[Update]) { Update =>
                complete {
                  fromObjectCross(origin) {
                    (productMaster ? Update).mapTo[ResponseBoolean]
                  }
                }
              }
            } ~
            delete {
              complete {
                fromObjectCross(origin) {
                  (productMaster ? Delete(id)).mapTo[ResponseBoolean]
                }
              }
            }
        }
    }

}