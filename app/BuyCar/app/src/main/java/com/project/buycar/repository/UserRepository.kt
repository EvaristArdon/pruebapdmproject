package com.project.buycar.repository

import com.project.buycar.data.dao.UserDao
import com.project.buycar.network.BuyCarApi
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext

class UserRepository(
    private val api: BuyCarApi,
    private val userDao: UserDao
) {
    suspend fun getUsers(key: String) = withContext(Dispatchers.IO) {
        var user = userDao.search(key)
        if (user == null) {
            user = api.serviceApi.getUsers(key)
            userDao.insert(user)
        }
        user
    }

    fun findAll() = userDao.findAll()
}