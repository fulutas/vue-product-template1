<template>
  <div class="row">
    <div class="card offset-2 col-md-3">
      <div class="card-body tex-center d-flex align-items-center flex-column">
          <h6 v-if="product.selectedImage == null"></h6>
          <h6 v-else>Fotoğraf Önizleme</h6>
        <img
          height="128"
          class="img-responsive text-center mb-3 w-100"
          :src="
            product.selectedImage == null
              ? '/src/assets/default.png'
              : product.selectedImage
          "
        />
        <!-- resim boş ise varsayılan resım ekle -->
        <p class="h6 fileTitle">{{ product.fileName }}</p>
        <p class="h6 fileTitle">{{ product.fileType }}</p>
        <br>
        <input
          ref="file"
          type="file"
          style="display: none"
          @change="onChange($event)"
          @click="onClick($event)"
          class="form-control"
        />
        <button
          class="btn btn-outline-secondary"
          type="button"
          @click="$refs.file.click()"
        >
          Fotoğraf Ekle
        </button>
        <!-- Butona basıldığında input tetikler-->
      </div>
    </div>
    <div class="col-md-5">
      <div class="col-md-12 card">
        <div class="card-body">
          <div class="form-group">
            <label>Ürün Adı</label>
            <!-- v-model ile inputa girilen değeri product objelerine ekle. -->
            <!-- <input type="text" v-model="product.title" class="form-control" placeholder="adını giriniz">  -->
            <vs-input
              type="text"
              primary
              v-model="product.title"
              placeholder="Ürün adı giriniz."
              required
            />
          </div>
          <div class="row">
            <div class="form-group col-md-6">
              <label>Ürün Adeti</label>
              <!-- v-model ile inputa girilen değeri product objelerine ekle. -->
              <!-- <input type="text" v-model="product.count" class="form-control" placeholder="adetini giriniz"> -->
              <vs-input
                type="number"
                label=""
                primary
                v-model="product.count"
                placeholder="Ürün adeti giriniz."
                required
              />
            </div>
            <div class="form-group col-md-6">
              <label>Ürün Fiyatı</label>
              <!-- v-model ile inputa girilen değeri product objelerine ekle. -->
              <!-- <input type="text" v-model="product.price" class="form-control" placeholder="fiyatını giriniz"> -->
              <vs-input
                type="number"
                label=""
                primary
                v-model="product.price"
                placeholder="Ürün fiyatı giriniz."
                v-on:keyup.enter="addProduct" 
                required
              />
            </div>
            <div class="form-group col-md-6">
              <label>Toplam Tutar</label>
              <!-- v-model ile inputa girilen değeri product objelerine ekle. -->
              <!-- <input type="text" v-model="product.price" class="form-control" placeholder="fiyatını giriniz"> -->
              <p>{{ getTotalPrice }} TL</p>
            </div>
          </div>
          <vs-button block @click="addProduct">
            <i class="bx bxs-paint-roll"></i> Ekle
          </vs-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { eventBus } from "../main";

export default {
  data() {
    return {
      product: {
        title: null,
        count: null,
        price: null,
        totalPrice: null,
        selectedImage: null,
        fileName: null,
        fileType : null,
        progress: 0,
        imageHeader: false
      },
    };
  },

  methods: {
    onChange(e) {   
      const file = e.target.files[0];
      this.product.selectedImage = URL.createObjectURL(file);
      this.product.fileName = file.name;
      this.product.fileType = file.type;
    },

   onClick(e) {
      e.target.value = null;
    },

    // Ürün ekle tıklandığında loading ekranı.
    openLoading() {
      const loading = this.$vs.loading({
        progress: null,
      });
      const interval = setInterval(() => {
        if (this.progress <= 100) {
          loading.changeProgress(this.progress++);
        }
      }, 10);
      setTimeout(() => {
        loading.close();
        clearInterval(interval);
        this.progress = 0;
      }, 550);
    },

    addProduct() {
      if (this.product.title == null || this.product.count == null || this.product.price == null) {
        alert("Tüm alanları doldurunuz.");
      } 
      
      else {
        this.openLoading();
        this.product.totalPrice = this.product.count * this.product.price;
        eventBus.$emit("productAdded", this.product); // girilen product.objesi verisini al.
        console.log(this.product.selectedImage);

        // Eklendikten sonra inputları temizle.
        this.product = {
          title: null,
          count: null,
          price: null,
          totalPrice: null,
          selectedImage: null,
          fileName: null,
        };
      }
    },
    
  },

  computed: {
    getTotalPrice : function () {
      return this.product.count * this.product.price;
    },
  },
};
</script>

<style scoped>
.fileTitle {
  font-size: 12px;
}
</style>