package com.project.buycar.repository

import com.project.buycar.data.dao.PostDao
import com.project.buycar.network.BuyCarApi
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext

class PostRepository(
    private val api: BuyCarApi,
    private val postDao: PostDao
) {
    suspend fun getPost(key: String) = withContext(Dispatchers.IO) {
        var post = postDao.search(key)
        if (post == null) {
            post = api.serviceApi.getPost(key)
            postDao.insert(post)
        }
        post
    }

    fun findAll() = postDao.findAll()
}