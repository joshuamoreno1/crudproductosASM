package crudproductos.services.response

import crudproductos.dto.ProductDTO

abstract class Response()

case class ResponseString(code: Int, message: String, result: String) extends Response
case class ResponseBoolean(code: Int, message: String, result: Boolean) extends Response
case class ResponseProductDTO(productDTO: ProductDTO) extends Response
