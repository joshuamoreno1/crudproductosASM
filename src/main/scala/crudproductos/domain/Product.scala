package crudproductos.domain

import crudproductos.dto.ProductDTO
import crudproductos.repositories.RepositoryBuilder
import crudproductos.services.response._
import crudproductos.services.response.Response

object Product {
  def getAll = {
    val getAll = RepositoryBuilder.buildProductRepository.getAll
    if (getAll.isEmpty) Left(List(new ResponseBoolean(200, "No existe ningun producto creado.", false)))
    else Right(getAll.mapConserve(productDto => new ResponseProductDTO(productDto)))
  }
  
  def add(productDTO: ProductDTO): Response = new ResponseString(200, "Agregado correctamente", RepositoryBuilder.buildProductRepository.add(productDTO))
  def get(id: String) = {
    val get = RepositoryBuilder.buildProductRepository.get(id)
    get match {
    	 case Some(product) =>  Right(new ResponseProductDTO(product))
    	 case None => Left(new ResponseBoolean(200, "No existe ningun producto.", false))
      
    }
  }
  def update(productoDto: ProductDTO): Response = new ResponseBoolean(200, "Actualizado correctamente " + productoDto.name, RepositoryBuilder.buildProductRepository.update(productoDto))
  def delete(id: String): Response = new ResponseBoolean(200, "Eliminado correctamente " + id, RepositoryBuilder.buildProductRepository.delete(id))

}

