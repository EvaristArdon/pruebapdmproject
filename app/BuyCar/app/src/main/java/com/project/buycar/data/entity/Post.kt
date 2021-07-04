package com.project.buycar.data.entity

import androidx.room.Entity
import androidx.room.PrimaryKey

@Entity(tableName = "post_table")
data class Post (
    @PrimaryKey
    var name_car: String,
    var price: String,
    var phone: String,
    var descr: String,
    var img: String,
    var model: String,
    var brand: String,
    var year: String,
    var id_owner: String
)