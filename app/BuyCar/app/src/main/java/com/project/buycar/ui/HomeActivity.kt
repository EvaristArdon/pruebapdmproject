package com.project.buycar.ui

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import androidx.navigation.findNavController
import androidx.navigation.fragment.NavHostFragment
import androidx.navigation.ui.AppBarConfiguration
import androidx.navigation.ui.navigateUp
import androidx.navigation.ui.setupWithNavController
import com.google.android.material.navigation.NavigationView
import com.project.buycar.R

class HomeActivity : AppCompatActivity() {

    private lateinit var appBarConfiguration: AppBarConfiguration


    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_home)

                 val navHostFragment =
                     supportFragmentManager.findFragmentById(R.id.nav_main_fragment) as NavHostFragment
            val navController = navHostFragment.navController
            findViewById<NavigationView>(R.id.navigation)
                .setupWithNavController(navController)
        }

        override fun onSupportNavigateUp(): Boolean {
        val navController = findNavController(R.id.nav_main_fragment)
        return navController.navigateUp(appBarConfiguration)
                || super.onSupportNavigateUp()
    }

    }


