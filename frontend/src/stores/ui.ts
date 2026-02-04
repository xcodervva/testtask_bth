import { defineStore } from 'pinia';
import { ref } from 'vue';
import { ElLoading } from 'element-plus';
import type { LoadingInstance } from 'element-plus/es/components/loading/src/loading';

export const useUiStore = defineStore('ui', () => {
    const isLoading = ref(false);
    let loadingInstance: LoadingInstance | null = null;

    const startLoading = (text = 'Загрузка...') => {
        if (loadingInstance) return;

        isLoading.value = true;

        loadingInstance = ElLoading.service({
            lock: true,
            fullscreen: true,
            text,
            background: 'rgba(0, 0, 0, 0.65)',
        });
    };

    const stopLoading = () => {
        loadingInstance?.close();
        loadingInstance = null;
        isLoading.value = false;
    };

    return {
        isLoading,
        startLoading,
        stopLoading,
    };
});