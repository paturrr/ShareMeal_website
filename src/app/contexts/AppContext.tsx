import React, { createContext, useContext, useState, ReactNode } from "react";

// Types
export interface Deal {
  id: number;
  item: string;
  originalPrice: number;
  discountPrice: number;
  stock: number;
  expiresIn: string;
}

export interface Store {
  id: number;
  name: string;
  category: string;
  distance: string;
  rating: number;
  reviews: number;
  address: string;
  deals: Deal[];
  tags: string[];
  isFavorite: boolean;
  image: string;
}

export interface Booking {
  id: string;
  bookingDate: Date;
  storeId: number;
  storeName: string;
  dealId: number;
  dealItem: string;
  price: number;
  quantity: number;
  status: "pending" | "ready" | "completed" | "cancelled";
  pickupTime?: string;
  consumerName: string;
}

export interface Order {
  id: string;
  orderDate: Date;
  storeId: number;
  storeName: string;
  dealId: number;
  dealItem: string;
  price: number;
  quantity: number;
  status: "pending" | "ready" | "completed" | "cancelled";
  consumerName: string;
}

interface AppContextType {
  stores: Store[];
  bookings: Booking[];
  orders: Order[];
  addBooking: (
    storeId: number,
    dealId: number,
    quantity: number,
    consumerName: string
  ) => boolean;
  updateOrderStatus: (orderId: string, status: Booking["status"]) => void;
  updateBookingStatus: (bookingId: string, status: Booking["status"]) => void;
  getStoreById: (storeId: number) => Store | undefined;
  getOrdersByStore: (storeId: number) => Order[];
  getBookingsByConsumer: (consumerName: string) => Booking[];
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within AppProvider");
  }
  return context;
};

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [stores, setStores] = useState<Store[]>([
    {
      id: 1,
      name: "Toko Roti Barokah",
      category: "Bakery",
      distance: "0.5 km",
      rating: 4.8,
      reviews: 128,
      address: "Jl. Sudirman No. 123, Jakarta",
      deals: [
        {
          id: 1,
          item: "Roti Tawar",
          originalPrice: 15000,
          discountPrice: 10000,
          stock: 15,
          expiresIn: "2 jam",
        },
        {
          id: 2,
          item: "Roti Keju",
          originalPrice: 12000,
          discountPrice: 8000,
          stock: 20,
          expiresIn: "3 jam",
        },
      ],
      tags: ["halal", "bakery"],
      isFavorite: true,
      image:
        "https://images.unsplash.com/photo-1765009434133-88a3608a60df?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb29kJTIwZGVsaXZlcnklMjByZXN0YXVyYW50JTIwc3RvcmVmcm9udHxlbnwxfHx8fDE3NzQ5NzQ1MDl8MA&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      id: 2,
      name: "Healthy Corner",
      category: "Healthy Food",
      distance: "1.2 km",
      rating: 4.9,
      reviews: 95,
      address: "Jl. Gatot Subroto No. 45, Jakarta",
      deals: [
        {
          id: 3,
          item: "Salad Bowl Premium",
          originalPrice: 45000,
          discountPrice: 30000,
          stock: 8,
          expiresIn: "3 jam",
        },
        {
          id: 4,
          item: "Smoothie Bowl",
          originalPrice: 35000,
          discountPrice: 25000,
          stock: 10,
          expiresIn: "4 jam",
        },
      ],
      tags: ["vegan", "healthy", "halal"],
      isFavorite: true,
      image:
        "https://images.unsplash.com/photo-1765009434133-88a3608a60df?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb29kJTIwZGVsaXZlcnklMjByZXN0YXVyYW50JTIwc3RvcmVmcm9udHxlbnwxfHx8fDE3NzQ5NzQ1MDl8MA&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      id: 3,
      name: "Dapur Nusantara",
      category: "Indonesian Food",
      distance: "0.8 km",
      rating: 4.7,
      reviews: 156,
      address: "Jl. Thamrin No. 78, Jakarta",
      deals: [
        {
          id: 5,
          item: "Lunch Box Komplit",
          originalPrice: 50000,
          discountPrice: 35000,
          stock: 12,
          expiresIn: "4 jam",
        },
      ],
      tags: ["halal", "indonesian"],
      isFavorite: false,
      image:
        "https://images.unsplash.com/photo-1765009434133-88a3608a60df?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb29kJTIwZGVsaXZlcnklMjByZXN0YXVyYW50JTIwc3RvcmVmcm9udHxlbnwxfHx8fDE3NzQ5NzQ1MDl8MA&ixlib=rb-4.1.0&q=80&w=1080",
    },
  ]);

  const [bookings, setBookings] = useState<Booking[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);

  const addBooking = (
    storeId: number,
    dealId: number,
    quantity: number = 1,
    consumerName: string
  ): boolean => {
    const store = stores.find((s) => s.id === storeId);
    if (!store) return false;

    const deal = store.deals.find((d) => d.id === dealId);
    if (!deal) return false;

    // Check stock availability
    if (deal.stock < quantity) return false;

    // Update stock
    setStores((prevStores) =>
      prevStores.map((s) => {
        if (s.id === storeId) {
          return {
            ...s,
            deals: s.deals.map((d) => {
              if (d.id === dealId) {
                return { ...d, stock: d.stock - quantity };
              }
              return d;
            }),
          };
        }
        return s;
      })
    );

    // Create booking ID
    const bookingId = `BK-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    // Add to bookings (for consumer)
    const newBooking: Booking = {
      id: bookingId,
      bookingDate: new Date(),
      storeId,
      storeName: store.name,
      dealId,
      dealItem: deal.item,
      price: deal.discountPrice,
      quantity,
      status: "pending",
      consumerName,
    };
    setBookings((prev) => [newBooking, ...prev]);

    // Add to orders (for mitra/seller)
    const newOrder: Order = {
      id: bookingId,
      orderDate: new Date(),
      storeId,
      storeName: store.name,
      dealId,
      dealItem: deal.item,
      price: deal.discountPrice,
      quantity,
      status: "pending",
      consumerName,
    };
    setOrders((prev) => [newOrder, ...prev]);

    return true;
  };

  const updateOrderStatus = (orderId: string, status: Booking["status"]) => {
    setOrders((prev) =>
      prev.map((order) => (order.id === orderId ? { ...order, status } : order))
    );
    // Also update booking
    setBookings((prev) =>
      prev.map((booking) =>
        booking.id === orderId ? { ...booking, status } : booking
      )
    );
  };

  const updateBookingStatus = (bookingId: string, status: Booking["status"]) => {
    setBookings((prev) =>
      prev.map((booking) =>
        booking.id === bookingId ? { ...booking, status } : booking
      )
    );
    // Also update order
    setOrders((prev) =>
      prev.map((order) => (order.id === bookingId ? { ...order, status } : order))
    );
  };

  const getStoreById = (storeId: number): Store | undefined => {
    return stores.find((s) => s.id === storeId);
  };

  const getOrdersByStore = (storeId: number): Order[] => {
    return orders.filter((order) => order.storeId === storeId);
  };

  const getBookingsByConsumer = (consumerName: string): Booking[] => {
    return bookings.filter((booking) => booking.consumerName === consumerName);
  };

  return (
    <AppContext.Provider
      value={{
        stores,
        bookings,
        orders,
        addBooking,
        updateOrderStatus,
        updateBookingStatus,
        getStoreById,
        getOrdersByStore,
        getBookingsByConsumer,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
