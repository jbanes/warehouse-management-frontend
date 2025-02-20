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

export const usePengirimStore = defineStore("pengirim", {
    state: () => ({
        shippers: [],
        shipping: {},
        loading: false,
        error: {
            name: '',
            shortName: '',
        },
    }),
    getters: {},
    actions: {
        async fetchShipper() {
            this.loading = true;
            try {
                const response = await axiosInstance.get("/shipper");
                this.shippers = response.data;
            } catch (error) {
                toast.error("Error fetching Shipper: " + error.message, toastOptions);
            } finally {
                setTimeout(() => {
                    this.loading = false;
                }, 500);
            }
        },
        async fetchShipperById(id) {
            try {
                const response = await axiosInstance.get("/shipper/" + id);
                return response.data;
            } catch (error) {
                toast.error("Error fetching Shipper: " + error.message, toastOptions);
            }
        },
        async storeShipper(shipper) {
            this.loading = true;
            this.clearError(); // initialize error object to empty object
            try {
                const response = await axiosInstance.post("/shipper", shipper);

                this.shippers = this.shippers.map((item) => {
                    if (item.id === shipper.id) {
                        return response.data;
                    }
                    return item;
                });
                router.push({ name: "pengirim.index" });
                toast.success("Shipper has been saved successfully.", toastOptions);
            } catch (error) {
                toast.error("Error storing Shipper: " + error.message, toastOptions);

                if (error.response && error.response.status == 400 && error.response.data.messages) {
                    const errorMessages = error.response.data.messages;
                    for (let i = 0; i < errorMessages.length; i++) {
                        const errorMessage = errorMessages[i];
                        if (errorMessage.includes('Name')) {
                            this.error.name = errorMessage;
                        }
                        if (errorMessage.includes('Short Name')) {
                            this.error.shortName = errorMessage;
                        }
                    }
                }
            } finally {
                setTimeout(() => {
                    this.loading = false;
                }, 300);
            }
        },
        async updateShipper(shipper) {
            this.loading = true;
            this.clearError(); // initialize error object to empty object
            try {
                const response = await axiosInstance.put("/shipper", shipper);
                this.shippers = this.shippers.map((item) => {
                    if (item.id === shipper.id) {
                        return response.data;
                    }
                    return item;
                });
                router.push({ name: "pengirim.index" });
                toast.success("Shipper has been updated successfully.", toastOptions);
            } catch (error) {
                toast.error("Error updating Shipper: " + error.message, toastOptions);

                if (error.response && error.response.status == 400 && error.response.data.messages) {
                    const errorMessages = error.response.data.messages;
                    for (let i = 0; i < errorMessages.length; i++) {
                        const errorMessage = errorMessages[i];
                        if (errorMessage.includes('Name')) {
                            this.error.name = errorMessage;
                        }
                        if (errorMessage.includes('Short Name')) {
                            this.error.shortName = errorMessage;
                        }
                    }
                }
            } finally {
                setTimeout(() => {
                    this.loading = false;
                }, 300);
            }
        },
        async deleteShipper(id) {
            this.loading = true;
            try {
                await axiosInstance.delete(`/shipper/${id}`);
                this.shippers = this.shippers.filter((item) => item.id !== id);
                router.push({ name: "pengirim.index" });
                toast.success("Shipper has been deleted successfully.", toastOptions)
            } catch (error) {
                toast.error("Error deleting Shipper: " + error.message, toastOptions);
            } finally {
                this.loading = false;
            }
        },
        async getShippingByShipper(id) {
            this.loading = true;
            try {
                const response = await axiosInstance.get(`/shipper/${id}/shipping`);
                this.shipping = response.data;
            } catch (error) {
                toast.error("Error get shipping by shipper: " + error.message, toastOptions);
            } finally {
                setTimeout(() => {
                    this.loading = false;
                }, 300);
            }
        },
        clearError() {
            this.error = {};
        },
    }
});
