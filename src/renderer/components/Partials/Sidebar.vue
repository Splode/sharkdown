<template>
  <div class="Sidebar" @mouseover="toolbarIsActive = true" @mouseout="toolbarIsActive = false">
    <keep-alive>
      <router-link to="/settings">
        <button class="Button Button--transparent" :class="tooltipClasses">
          <icon name="cog" scale="2"/>
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
  },

  data () {
    return {
      toolbarIsActive: false
    }
  },

  computed: {
    tooltipClasses () {
      return this.toolbarIsActive ? 'is-active' : 'is-inactive'
    }
  }
}
</script>

<style lang="scss" scoped>
.Sidebar {
  position: fixed;
  width: 70px;
}
</style>