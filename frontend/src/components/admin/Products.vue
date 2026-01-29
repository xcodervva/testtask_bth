<script setup lang="ts">
import { ref, onMounted } from 'vue';

import { useUserRouter } from '@/composables/useUserRouter';
import { useProductApi } from '@/composables/useProductApi';
import type { Product } from '@/types/product';

const api = useProductApi();
const { goToProductEdit } = useUserRouter();

const products = ref<Product[]>([]);
const page = ref(1);
const total = ref(0);
const loading = ref(false);

const load = async () => {
  loading.value = true;
  const res = await api.getProducts(page.value);
  products.value = res.data;
  total.value = res.meta.total;
  loading.value = false;
};

const remove = async (id: number) => {
  await api.deleteProduct(id);
  await load();
};

const addItem = () => {
  goToProductEdit();
};

onMounted(load);
</script>

<template>
  <el-card style="width: 800px;">
    <el-button type="primary" @click="addItem">
      Добавить товар
    </el-button>

    <el-table :data="products" v-loading="loading" style="margin-top: 16px">
      <el-table-column prop="name" label="Название" />
      <el-table-column prop="category.name" label="Категория" />
      <el-table-column prop="price" label="Цена" />

      <el-table-column label="Действия" width="180">
        <template #default="{ row }">
          <el-button
              size="small"
              @click="$inertia.visit(`/admin/products/${row.id}/edit`)"
          >
            Редактировать
          </el-button>

          <el-popconfirm
              title="Удалить товар?"
              @confirm="remove(row.id)"
          >
            <template #reference>
              <el-button size="small" type="danger">
                Удалить
              </el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>