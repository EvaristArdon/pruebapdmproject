package com.project.buycar.repository

import com.project.buycar.data.entity.Users
import com.project.buycar.network.BuyCarApi
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext

class AuthRepository(
    private val api: BuyCarApi,
) {
    suspend fun loginWithGoogle(user: Users) = api.serviceAuth.loginWithGoogle(user)

    suspend fun getLogin(username:String, password:String) = withContext(Dispatchers.IO) {
        var token = api.serviceAuth.login(username, password)
        token
    }
}