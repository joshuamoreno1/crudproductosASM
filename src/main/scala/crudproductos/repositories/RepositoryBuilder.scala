package crudproductos.repositories

import crudproductos.repositories.mongodb.ProductsRepositoryMongo

object RepositoryBuilder {	
	def buildProductRepository:ProductsRepository = new ProductsRepositoryMongo
}