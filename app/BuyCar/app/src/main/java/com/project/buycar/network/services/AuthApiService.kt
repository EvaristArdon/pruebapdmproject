package com.project.buycar.network.services


import com.project.buycar.data.entity.LoginResponse
import com.project.buycar.data.entity.ResponseAPI
import com.project.buycar.data.entity.User
import com.project.buycar.data.entity.Users
import retrofit2.http.*

interface AuthApiService {

    @FormUrlEncoded
    @POST("/auth/login")
    suspend fun login(
        @Field("username") username: String,
        @Field("password") password: String
    ): ResponseAPI

    @POST("google/signin")
    suspend fun loginWithGoogle(@Body user: Users): LoginResponse


    @FormUrlEncoded
    @POST("/auth/register")
    suspend fun register(
        @Field("username") username: String,
        @Field("email") email: String,
        @Field("id") id: String,
        @Field("phonenumber") phonenumber: String,
        @Field("image") image: String,
        @Field("password") password: String,
    ): User

    @FormUrlEncoded
    @POST("/auth/forgot")
    suspend fun forgot_password(
        @Field("email") email: String,
        @Field("password") password: String
    ): User
}