package com.project.buycar.data.dao

import androidx.lifecycle.LiveData
import androidx.room.*
import com.project.buycar.data.entity.Post

@Dao
interface PostDao {

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insert(Post: Post)

    @Update
    fun update(Post : Post)

    @Query("SELECT * FROM post_table WHERE name_car like :key")
    suspend fun search(key: String): Post?

    @Query("SELECT * FROM post_table")
    fun findAll(): LiveData<List<Post>>

    @Delete
    fun delete(Post: Post)
}