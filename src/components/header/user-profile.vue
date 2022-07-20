<template>
  <visi-dialog
    dialog="UserProfile"
    title="User Profile"
    cardClass="sidebarAccount q-card-sm"
  >
    <template v-slot:ScrollContent>
      <div class="row">
        <div class="col-12">
          <q-item>
            <Avtar :userName="`${userData.first_name} ${userData.last_name}`" />
            <q-item-section>
              <q-item-label class="ellipsis">
                <strong
                  v-text="
                    `${userData.first_name} ${userData.last_name} ${
                      userData.role && userData.role.role_name
                        ? `(${userData.role.role_name})`
                        : ''
                    }`
                  "
                />
              </q-item-label>
              <q-item-label class="q-mt-xs q-mb-xs" v-text="userData.email" />
              <!-- <q-item-label
                class="q-mt-md text-dark q-mb-xs"
                v-text="
                  userData.role && userData.role.role_name
                    ? userData.role.role_name
                    : ''
                "
              /> -->

              <q-item-label class="accountBtn">
                <Logout />
              </q-item-label>
            </q-item-section>
          </q-item>
        </div>
      </div>
    </template>
  </visi-dialog>
</template>
<script>
import Logout from 'components/common/logout'
export default {
  name: 'UserProfile',
  components: {
    Logout,
  },
}
</script>
