import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import {
    useProductsCreateMutation,
    useProductsDeleteMutation,
    useProductsIndexQuery,
} from "~/app/api/products/productApiSlice";
import {
    CounterSliceState,
    decrement,
    increment,
} from "~/app/store/counter/counterSlice";
import { useAppDispatch } from "../app/store/hook";
import { useSelector } from "react-redux";
import { productoApiSlice } from "../app/api/products/productApiSlice";
import { onAddtocar } from "~/app/store/cart/thunks";

function HomePage() {
    const { value } = CounterSliceState();
    const { data, isFetching, refetch } = useProductsIndexQuery(undefined, {
        //pollingInterval: 10000, // parecido al socket io pero -- defaul = 0
        //skip: true, // detiene peticion  . usar condicional si deseas
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true, // si cambia algun dato de l servidor hace peticion
        refetchOnReconnect: true, // cuando se va internet
    });
    const [mutate] = useProductsCreateMutation();
    const [mutate2] = useProductsDeleteMutation();

    // Cache obtener
    const cache = useSelector(
        productoApiSlice.endpoints.productsIndex.select()
    );

    const dispatch = useAppDispatch();

    const { handleSubmit, register } = useForm<{ nombre: string }>();

    function onIncrement() {
        dispatch(increment());
    }

    function onDecrement() {
        dispatch(decrement());
    }

    function onAddProduct(data: { nombre: string }) {
        mutate({
            ...data,
            imagen: "https://f4.bcbits.com/img/a0704360192_10.jpg",
        })
            .then((data) => console.log(data))
            .catch((err) => console.log(err));

        // ó

        // try {
        // mutate({

        //     ...data,
        //     imagen: "https://f4.bcbits.com/img/a0704360192_10.jpg",
        // }).unwrap();
        // } catch (error) {

        // }
    }
    function onDeleteProduct(id: number) {
        mutate2(id);
    }
    return (
        <div className="container mx-auto">
            <div className="flex text-white gap-3 ">
                <button
                    className="bg-red-500 px-2"
                    type="button"
                    onClick={onDecrement}
                >
                    -
                </button>
                <p className="r">{value}</p>
                <button
                    className="bg-blue-500 px-2"
                    type="button"
                    onClick={onIncrement}
                >
                    +
                </button>
            </div>
            <form
                noValidate
                className="p-3 bg-black bg-opacity-60 e  rounded-md"
                onSubmit={handleSubmit(onAddProduct)}
                action=""
            >
                <label htmlFor="" className="text-white">
                    Nombre
                    <input
                        className="w-full text-black"
                        type="text"
                        placeholder="nombre"
                        {...register("nombre", {
                            required: {
                                value: true,
                                message: "El nombre es obligatorio",
                            },
                        })}
                    />
                </label>
                <button
                    className="block bg-green-500 rounded-md px-2 py-1 text-white"
                    type="submit"
                >
                    Añadir
                </button>
            </form>
            <button onClick={() => refetch()} className="bg-red-500">
                Refech
            </button>
            <div className="">
                Car
                {}
                <button
                    className="bg-slate-400"
                    onClick={() => {
                        dispatch(onAddtocar());
                    }}
                >
                    Add car
                </button>
            </div>
            <h2>Products</h2>
            <div className="grid grid-cols-3 gap-4">
                <p>{isFetching && "FEtCHING"}</p>
                <span>{cache?.data?.length}</span>
                {data?.map((product) => (
                    <div className="" key={product.id}>
                        <img
                            width={80}
                            height={80}
                            src={product.imagen}
                            alt={product.nombre}
                            className="mx-auto"
                        />
                        <Link
                            to={`/${product.id}`}
                            className="text-sm text-white text-center"
                        >
                            {product.nombre}
                        </Link>
                        <div className="flex gap-1 justify-center mt-2">
                            <button
                                className="text-white bg-red-600 px-2 rounded-md"
                                onClick={() => onDeleteProduct(product.id)}
                            >
                                Eliminar
                            </button>
                            <button className="text-white bg-orange-600 px-2 rounded-md">
                                Editar
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default HomePage;
