<script setup lang="ts">
import {onMounted, reactive} from 'vue';
import type { ProductForm as ProductFormType } from '@/validation/product.schema';

import AdminLayout from '@/layouts/AdminLayout.vue';
import ProductForm from './ProductForm.vue';

import { useProductStore } from '@/stores/product';
import { useUiStore } from '@/stores/ui';
import { useUserRouter } from '@/composables/useUserRouter';

const productStore = useProductStore();
const ui = useUiStore();
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
  await productStore.createProduct(form);
  goToProducts();
};

onMounted( () => {
  try {
  }
  finally {
    ui.stopLoading();
  }
});
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