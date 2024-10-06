import { motion } from "framer-motion";
import OrderConfirmedIcon from "/images/icon-order-confirmed.svg";
import { priceNameMap, useDataState } from "../utils";
import { data } from "../data";
import { Fragment } from "react/jsx-runtime";
import { toast } from "sonner";

export default function Modal(props: {
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
    const { setIsModalOpen } = props;

    return (
        <Fragment>
            <motion.div
                onMouseDown={() => setIsModalOpen(false)}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="fixed w-full min-h-screen hidden md:flex md:items-center items-end justify-center z-30 top-0 left-0 font-red_hat_text"
            >
                <ModalContent setIsModalOpen={setIsModalOpen} />
            </motion.div>
            <motion.div
                onMouseDown={() => setIsModalOpen(false)}
                initial={{ translateY: "100%" }}
                animate={{ translateY: "0%" }}
                exit={{ translateY: "100%" }}
                transition={{ ease: "circInOut" }}
                className="fixed w-full h-fit md:hidden flex items-end justify-center z-30 bottom-0 left-0 font-red_hat_text"
            >
                <ModalContent setIsModalOpen={setIsModalOpen} />
            </motion.div>
        </Fragment>
    );
}

function ModalContent({
    setIsModalOpen,
}: {
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
    const { data: selectedData, reset } = useDataState();
    const totalPrice = selectedData.reduce((acc, item) => {
        acc += item.count * priceNameMap[item.name];
        return acc;
    }, 0);
    const displaySuccessToast = () =>
        toast.success("Order Confirmed. Start a new order.");
    return (
        <div
            onMouseDown={(e) => e.stopPropagation()}
            className="bg-white md:rounded-2xl rounded-t-2xl flex flex-col w-[min(30rem,100vw)] p-8 gap-4"
        >
            <img
                src={OrderConfirmedIcon}
                alt="order confirm"
                className="size-10"
            />
            <div className="w-full flex flex-col">
                <h3 className="text-[2rem] font-black">Order Confirmed</h3>
                <span>We hope you enjoy your food!</span>
            </div>
            <div className="bg-c_Rose_50 flex flex-col p-3">
                {selectedData.map((item) => {
                    const price = priceNameMap[item.name];
                    const photoUrl = data.find((d) => d.name === item.name)
                        ?.image.thumbnail;
                    return (
                        <div
                            key={`modal list cart items ${item.name}`}
                            className="flex justify-between items-center p-2"
                        >
                            <div className="flex items-center h-full gap-4">
                                <img
                                    src={photoUrl}
                                    alt={item.name + " thumbnail"}
                                    className="size-10 rounded-sm"
                                />
                                <div className="flex flex-col h-full gap-1">
                                    <span className="font-semibold text-xs text-c_Rose_900">
                                        {item.name}
                                    </span>
                                    <div className="flex gap-4">
                                        <span className="text-c_Red font-semibold text-xs">
                                            {item.count}x
                                        </span>
                                        <span className=" text-xs text-c_Rose_400">
                                            @ ${price.toFixed(2)}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <span className="font-semibold text-c_Rose_900">
                                ${(item.count * price).toFixed(2)}
                            </span>
                        </div>
                    );
                })}
                <div className="w-full flex items-center justify-between px-2 pt-4 pb-2">
                    <span className="text-xs">Order Total</span>
                    <span className="font-bold text-xl text-c_Rose_900">
                        ${totalPrice.toFixed(2)}
                    </span>
                </div>
            </div>
            <button
                onMouseDown={() => {
                    setIsModalOpen(false);
                    reset();
                    displaySuccessToast();
                    window.scrollTo({
                        top: 0,
                        behavior: "smooth", // This adds a smooth scrolling effect
                    });
                }}
                className="bg-c_Red text-sm hover:brightness-75 transition text-white rounded-full py-3"
            >
                Start New Order
            </button>
        </div>
    );
}
