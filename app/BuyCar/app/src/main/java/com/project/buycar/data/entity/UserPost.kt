package com.project.buycar.data.entity

import androidx.room.Embedded
import androidx.room.Relation
import com.project.buycar.data.entity.Post
import com.project.buycar.data.entity.User

data class UserPost(
    @Embedded
    val Post: Post,
    @Relation(
        parentColumn = "id_user",
        entityColumn = "id_owner"
    )
    val User: User
)