<template>

<!-- productList array objesinde ürün var ise göster. -->
 <div v-if="productList.length > 0 ">

        <h3 class="text-center text-white">Eklenen Ürünlerin Listesi</h3>
        <hr>
        <div class="row product-container">
 <app-product v-for="product in productList">
          <img class="card-img-top" :src="product.selectedImage" :alt="product.title">
          <div class="card-body">
          <h5 class="card-title">{{ product.title }}</h5>
          <small><strong>Adet : </strong> {{ product.count  }} </small>
          <br>
          <small><strong>Fiyat : </strong> {{ product.price  }} </small>
          <br>
          <small><strong>Tutar : </strong> {{ product.totalPrice  }} </small>
         </div>
 </app-product>
         </div>

  </div>
</template>

<script>

import { eventBus } from '../main'

import Product from './Product'

export default {

    components : {
        appProduct : Product
    },

    data(){
        return {
            productList : []
        }
    },
    /* $on methodu ile $emit lediğimiz productAdded dinliyoruz. Eğer emit edilmişse event ile gelecek veriyi de product yaz. 
       gelecek olan veriyi data altında bulunan productList array objesine gönderiyoruz.
    */
    created(){
        eventBus.$on("productAdded", (urunGetir) => {
     
          if(this.productList.length <= 9 ){
            this.productList.push(urunGetir);  
            eventBus.$emit("progressBarUpdated", this.productList.length);
          }
          
          // 10 tane üründen fazla eklendiğinde uyarı verecek.
          else {
                alert("Daha fazla ürün ekleyemezsiniz.")
               }

        });
    }
    
}
</script>

<style scoped>

</style>