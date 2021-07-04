package com.project.buycar.data.dao

import androidx.lifecycle.LiveData
import androidx.room.*
import com.project.buycar.data.entity.User

@Dao
interface UserDao {

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insert(User: User)

    @Update
    fun update(User: User)

    @Query("SELECT * FROM user_table WHERE username like :key")
    suspend fun search(key: String): User?

    @Query("SELECT * FROM user_table")
    fun findAll(): LiveData<List<User>>

    @Delete
    fun delete(post: User)
}