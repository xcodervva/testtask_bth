import { ref } from 'vue';

import { useUiStore } from '@/stores/ui';

export function useWithLoader(minTime = 1000) {
    const ui = useUiStore();
    const loading = ref(false);
    const initialized = ref(false);
    const error = ref<string | null>(null);

    const withLoader = async <T>(fn: () => Promise<T>): Promise<T> => {
        ui.startLoading();
        // loading.value = true;
        error.value = null;

        const start = Date.now();

        try {
            const result = await fn();
            if (!initialized.value) initialized.value = true;

            return result;
        } catch (e: any) {
            error.value = e?.message ?? 'Error';
            throw e;
        } finally {
            const elapsed = Date.now() - start;
            const remaining = minTime - elapsed;

            if (remaining > 0) {
                await new Promise(resolve => setTimeout(resolve, remaining));
            }

            // loading.value = false;
            ui.stopLoading();
        }
    };

    return {
        loading,
        initialized,
        error,
        withLoader,
    };
}