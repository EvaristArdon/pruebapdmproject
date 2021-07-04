package com.project.buycar.network.services

import com.project.buycar.data.entity.Post
import com.project.buycar.data.entity.User
import retrofit2.http.GET
import retrofit2.http.POST
import retrofit2.http.Path

interface BuyCarApiService {

    @GET("/posts")
    suspend fun getPost(@Path("key") key: String): Post

    @GET("/users")
    suspend fun getUsers(@Path("key") key: String): User
}