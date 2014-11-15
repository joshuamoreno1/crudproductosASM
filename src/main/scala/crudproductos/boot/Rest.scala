package crudproductos.boot;
import crudproductos.services.Api
import crudproductos.core.{BootedCore, CoreActors}
import crudproductos.core.Core
import crudproductos.services.Api
import akka.actor.actorRef2Scala
import akka.io.IO
import spray.can.Http
import shapeless.ToInt
/**
 * Provides the web server (spray-can) for the REST api in ``Api``, using the actor system
 * defined in ``Core``.
 *
 * You may sometimes wish to construct separate ``ActorSystem`` for the web server machinery.
 * However, for this simple application, we shall use the same ``ActorSystem`` for the
 * entire application.
 *
 * Benefits of separate ``ActorSystem`` include the ability to use completely different
 * configuration, especially when it comes to the threading model.
 */
trait Web {
  this: Api with CoreActors with Core =>
  IO(Http)(system) ! Http.Bind(rootService, Option(System.getenv("VCAP_APP_HOST")).getOrElse("0.0.0.0"),
    scala.util.Properties.envOrElse("PORT", "8080").toInt)
}

object Rest extends App with BootedCore with CoreActors with Api with Web