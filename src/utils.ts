import { create } from "zustand";
import { data } from "./data";

export type Unpack<T> = T extends (infer U)[] ? U : T;

type DateStateType = {
    data: { name: string; count: number }[];
    increment: (name: string) => void;
    decrement: (name: string) => void;
    reset: () => void;
    remove: (name: string) => void;
};

export const useDataState = create<DateStateType>((set) => ({
    data: [],
    increment: (name: string) => {
        set((state) => {
            const index = state.data.findIndex((d) => d.name === name);
            if (index === -1) {
                return { data: [...state.data, { name, count: 1 }] };
            }
            const thisData = { ...state.data[index] };
            thisData.count++;
            state.data[index] = thisData;
            return { data: [...state.data] };
        });
    },
    decrement: (name: string) => {
        set((state) => {
            const index = state.data.findIndex((d) => d.name === name);
            const thisData = { ...state.data[index] };
            thisData.count--;
            if (thisData.count === 0) {
                return { data: [...state.data.filter((d) => d.name !== name)] };
            }
            state.data[index] = thisData;
            return { data: [...state.data] };
        });
    },
    reset: () => {
        set(() => ({ data: [] }));
    },
    remove: (name: string) => {
        set((state) => {
            const filteredData = state.data.filter((d) => d.name !== name);
            return { data: [...filteredData] };
        });
    },
}));

export const priceNameMap: { [key: string]: number } = data.reduce(
    (acc, item) => {
        acc[item.name] = item.price;
        return acc;
    },
    {} as { [key: string]: number }
);
