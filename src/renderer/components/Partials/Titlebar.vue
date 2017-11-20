<template>
  <div class="Titlebar container-fluid">
    <div class="container">
      <div class="row">
        <div class="col-6 offset-1 Titlebar-section Titlebar-section--title">title</div>
        <div class="Titlebar-section Titlebar-section--windowControls">
          <div class="Titlebar-section-icon">
            <svg class="" width="10px" height="11px" viewBox="0 0 10 11">
              <g stroke="none" stroke-width="" fill-rule="evenodd">
                <g class="fill">
                  <rect id="minimize" x="0" y="5" width="10" height="1"></rect>
                </g>
              </g>
            </svg>
          </div>
          <div class="Titlebar-section-icon">
            <svg class="" width="10px" height="11px" viewBox="0 0 10 11">
              <g stroke="none" stroke-width="1" fill-rule="evenodd">
                <g fill-rule="nonzero" class="fill">
                  <path d="M1,9 L9,9 L9,1 L1,1 L1,9 Z M0,0 L10,0 L10,10 L0,10 L0,0 Z"></path>
                </g>
              </g>
            </svg>
          </div>
          <div class="Titlebar-section-icon">
            <svg class="" width="10px" height="11px" viewBox="0 0 10 11">
              <g stroke="none" stroke-width="1" fill-rule="evenodd">
                <g fill-rule="nonzero" class="fill">
                  <path d="M5,4.82101759 L0.678982409,0.5 L0,1.17898241 L4.32101759,5.5 L0,9.82101759 L0.678982409,10.5 L5,6.17898241 L9.32101759,10.5 L10,9.82101759 L5.67898241,5.5 L10,1.17898241 L9.32101759,0.5 L5,4.82101759 Z"></path>
                </g>
              </g>
            </svg>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.Titlebar {
  align-items: center;
  display: flex;
  // justify-content: space-between;
  padding-top: 1px;
  position: fixed;
  // width: 100vw;
  height: 36px;
  z-index: 10;
}

.Titlebar-section {
  display: flex;
  flex: 0 0 auto;
}

.Titlebar-section--windowControls {
  position: absolute;
  top: 12px;
  right: 0;
}

.Titlebar-section-icon {
  align-items: center;
  cursor: default;
  display: flex;
  fill: white;
  flex: 0 0 auto;
  justify-content: center;
  width: 45px;
  height: 100%;
}
</style>
