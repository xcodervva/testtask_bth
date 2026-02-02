<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { storeToRefs } from "pinia";

import AdminLayout from '@/layouts/AdminLayout.vue';
import { useUserRouter } from '@/composables/useUserRouter';
import { useProductStore } from '@/stores/product';
import type { Product } from '@/types/product';

const productStore = useProductStore();
const { initialized, loading, page, products, total } = storeToRefs(productStore);
const { goToProductCreate, goToProductEdit, routingLoading } = useUserRouter();

const productsTitle = {
  addItem: 'Добавить товар',
  name: 'Название',
  category: 'Категория',
  description: 'Описание',
  price: 'Цена',
  edit: 'Редактировать',
  delete_item_appr: 'Удалить товар?',
  delete_yes: 'Да',
  delete_no: 'Нет',
  delete: 'Удалить',
  actions: 'Действия',
};

const remove = async (id: number) => {
  await productStore.deleteProduct(id);
};

const addItem = async () => {
  goToProductCreate();
};

const editItem = (id: number) => {
  goToProductEdit(id);
};

onMounted(async () => {
  await productStore.fetchProducts();
});
</script>

<template>
  <AdminLayout>
    <el-card style="width: 800px;">
      <el-button type="primary" @click="addItem" :loading="routingLoading">
        {{ productsTitle.addItem }}
      </el-button>

      <el-table
          height="400"
          :data="products"
          v-loading="loading"
          v-if="initialized"
          style="margin-top: 16px">
        <el-table-column prop="name" :label="productsTitle.name"/>
        <el-table-column prop="category.name" :label="productsTitle.category"/>
        <el-table-column prop="description" :label="productsTitle.description"/>
        <el-table-column prop="price" :label="productsTitle.price" width="120" />

        <el-table-column :label="productsTitle.actions" width="180">
          <template #default="{ row }">
            <el-button
                style="margin-bottom: 4px;"
                size="small"
                @click="editItem(row.id)"
            >
              {{ productsTitle.edit }}
            </el-button>

            <el-popconfirm
                class="confirm-modal"
                :title="productsTitle.delete_item_appr"
                @confirm="remove(row.id)"
                confirm-button-text="Да"
                cancel-button-text="Нет"
            >
              <template #reference>
                <el-button
                    style="margin-left: 0px;"
                    size="small"
                    type="danger">
                  {{ productsTitle.delete }}
                </el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>

      <el-skeleton
          height="400"
          v-else
          animated
          :rows="5"
      />
    </el-card>
  </AdminLayout>
</template>

<style lang="css">
.el-popconfirm__action {
  text-align: center;
}
</style>