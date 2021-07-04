package com.project.buycar.ui

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.os.CountDownTimer
import com.project.buycar.R

class InitActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_init)
        startTimer()
    }

    private fun startTimer(){
        object: CountDownTimer(3000,1000){
            override fun onTick(millisUntilFinished: Long) {
            }
            override fun onFinish() {
                val intent = Intent(applicationContext, AuthActivity::class.java).apply{}
                startActivity(intent)
                finish()
            }
        }.start()
    }

}