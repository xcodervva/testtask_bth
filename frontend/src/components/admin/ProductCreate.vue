<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { FormInstance, FormRules } from 'element-plus';

import { useCategoryApi } from '@/composables/useCategoryApi';
import { productSchema } from '@/validation/product.schema';
import type { ProductForm as ProductFormType } from '@/validation/product.schema';

const props = defineProps<{
  modelValue: ProductFormType
}>();

const emit = defineEmits<{
  (e: 'submit'): void
}>();

const formRef = ref<FormInstance>();
const categories = ref<{ id: number; name: string }[]>([]);

const categoryApi = useCategoryApi();

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
  categories.value = await categoryApi.getCategories();
});


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
      ref="formRef"
      :model="props.modelValue"
      :rules="rules"
      label-position="top"
  >
    <el-form-item label="Название" prop="name">
      <el-input v-model="props.modelValue.name" />
    </el-form-item>

    <el-form-item label="Категория" prop="category_id">
      <el-select
          v-model="props.modelValue.category_id"
          placeholder="Выберите категорию"
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

    <el-form-item label="Цена" prop="price">
      <el-input-number
          v-model="props.modelValue.price"
          :min="0"
          style="width: 100%"
      />
    </el-form-item>

    <el-form-item label="Описание">
      <el-input
          v-model="props.modelValue.description"
          type="textarea"
          rows="3"
      />
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="submit">
        Сохранить
      </el-button>
    </el-form-item>
  </el-form>
</template>