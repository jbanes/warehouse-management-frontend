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
                const response = await axiosInstance.post("/stock", stock);
                response.data;
                toast.success("Stock berhasil dikirim", toastOptions);
                router.push({ name: "home" });
            } catch (error) {
                if (error.response.data.message === 'Stock not enough') {
                    toast.error("Error sending stock: " + error.response.data.message, toastOptions);
                } else {
                    toast.error("Error sending stock: " + error.message, toastOptions);
                }
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