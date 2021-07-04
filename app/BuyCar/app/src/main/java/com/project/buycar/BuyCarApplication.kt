package com.project.buycar

import android.app.Application
import com.project.buycar.data.BuyCarDatabase
import com.project.buycar.network.BuyCarApi
import com.project.buycar.repository.AuthRepository

class BuyCarApplication: Application() {

    private val database by lazy {
        BuyCarDatabase.getDatabase(this)
    }

    val authRepository by lazy {
        AuthRepository(BuyCarApi)
    }

    companion object {
        lateinit var dates: Dates
    }

    override fun onCreate() {
        super.onCreate()

        dates = Dates(applicationContext)
    }
}
