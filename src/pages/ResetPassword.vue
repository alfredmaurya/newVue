<template>
  <div class="row" v-show="tokenVerified">
    <q-form class="q-gutter-md" @submit="onSubmit">
      <q-card class="q-pa-lg shadow-0 authCard">
        <q-card-section class="q-py-none">
          <h2 class="q-ma-none text-weight-medium text-h6 text-left text-dark">
            Reset Password
          </h2>
        </q-card-section>
        <q-card-section>
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
          <div class="form-field">
            <q-input
              square
              v-model.trim="credentials.confirmPassword"
              type="password"
              label="Confirm Password"
              :rules="[
                $rules.required(),
                $rules.sameAs(
                  credentials.password,
                  `Password & Confirm Password
            Should be Same.`
                ),
              ]"
              lazy-rules
            />
          </div>
        </q-card-section>
        <q-card-actions class="q-px-md form-action">
          <q-btn
            no-caps
            unelevated
            color="primary"
            size="md"
            class="full-width"
            label="Reset Password"
            type="submit"
            :loading="submitting"
          />
        </q-card-actions>
        <q-card-section class="q-px-md text-center">
          <router-link
            :to="{
              name: 'Login',
            }"
            class="text-primary no-underline"
          >
            Back to Login?
          </router-link>
        </q-card-section>
      </q-card>
    </q-form>
  </div>
</template>

<script>
export default {
  name: 'Login',
  props: {
    restToken: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      loading: false,
      tokenVerified: false,
      submitting: false,
      isPwd: true,
      credentials: {
        password: '',
        confirmPassword: '',
      },
    }
  },
  created() {
    if (this.restToken) {
      this.loading = true
      this.$store
        .dispatch('auth/verifyResetPasswordToken', this.restToken)
        .then((response) => {
          if (response.status) this.tokenVerified = true
          else
            this.$router.push({
              name: 'Login',
            })
        })
        .catch((error) => {
          if (error && error.message)
            this.showError(error.message, 'bottom-right')
          this.$router.push({
            name: 'Login',
          })
        })
        .finally(() => {
          this.loading = false
        })
    } else {
      this.$router.push({
        name: 'Login',
      })
    }
  },
  methods: {
    onSubmit() {
      this.submitting = true
      this.$store
        .dispatch('auth/resetpassword', {
          restToken: this.restToken,
          body: this.credentials,
        })
        .then((response) => {
          if (response.status && response.data) {
            this.showSuccess(response.data.data)
            this.$router.push({ name: 'Login' })
          } else {
            this.showError(response.message, 'bottom-right')
          }
        })
        .catch((error) => {
          if (error && error.message)
            this.showError(error.message, 'bottom-right')
        })
        .finally(() => {
          this.submitting = false
        })
    },
  },
}
</script>
