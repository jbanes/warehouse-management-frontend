import { defineStore } from "pinia";
import axiosInstance from "../services/api.service";
import router from "../router";
import { useToast } from "vue-toastification";

const toast = useToast();
const toastOptions = {
    position: "top-right",
    timeout: 5000,
    closeOnClick: true,
    pauseOnFocusLoss: false,
    pauseOnHover: true,
    draggable: true,
    draggablePercent: 0.6,
    showCloseButtonOnHover: false,
    hideProgressBar: false,
    closeButton: "button",
    icon: true,
};

export const useStockStore = defineStore("stock", {
    state: () => ({
        stocks: [],
        loading: false,
        error: {
            barang: '',
            pengirim: '',
            jumlah: '',
        },
    }),
    getters: {},
    actions: {
        async sendStock(stock) {
            this.clearError(); // initialize error object to empty object
            try {
                await axiosInstance.post("/stock", stock);
                toast.success("Stock berhasil dikirim", toastOptions);
                router.push({ name: "home" });
            } catch (error) {
                toast.error("Error sending stock: " + error.message, toastOptions);
                this.error = error.response.data.errors;
            }
        },
        clearError() {
            this.error = {
                barang: '',
                pengirim: '',
                jumlah: '',
            };
        },
    },

});