<template>
  <div class="container">
    <h1 class="text-center text-white">Ürün Ekleme</h1>
    <hr>
   <app-new-product></app-new-product>
    <br><br>
  <app-progress></app-progress>
    <br><br>
  <app-products></app-products> 

  </div>


</template>

<script>

  import NewProduct from './components/NewProduct'
  import Progress from './components/Progress'
  import Products from './components/Products'

  export default {
    components : {
        appNewProduct : NewProduct,
        appProgress : Progress,
        appProducts : Products
    },
  }
</script>

<style>
  body {
    background-color: #18191C;
    padding-top: 20px;
    padding-bottom: 20px;
    font-family: 'Titillium Web', sans-serif;
  }

  button:focus {
    outline: 0;
  }

  .vs-button {
    font-size: 1rem;
  }

  hr {
    background-color: #292929;
  }

  .card {
     background-color: #1E2023!important;
     color: white;
  }

</style>

