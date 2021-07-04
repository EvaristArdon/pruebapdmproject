package com.project.buycar.ui.register

import androidx.lifecycle.ViewModel
import androidx.lifecycle.ViewModelProvider
import com.project.buycar.repository.AuthRepository
import com.project.buycar.ui.login.LoginViewModel

class RegisterViewModelFactory(private val repository: AuthRepository): ViewModelProvider.Factory {
    override fun <T : ViewModel?> create(modelClass: Class<T>): T {
        if(modelClass.isAssignableFrom(LoginViewModel::class.java))
            return RegisterViewModel(repository) as T
        throw Exception("Unknown viewModel type")
    }
}