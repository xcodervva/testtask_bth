<script setup lang="ts">
import { reactive } from 'vue';
import AdminLayout from '@/layouts/AdminLayout.vue';
import ProductForm from './ProductForm.vue';

import { useProductApi } from '@/composables/useProductApi';
import { useUserRouter } from '@/composables/useUserRouter';
import type { ProductForm as ProductFormType } from '@/validation/product.schema';

const productApi = useProductApi();
const { goToProducts } = useUserRouter();

const productCreateTitles = {
  add_item: 'Добавить товар',
};

const form = reactive<ProductFormType>({
  name: '',
  price: 0,
  category_id: 0,
  description: '',
});;

const submit = async () => {
  await productApi.createProduct(form);
  goToProducts();
};
</script>

<template>
  <AdminLayout>
    <el-card style="padding: 20px;">
      <h2 style="margin-bottom: 16px">{{ productCreateTitles.add_item }}</h2>

      <ProductForm
          :model="form"
          @submit="submit"
      />
    </el-card>
  </AdminLayout>
</template>