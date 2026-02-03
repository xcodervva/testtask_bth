<script setup lang="ts">
import {ref, onMounted, watch} from 'vue';
import { storeToRefs } from "pinia";
import { useDebounceFn } from '@vueuse/core';

import AdminLayout from '@/layouts/AdminLayout.vue';
import { useUserRouter } from '@/composables/useUserRouter';
import { useProductStore } from '@/stores/product';
import type { Product } from '@/types/product';
import { useUiStore } from '@/stores/ui';

const productStore = useProductStore();
const ui = useUiStore();
const { initialized, loading, page, perPage, products, total } = storeToRefs(productStore);
const { goToProductCreate, goToProductEdit, routingLoading } = useUserRouter();

const currentPage = ref<number | null>(1);
const searchVal = ref<string | null>(null);

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
  all_goods: 'Всего товаров:',
  search: 'Поиск по названию',
};

const remove = async (id: number) => {
  try {
    ui.startLoading();
    await productStore.deleteProduct(id);
  }
  finally {
    ui.stopLoading();
  }
};

const addItem = async () => {
  goToProductCreate();
};

const editItem = (id: number) => {
  goToProductEdit(id);
};

const updateCurrentChange = (_currentPage) => {
  currentPage.value = _currentPage;
};

const callFetchProducts = async () => {
  try {
    productStore.page = currentPage.value;
    await productStore.fetchProducts();
  }
  finally {
    ui.stopLoading();
  }
};

const debouncedSearch = useDebounceFn(async () => {
  productStore.page = currentPage.value;
  productStore.search = searchVal.value;
  await productStore.fetchProducts();
}, 400);

watch(searchVal, async () => {
  await debouncedSearch();
});

onMounted(async () => {
  await callFetchProducts();
});
</script>

<template>
  <AdminLayout>
    <el-card style="width: 800px;">
      <el-button type="primary" @click="addItem" :loading="routingLoading">
        {{ productsTitle.addItem }}
      </el-button>

      <div class="search-wrapper">
        <el-input
            v-model="searchVal"
            :placeholder="productsTitle.search"
            clearable
        />
      </div>

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

      <div style="margin-top: 16px; display: flex; justify-content: space-between;">
        <div>
          {{ productsTitle.all_goods }} <strong>{{ total }}</strong>
        </div>

        <el-pagination
            background
            layout="prev, pager, next"
            :current-page="currentPage"
            :page-size="perPage"
            :total="total"
            @current-change="callFetchProducts"
            @update:current-page="updateCurrentChange"
            v-loading="loading"
        />
      </div>
    </el-card>
  </AdminLayout>
</template>

<style lang="css">
.el-popconfirm__action {
  text-align: center;
}

.search-wrapper {
  margin: 8px 0;
}
</style>