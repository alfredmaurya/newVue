<template>
  <div class="row">
    <q-form class="q-gutter-md" @submit="onSubmit">
      <q-card class="q-pa-lg shadow-0 authCard">
        <q-card-section class="q-py-none">
          <h2 class="q-ma-none text-weight-medium text-h6 text-left text-dark">
            Forgot Password
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
import { getFullUrl } from 'src/utils'

export default {
  name: 'Login',
  data() {
    return {
      submitting: false,
      credentials: {
        email: '',
      },
    }
  },
  methods: {
    onSubmit() {
      this.submitting = true
      this.$store
        .dispatch('auth/forgotPassword', {
          ...this.credentials,
          link: `${getFullUrl()}/reset-password/`,
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

<style lang="scss" scoped>
.q-card {
  width: 360px;
}
.bg-image {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate3d(-50%, -50%, 0);
  z-index: 0;
}
.index-1 {
  z-index: 1;
}
</style>
