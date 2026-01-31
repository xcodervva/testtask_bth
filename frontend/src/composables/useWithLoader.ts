import { ref } from 'vue';

export function useWithLoader(minTime = 1000) {
    const loading = ref(false);
    const initialized = ref(false);
    const error = ref<string | null>(null);

    const withLoader = async <T>(fn: () => Promise<T>): Promise<T> => {
        loading.value = true;
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

            loading.value = false;
        }
    };

    return {
        loading,
        initialized,
        error,
        withLoader,
    };
}