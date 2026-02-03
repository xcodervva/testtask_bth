<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { FormInstance, FormRules } from 'element-plus';

import { useCategoryApi } from '@/composables/useCategoryApi';
import { productSchema } from '@/validation/product.schema';
import type { ProductForm as ProductFormType } from '@/validation/product.schema';
import { useUserRouter } from '@/composables/useUserRouter';
import { useProductStore } from '@/stores/product';
import { useCategoryStore } from '@/stores/category';
import {storeToRefs} from "pinia";

const props = defineProps<{
  model: ProductFormType
}>();

const emit = defineEmits<{
  (e: 'submit'): void
}>();

const { goToProducts } = useUserRouter();
const productStore = useProductStore();
const categoryStore = useCategoryStore();
const { categories } = storeToRefs(categoryStore);

const productFormTitles = {
  name: 'Название',
  category: 'Категория',
  choose_category: 'Выберите категорию',
  price: 'Цена',
  description: 'Описание',
  save: 'Сохранить',
  back: 'Вернуться назад',
};

const formRef = ref<FormInstance>();

const rules: FormRules<ProductFormType> = {
  name: [
    {
      validator: (_, value, callback) => {
        const res = productSchema.shape.name.safeParse(value);
        callback(res.success ? undefined : res.error.issues[0].message);
      },
      trigger: 'blur',
    },
  ],
  price: [
    {
      validator: (_, value, callback) => {
        const res = productSchema.shape.price.safeParse(value);
        callback(res.success ? undefined : res.error.issues[0].message);
      },
      trigger: 'blur',
    },
  ],
  category_id: [
    {
      validator: (_, value, callback) => {
        const res = productSchema.shape.category_id.safeParse(value);
        callback(res.success ? undefined : res.error.issues[0].message);
      },
      trigger: 'change',
    },
  ],
};

onMounted(async () => {
  await categoryStore.fetchCategories();
});

const goBack = () => {
  goToProducts();
};

const submit = async () => {
  if (!formRef.value) return;

  await formRef.value.validate((valid) => {
    if (!valid) return
    emit('submit');
  });
}
</script>

<template>
  <el-form
      style="width: 600px;"
      ref="formRef"
      :model="props.model"
      :rules="rules"
      label-position="top"
  >
    <el-form-item :label="productFormTitles.name" prop="name">
      <el-input v-model="props.model.name" />
    </el-form-item>

    <el-form-item :label="productFormTitles.category" prop="category_id">
      <el-select
          v-model="props.model.category_id"
          :placeholder="productFormTitles.choose_category"
          style="width: 100%"
      >
        <el-option
            v-for="c in categories"
            :key="c.id"
            :label="c.name"
            :value="c.id"
        />
      </el-select>
    </el-form-item>

    <el-form-item :label="productFormTitles.price" prop="price">
      <el-input-number
          v-model="props.model.price"
          :min="0"
          style="width: 100%"
      />
    </el-form-item>

    <el-form-item :label="productFormTitles.description">
      <el-input
          v-model="props.model.description"
          type="textarea"
          :rows="3"
      />
    </el-form-item>

    <el-form-item class="btn-row">
      <el-button type="primary" @click="submit">
        {{ productFormTitles.save }}
      </el-button>

      <el-button type="primary" @click="goBack">
        {{ productFormTitles.back }}
      </el-button>
    </el-form-item>
  </el-form>
</template>

<style lang="css">
.btn-row > .el-form-item__content {
  display: flex;
  justify-content: space-between;
}
</style>