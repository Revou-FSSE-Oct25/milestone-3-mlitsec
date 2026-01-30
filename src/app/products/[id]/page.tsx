type Product = {
    title: string;
    description: string;
    price: number;
    image: string;
};

async function getProduct(id: string): Promise<Product> {
    const res = await fetch(`https://fakestoreapi.com/products/${id}`, {
        cache: "no-store", // SSR
    });

    if (!res.ok) {
        throw new Error("Failed to fetch product");
    }

    return res.json();
}

export default async function ProductDetailPage({
    params,
}: {
    params: { id: string };
}) {
    const product = await getProduct(params.id);

    return (
        <main>
            <h1>{product.title}</h1>
            <img src={product.image} alt={product.title} width={200} />
            <p>{product.description}</p>
            <p>${product.price}</p>

            <button>Add to Cart</button>
        </main>
    );
}
