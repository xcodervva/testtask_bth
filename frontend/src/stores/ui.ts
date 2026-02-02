import { defineStore } from 'pinia';
import { ElLoading } from 'element-plus';
import type { LoadingInstance } from 'element-plus/es/components/loading/src/loading';

export const useUiStore = defineStore('ui', () => {
    let loadingInstance: LoadingInstance | null = null;

    const startLoading = (text = 'Загрузка...') => {
        if (loadingInstance) return;

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
    };

    return {
        startLoading,
        stopLoading,
    };
});