package com.project.buycar.ui.login

import android.content.Intent
import android.os.Bundle
import android.util.Log
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Toast
import androidx.fragment.app.viewModels
import androidx.navigation.fragment.findNavController
import com.google.android.gms.auth.api.signin.GoogleSignIn
import com.google.android.gms.auth.api.signin.GoogleSignInAccount
import com.google.android.gms.auth.api.signin.GoogleSignInOptions
import com.google.android.gms.common.SignInButton
import com.google.android.gms.common.api.ApiException
import com.google.android.gms.tasks.Task
import com.project.buycar.BuyCarApplication
import com.project.buycar.R
import com.project.buycar.databinding.FragmentLoginBinding
import com.project.buycar.ui.HomeActivity

const val RC_SIGN_IN = 123
const val DEFAULT_IMG =
    "https://freepngimg.com/thumb/google/66726-customer-account-google-service-button-search-logo.png"

class LoginFragment : Fragment() {

    private var _binding: FragmentLoginBinding? = null
    private val binding get() = _binding!!

    private val application by lazy{
    requireActivity().application as BuyCarApplication
    }

    private val LoginViewModelFactory: LoginViewModelFactory by lazy {
        val repository = application.authRepository
        LoginViewModelFactory(repository)
    }

    private val loginViewModel: LoginViewModel by viewModels { LoginViewModelFactory }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
    }

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        _binding = FragmentLoginBinding.inflate(inflater, container, false)
        return binding.root
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        binding.loginViewModel = loginViewModel
        binding.lifecycleOwner = viewLifecycleOwner

        val gso = GoogleSignInOptions.Builder(GoogleSignInOptions.DEFAULT_SIGN_IN)
            .requestIdToken(getString(R.string.web_client))
            .requestEmail()
            .build()

        val mGoogleSignInClient = GoogleSignIn.getClient(requireActivity(), gso);
        binding.signInGoogleButton.setSize(SignInButton.SIZE_STANDARD)

        binding.signInGoogleButton.setOnClickListener {
            val signInIntent = mGoogleSignInClient.signInIntent
            startActivityForResult(signInIntent, RC_SIGN_IN)
        }
    }

    override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
        super.onActivityResult(requestCode, resultCode, data)

        // Result returned from launching the Intent from GoogleSignInClient.getSignInIntent(...);
        if (requestCode == RC_SIGN_IN) {
            // The Task returned from this call is always completed, no need to attach
            // a listener.
            val task: Task<GoogleSignInAccount> = GoogleSignIn.getSignedInAccountFromIntent(data)
            handleSignInResult(task)
        }
    }

    private fun handleSignInResult(completedTask: Task<GoogleSignInAccount>) {
        try {
            val account = completedTask.getResult(ApiException::class.java)

            val imgUrl = account?.photoUrl ?: DEFAULT_IMG
            loginViewModel.SaveUser(
                account!!.displayName.toString(),
                imgUrl.toString(),
                account.email.toString()
            )

            val intent = Intent (this@LoginFragment.context, HomeActivity::class.java)
            startActivity(intent)

        } catch (e: ApiException) {
            // The ApiException status code indicates the detailed failure reason.
            // Please refer to the GoogleSignInStatusCodes class reference for more information.
            Log.e("LOGIN_ERROR", e.toString())
            Toast.makeText(requireContext(), "Algo malo sucedio", Toast.LENGTH_SHORT).show()
        }
    }
}