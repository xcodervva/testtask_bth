<script setup lang="ts">
import { onMounted, reactive } from 'vue';
import { useRoute } from 'vue-router';

import AdminLayout from '@/layouts/AdminLayout.vue';
import ProductForm from './ProductForm.vue';

import { useProductApi } from '@/composables/useProductApi';
import { useUserRouter } from '@/composables/useUserRouter';
import type { ProductForm as ProductFormType } from '@/validation/product.schema';
import { useProductStore } from "../../stores/product";
import { storeToRefs } from "pinia";

const productStore = useProductStore();
const route = useRoute();
const productApi = useProductApi();
const { goToProducts } = useUserRouter();
const productId = Number(route.params.id);
const { productById } = storeToRefs(productStore);

const productCreateTitles = {
  edit_item: 'Редактировать товар',
};

const form = reactive<ProductFormType>({
  name: '',
  price: 0,
  category_id: 0,
  description: '',
});

const submit = async () => {
  await productApi.createProduct(form);
  goToProducts();
};

onMounted(async () => {
  await productStore.fetchProductById(productId);

  form.name = productById.value.name;
  form.price = productById.value.price;
  form.category_id = productById.value.category.id;
  form.description = productById.value.description ?? '';
});
</script>

<template>
  <AdminLayout>
    <el-card style="padding: 20px;">
      <h2 style="margin-bottom: 16px">{{ productCreateTitles.edit_item }}</h2>

      <ProductForm
          :model="form"
          @submit="submit"
      />
    </el-card>
  </AdminLayout>
</template>