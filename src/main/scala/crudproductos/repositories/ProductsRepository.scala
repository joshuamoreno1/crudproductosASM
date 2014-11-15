package crudproductos.repositories
import crudproductos.dto.ProductDTO
import crudproductos.services.response.Response
import crudproductos.services.response.ResponseProductDTO
abstract class ProductsRepository {
  def add(productoDto: ProductDTO): String
  def getAll(): List[ProductDTO]
  def get(id: String): Option[ProductDTO]
  def update(productoDto: ProductDTO): Boolean
  def delete(id: String): Boolean
}