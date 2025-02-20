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

export const useBarangStore = defineStore("barang", {
    state: () => ({
        barangs: [],
        loading: false,
        error: {
            nama: '',
            kategori: '',
            harga: '',
        },
    }),
    getters: {},
    actions: {
        async fetchBarang() {
            this.loading = true;
            try {
                const response = await axiosInstance.get("/product");
                this.barangs = response.data;
            } catch (error) {
                toast.error("Error fetching Barang: " + error.message, toastOptions);
            } finally {
                setTimeout(() => {
                    this.loading = false;
                }, 500);
            }
        },
        async fetchBarangById(id) {
            try {
                const response = await axiosInstance.get(`/product/${id}`);
                return response.data;
            } catch (error) {
                toast.error("Error fetching Barang: " + error.message, toastOptions);
            }
        },
        async storeBarang(barang) {
            this.loading = true;
            this.clearError(); // initialize error object to empty object
            try {
                const response = await axiosInstance.post("/product", barang);
                this.barangs = this.barangs.map((item) => {
                    if (item.id === barang.id) {
                        return response.data;
                    }
                    return item;
                });

                router.push({ name: "barang.index" });
                toast.success("Barang has been saved successfully.", toastOptions);
            } catch (error) {
                toast.error("Error saving Barang: " + error.message, toastOptions);

                if (error.response && error.response.status == 400 && error.response.data.messages) {
                    const errorMessages = error.response.data.messages;
                    for (let i = 0; i < errorMessages.length; i++) {
                        const errorMessage = errorMessages[i];
                        if (errorMessage.includes('Nama')) {
                            this.error.nama = errorMessage;
                        }
                        if (errorMessage.includes('Kategori')) {
                            this.error.kategori = errorMessage;
                        }
                        if (errorMessage.includes('Berat')) {
                            this.error.berat = errorMessage;
                        }
                    }
                }
            } finally {
                setTimeout(() => {
                    this.loading = false;
                }, 300);
            }
        },
        async updateBarang(barang) {
            this.loading = true;
            this.clearError(); // initialize error object to empty object
            try {
                const response = await axiosInstance.put("/product", barang);
                const updatedBarang = response.data;
                const index = this.barangs.findIndex((item) => item.id === updatedBarang.id);
                if (index !== -1) {
                    this.barangs.splice(index, 1, updatedBarang);
                }

                router.push({ name: "barang.index" });
                toast.success("Barang has been updated successfully.", toastOptions);
            } catch (error) {
                toast.error("Error updating Barang: " + error.message, toastOptions);

                if (error.response && error.response.status == '400' && error.response.data.messages) {
                    const errorMessages = error.response.data.messages;
                    errorMessages.forEach(errorMessage => {
                        if (errorMessage.includes('Nama')) {
                            this.error.nama = errorMessage;
                        }
                        if (errorMessage.includes('Kategori')) {
                            this.error.kategori = errorMessage;
                        }
                        if (errorMessage.includes('Berat')) {
                            this.error.berat = errorMessage;
                        }
                    });
                }
            } finally {
                setTimeout(() => {
                    this.loading = false;
                }, 300);
            }
        },
        async deleteBarang(id) {
            this.loading = true;
            try {
                await axiosInstance.delete(`/product/${id}`);
                this.barangs = this.barangs.filter((item) => item.id !== id);
                router.push({ name: "barang.index" });
                toast.success("Barang has been deleted successfully.", toastOptions);
            } catch (error) {
                toast.error("Error deleting Barang: " + error.message, toastOptions);
            } finally {
                this.loading = false;
            }
        },
        clearError() {
            this.error = {};
        },
    },
});

