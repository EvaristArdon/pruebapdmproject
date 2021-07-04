package com.project.buycar.ui.login

import android.util.Log
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.project.buycar.BuyCarApplication
import com.project.buycar.data.entity.Users
import com.project.buycar.repository.AuthRepository
import kotlinx.coroutines.launch

class LoginViewModel(private val repository: AuthRepository): ViewModel() {
    fun SaveUser(username: String, email: String, imgUrl: String) {
        viewModelScope.launch {
            try {
                val res = repository.loginWithGoogle(Users(username, email, imgUrl))
                BuyCarApplication.dates.saveId(res.id)
                BuyCarApplication.dates.saveAccessToken(res.accessToken)

                Log.d("Res", res.toString())
            } catch (error: Exception) {
                Log.e("INSERT_ERROR", error.toString())
            }
        }
    }
}