package com.project.buycar.ui.login

import androidx.lifecycle.ViewModel
import androidx.lifecycle.ViewModelProvider
import com.project.buycar.repository.AuthRepository

class LoginViewModelFactory(private val repository: AuthRepository): ViewModelProvider.Factory {
    override fun <T : ViewModel?> create(modelClass: Class<T>): T {
    if(modelClass.isAssignableFrom(LoginViewModel::class.java))
        return LoginViewModel(repository) as T
        throw Exception("Unknown viewModel type")
    }
}