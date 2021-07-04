package com.project.buycar.network

import com.project.buycar.network.services.AuthApiService
import com.project.buycar.network.services.BuyCarApiService
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory

private const val BUY_CAR_API_URL = "https://api-buycar-herokuapp.com/api"

private var retrofit = Retrofit.Builder()
    .baseUrl(BUY_CAR_API_URL)
    .addConverterFactory(GsonConverterFactory.create())
    .build()

object BuyCarApi {
    val serviceApi by lazy {
        retrofit.create(BuyCarApiService::class.java)
    }
    val serviceAuth by lazy {
        retrofit.create(AuthApiService::class.java)
    }
}