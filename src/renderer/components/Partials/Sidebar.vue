<template>
  <div class="Sidebar">
    <keep-alive>
      <router-link to="/settings">
        <button>
          <icon name="cog"/>
        </button>
      </router-link>
    </keep-alive>
  </div>
</template>

<script>
import Icon from 'vue-awesome/components/Icon'
import 'vue-awesome/icons/cog'
export default {
  components: {
    Icon
  }
}
</script>

<style lang="scss" scoped>
.Sidebar {
  position: fixed;
  width: 70px;
}
</style>