import { data } from "./data";
import { priceNameMap, useDataState, type Unpack } from "./utils";
import CarbonNeutralIcon from "/images/icon-carbon-neutral.svg";
import AddToCartIcon from "/images/icon-add-to-cart.svg";
import { Fragment } from "react/jsx-runtime";
import RemoveItemIcon from "/images/icon-remove-item.svg";
import { useEffect, useRef, useState } from "react";
import autoAnimate from "@formkit/auto-animate";
import { AnimatePresence, motion } from "framer-motion";

import EmptyCartIll from "/images/illustration-empty-cart.svg";
import Modal from "./components/Modal";

export default function App() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <AnimatePresence>
            <main
                data-testid="test-app"
                className="w-full min-h-screen bg-c_Rose_50 flex md:flex-row flex-col gap-6 md:py-12 py-6 md:px-24 px-4 font-red_hat_text z-10"
            >
                <div className="flex flex-col gap-6">
                    <h1 className="font-bold text-[2.25rem]">Desserts</h1>
                    <div className="md:grid grid-cols-3 flex flex-col gap-6">
                        {data.map((item) => {
                            return <Item item={item} key={item.name} />;
                        })}
                    </div>
                </div>
                <Cart setIsModalOpen={setIsModalOpen} />
            </main>
            {isModalOpen && (
                <motion.div
                    onMouseDown={() => setIsModalOpen(false)}
                    key={"backdrop"}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed w-screen h-screen top-0 left-0 z-20 bg-black bg-opacity-50"
                ></motion.div>
            )}
            {isModalOpen && (
                <Modal setIsModalOpen={setIsModalOpen} key="modal" />
            )}
        </AnimatePresence>
    );
}

function Item(props: { item: Unpack<typeof data> }) {
    const { item } = props;
    const z_data = useDataState();
    const selectedData = z_data.data.find((d) => d.name === item.name);
    const { increment, decrement } = z_data;

    return (
        <div className="flex flex-col">
            <img
                src={item.image.desktop}
                alt={item.name}
                className="rounded-lg hidden lg:block"
            />
            <img
                src={item.image.tablet}
                alt={item.name}
                className="rounded-lg hidden lg:hidden md:block"
            />
            <img
                src={item.image.mobile}
                alt={item.name}
                className="rounded-lg block md:hidden"
            />
            <div className="w-full flex justify-center -translate-y-[50%] -mb-2">
                {selectedData?.count === 0 || !selectedData?.count ? (
                    <button
                        onMouseDown={() => increment(item.name)}
                        className="flex items-center justify-center bg-white w-40 h-10 rounded-full ring-1 ring-c_Rose_300 gap-2 transition hover:ring-c_Red hover:text-c_Red"
                    >
                        <img src={AddToCartIcon} alt="cart" />
                        <span className="font-semibold text-sm">
                            Add to Cart
                        </span>
                    </button>
                ) : (
                    <div className="flex items-center justify-between w-40 h-10 rounded-full bg-c_Red text-white px-3">
                        <button
                            onMouseDown={() => decrement(item.name)}
                            className="transition hover:bg-white hover:text-c_Red border-[1px] border-white rounded-full size-5 flex justify-center items-center text-xl"
                        >
                            <span className="-translate-y-[1.5px]">-</span>
                        </button>
                        <span>{selectedData.count}</span>
                        <button
                            onMouseDown={() => increment(item.name)}
                            className="transition hover:bg-white hover:text-c_Red border-[1px] border-white rounded-full size-5 flex justify-center items-center text-xl"
                        >
                            +
                        </button>
                    </div>
                )}
            </div>
            <div className="w-full flex flex-col">
                <span className="text-c_Rose_500 md:text-[1rem]">
                    {item.category}
                </span>
                <span className="font-semibold text-c_Rose_900 md:text-[1rem]">
                    {item.name}
                </span>
                <span className="font-semibold text-c_Red md:text-[1rem]">
                    ${item.price.toFixed(2)}
                </span>
            </div>
        </div>
    );
}

function Cart({
    setIsModalOpen,
}: {
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
    const { data: selectedData, remove } = useDataState();
    const cartDivRef = useRef<HTMLDivElement>(null!);
    const totalPrice = selectedData.reduce((acc, item) => {
        acc += item.count * priceNameMap[item.name];
        return acc;
    }, 0);

    useEffect(() => {
        cartDivRef.current && autoAnimate(cartDivRef.current);
    }, [cartDivRef]);

    return (
        <div className="flex flex-col md:min-w-[24rem] bg-white h-fit rounded-lg py-6 px-6 gap-4">
            <h2 className="text-c_Red text-2xl font-bold">
                Your Cart ({selectedData.length})
            </h2>
            <div ref={cartDivRef} className="flex flex-col">
                {selectedData.map((item) => {
                    return (
                        <Fragment key={`cart ${item.name}`}>
                            <div className="flex w-full justify-between items-center">
                                <div className="flex flex-col gap-1">
                                    <span className="font-semibold">
                                        {item.name}
                                    </span>
                                    <div className="flex items-center">
                                        <span className="text-c_Red font-semibold pr-4">
                                            {item.count}x
                                        </span>
                                        <span className="text-c_Rose_500 px-1">
                                            @
                                        </span>
                                        <span className="text-c_Rose_500 pr-2">
                                            $
                                            {priceNameMap[item.name].toFixed(2)}
                                        </span>
                                        <span className="text-c_Rose_500 font-semibold">
                                            $
                                            {(
                                                priceNameMap[item.name]! *
                                                item.count
                                            ).toFixed(2)}
                                        </span>
                                    </div>
                                </div>
                                <button
                                    onMouseDown={() => remove(item.name)}
                                    className="flex size-5 rounded-full items-center justify-center border-2 border-c_Rose_400 transition hover:brightness-0"
                                >
                                    <img
                                        src={RemoveItemIcon}
                                        alt="remove item"
                                    />
                                </button>
                            </div>
                            <div className="my-4 w-full border-t-[1px] border-c_Rose_100"></div>
                        </Fragment>
                    );
                })}
            </div>
            {selectedData.length !== 0 ? (
                <Fragment>
                    <div className="w-full flex items-center justify-between pb-4">
                        <span className="text-sm">Order Total</span>
                        <span className="font-bold text-xl tracking-wider">
                            ${totalPrice.toFixed(2)}
                        </span>
                    </div>
                    <div className="bg-c_Rose_50 w-full py-4 flex items-center justify-center text-sm rounded-md">
                        <p className="flex gap-2">
                            <img
                                src={CarbonNeutralIcon}
                                alt="carbon neutral icon"
                            />{" "}
                            This is a{" "}
                            <span className="font-bold">carbon-neutral</span>{" "}
                            delivery
                        </p>
                    </div>
                    <button
                        onMouseDown={() => setIsModalOpen(true)}
                        className="bg-c_Red text-white rounded-full py-3 text-sm transition hover:brightness-75"
                    >
                        Confirm Order
                    </button>
                </Fragment>
            ) : (
                <div className="w-full flex flex-col items-center py-4 gap-4">
                    <img src={EmptyCartIll} alt="empty cart illustration" />
                    <span className="text-c_Rose_500 font-semibold text-sm">
                        Your added items will appear here
                    </span>
                </div>
            )}
        </div>
    );
}
