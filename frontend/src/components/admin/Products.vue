<script setup lang="ts">
import {ref, onMounted} from 'vue';

import AdminLayout from '@/layouts/AdminLayout.vue';
import {useUserRouter} from '@/composables/useUserRouter';
import {useProductApi} from '@/composables/useProductApi';
import type {Product} from '@/types/product';

const api = useProductApi();
const { goToProductCreate, goToProductEdit } = useUserRouter();

const products = ref<Product[]>([]);
const page = ref(1);
const total = ref(0);
const loading = ref(false);
const productsTitle = {
  addItem: 'Добавить товар',
  name: 'Название',
  category: 'Категория',
  price: 'Цена',
  edit: 'Редактировать',
  delete_item_appr: 'Удалить товар?',
  actions: 'Действия',
};

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
  goToProductCreate();
};

const editItem = () => {
  goToProductEdit();
};

onMounted(load);
</script>

<template>
  <AdminLayout>
    <el-card style="width: 800px;">
      <el-button type="primary" @click="addItem">
        {{ productsTitle.addItem }}
      </el-button>

      <el-table :data="products" v-loading="loading" style="margin-top: 16px">
        <el-table-column prop="name" :label="productsTitle.name"/>
        <el-table-column prop="category.name" :label="productsTitle.category"/>
        <el-table-column prop="price" :label="productsTitle.price" width="120" />

        <el-table-column :label="productsTitle.actions" width="180">
          <template #default="{ row }">
            <el-button
                style="margin-bottom: 4px;"
                size="small"
                @click="$inertia.visit(`/admin/products/${row.id}/edit`)"
            >
              {{ productsTitle.edit }}
            </el-button>

            <el-popconfirm
                :title="productsTitle.delete_item_appr"
                @confirm="remove(row.id)"
            >
              <template #reference>
                <el-button
                    style="margin-left: 0px;"
                    size="small"
                    type="danger">
                  Удалить
                </el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </AdminLayout>
</template>