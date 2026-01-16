import { defineStore } from "pinia";

interface Pizza {
  id: number;
  title: string;
  description: string;
  price: number;
  image?: string;
}

interface CartItem {
  id: number;
  title: string;
  taille: string;
  pate: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  image?: string;
}

export const useCartStore = defineStore("cart", {
  state: () => ({
    items: [] as CartItem[],
  }),
  getters: {
    totalItems: (state) =>
      state.items.reduce((acc, item) => acc + item.quantity, 0),

    // Prix total en euros avec précision
    totalPrice: (state) =>
      Math.round(
        state.items.reduce((acc, item) => acc + item.totalPrice, 0) * 100
      ) / 100,

    // Nouveau getter : Prix total en centimes pour Stripe
    totalPriceInCents: (state) =>
      Math.round(
        state.items.reduce((acc, item) => acc + item.totalPrice, 0) * 100
      ),
  },
  actions: {
    addItem(payload: {
      pizza: Pizza;
      taille: string;
      pate: string;
      quantity: number;
      price: number;
      image: string;
    }) {
      const existing = this.items.find(
        (item) =>
          item.id === payload.pizza.id &&
          item.taille === payload.taille &&
          item.pate === payload.pate
      );

      if (existing) {
        existing.quantity += payload.quantity;
        // Arrondir à 2 décimales pour éviter les erreurs de précision
        existing.totalPrice =
          Math.round(existing.quantity * existing.unitPrice * 100) / 100;
      } else {
        this.items.push({
          id: payload.pizza.id,
          title: payload.pizza.title,
          taille: payload.taille,
          pate: payload.pate,
          quantity: payload.quantity,
          unitPrice: payload.price,
          totalPrice: Math.round(payload.price * payload.quantity * 100) / 100,
          image: payload.image,
        });
      }
    },
    decrement(itemToDecrement: CartItem) {
      const existing = this.items.find(
        (item) =>
          item.id === itemToDecrement.id &&
          item.taille === itemToDecrement.taille &&
          item.pate === itemToDecrement.pate
      );

      if (existing) {
        existing.quantity--;
        existing.totalPrice =
          Math.round(existing.quantity * existing.unitPrice * 100) / 100;

        if (existing.quantity <= 0) {
          const itemIndex = this.items.findIndex((item) => item === existing);
          if (itemIndex > -1) {
            this.items.splice(itemIndex, 1);
          }
        }
      }
    },
    increment(itemToIncrement: CartItem) {
      const existing = this.items.find(
        (item) =>
          item.id === itemToIncrement.id &&
          item.taille === itemToIncrement.taille &&
          item.pate === itemToIncrement.pate
      );
      if (existing) {
        existing.quantity++;
        existing.totalPrice =
          Math.round(existing.quantity * existing.unitPrice * 100) / 100;
      }
    },
    deleteItem(itemToDelete: CartItem) {
      const itemIndex = this.items.findIndex((item) => item === itemToDelete);
      if (itemIndex > -1) {
        this.items.splice(itemIndex, 1);
      }
    },
    clearCart() {
      this.items = [];
    },
  },
  persist: true,
});
