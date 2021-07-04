package com.project.buycar.data

import android.content.Context
import androidx.room.Database
import androidx.room.Room
import androidx.room.RoomDatabase
import com.project.buycar.data.dao.UserDao
import com.project.buycar.data.entity.Post
import com.project.buycar.data.entity.ResponseAPI
import com.project.buycar.data.entity.User

@Database(entities = [User::class, Post::class], version = 1)
abstract class BuyCarDatabase: RoomDatabase() {

    abstract fun userDao(): UserDao

    companion object {
        @Volatile
        private var INSTANCE: BuyCarDatabase? = null
        fun getDatabase(context: Context): BuyCarDatabase {
            return INSTANCE ?: synchronized(this) {
                val instance = Room.databaseBuilder(
                    context, BuyCarDatabase::class.java,
                    "buycar_db"
                ).build()
                INSTANCE = instance
                instance
            }
        }
    }
}