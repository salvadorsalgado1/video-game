<template>
  <div class="about">
    <div class="container">
      <div class="card">
        <div class="card-content">
          <h1 class="heading-h1">About</h1>
          <h2 class="heading-h2">Technologies Used</h2>
          <Technologies/>
          <h2 class="heading-h2">Developers</h2>
          <p>
              By: <br/>Matthew Gibbons &amp; Salvador Salgado<br/><br/>
              California State University, Channel Islands<br/>
              Computer Science 420 Databases
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Technologies from '../components/Technologies'
export default {
  components:{
    Technologies
  },
}
</script>
