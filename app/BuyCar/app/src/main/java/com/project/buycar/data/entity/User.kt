package com.project.buycar.data.entity

import androidx.room.Entity
import androidx.room.PrimaryKey

@Entity(tableName = "user_table")
class User(
    @PrimaryKey
    var username: String,
    var id_user: String,
    var password: String,
    var phonenumber: String,
    var id: String,
    var imgUrl: String
)

data class LoginResponse(
    val accessToken: String,
    val id: String,
    val username: String,
    val email: String,
    val imgUrl: String,
    val fullName: String,
)

data class Users(
    val username: String,
    val email: String,
    val imgUrl: String
)
