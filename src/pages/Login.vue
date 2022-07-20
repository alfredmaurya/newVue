<template>
  <div class="row">
    <q-form class="q-gutter-md" @submit="onSubmit">
      <q-card class="q-pa-sm shadow-0 authCard">
        <!-- <q-card square bordered class="q-pa-lg shadow-1"> -->
        <q-card-section class="q-py-none">
          <h2 class="q-ma-none text-weight-medium text-h6 text-left text-dark">
            Login
          </h2>
        </q-card-section>
        <q-card-section>
          <div class="form-field">
            <q-input
              v-model.trim="credentials.email"
              type="email"
              label="Email"
              :rules="[$rules.required(), $rules.email()]"
              lazy-rules
            >
              <template v-slot:append>
                <q-icon
                  name="cancel"
                  v-show="credentials.email"
                  @click="credentials.email = ''"
                />
              </template>
            </q-input>
          </div>
          <div class="form-field">
            <q-input
              square
              v-model.trim="credentials.password"
              :type="isPwd ? 'password' : 'text'"
              label="Password"
              :rules="[$rules.required()]"
              lazy-rules
            >
              <template v-slot:append>
                <q-icon
                  :name="isPwd ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="isPwd = !isPwd"
                />
              </template>
            </q-input>
          </div>
        </q-card-section>
        <q-card-actions class="q-px-md form-action">
          <q-btn
            no-caps
            unelevated
            color="primary"
            size="md"
            class="full-width"
            label="Login Now"
            type="submit"
            :loading="submitting"
          />
        </q-card-actions>
        <q-card-section class="q-px-md text-center">
          <!-- class="text-right q-pa-none" -->
          <router-link
            :to="{
              name: 'ForgotPassword',
            }"
            class="text-primary no-underline"
          >
            Forgot Password?
          </router-link>
        </q-card-section>
      </q-card>
    </q-form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Login',
  computed: { ...mapGetters('auth', ['userData']) },
  data() {
    return {
      submitting: false,
      isPwd: true,
      credentials: {
        email: '',
        password: '',
      },
    }
  },
  methods: {
    onSubmit() {
      this.submitting = true
      this.$store
        .dispatch('auth/logIn', this.credentials)
        .then(async (response) => {
          if (response.status && response.data) {

            await this.$store.dispatch('auth/getCurrentEmployee')

            let userData = this.userData
            localStorage.setItem("role",userData.role.role_key)
            localStorage.setItem("firstName",userData.first_name)
            localStorage.setItem("lastName",userData.last_name)
            localStorage.setItem('userEmail',userData.email)
            if (
              userData &&
              userData.role &&
              userData.role.role_key != 'super-admin' &&
              this.hasPermission('booking_view')
            ) {
              this.$router.push({ name: 'Booking' })
            } else {
              this.$router.push({ name: 'Homepage' })
            }
          } else {
            this.showError(response.message, 'bottom-right')
            this.submitting = false
          }
        })
        .catch(() => {
          this.submitting = false
        })
    },
  },
}
</script>
