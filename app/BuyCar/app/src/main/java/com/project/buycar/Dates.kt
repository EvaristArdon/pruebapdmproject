package com.project.buycar

import android.content.Context

class Dates(val context: Context) {

    val NAME = "NAME"
    val ID_LOGIN_USER = "ID_LOGIN_USER"
    val ACCESS_TOKEN = "ACCESS_TOKEN"

    val storage = context.getSharedPreferences(NAME, 0)

    fun saveId(id: String) {
        storage.edit().putString(ID_LOGIN_USER, id).apply()
    }

    fun saveAccessToken(accessToken: String) {
        storage.edit().putString(ACCESS_TOKEN, accessToken).apply()
    }

    fun wipe() {
        storage.edit().clear().apply()
    }
}